import { React, useContext, useState } from "react";
import dayjs from "dayjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ChooseBoat from "../ChooseBoat";
import SuccessModal from "../SuccessModal";
import SuccessModalNOT from "../SuccessModalNOT";
import { applicationContext } from "../../context";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as yup from "yup";
import "./../WrapperReservation/wrapper-reservation.scss";
import moment from "moment";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import { TourButton } from "../TourButton";


const WrapperReservation = () => {

  const { allDocs, user, freshData, setFreshData } = useContext(applicationContext);
  const reservationInfo = {
    id: "",
    roomNumber: "",
    numberOfPassengers: 0,
    children: 0,
    preteens: 0,
    phoneNumber: "",
    isPaid: false,
  };
  const [ticketInfo, setTicketInfo] = useState({
    boat: "",
    date: "",
    passengers: "",
  });
  const dateFormat = "D-M-YYYY H:m";
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  
  const today = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(today.getDate() + 7);
  const filteredDates = availableDates.length
    ? availableDates
        .sort((a, b) => moment(a.date, dateFormat) - moment(b.date, dateFormat))
        .filter((item) => new Date(item.date).getTime() > new Date(today).getTime())
        // .filter((item) => moment(item.date, dateFormat) > moment(today, dateFormat))
        .filter((item, index, dates) => dates.indexOf(item) === index)
    : [];
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    // const phoneRegExp =
    // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const selectedBoat = allDocs?.filter(
    (e) => e.data.boat === selectedRide?.id
  );

  const selectedTour = selectedBoat?.find((e) => e.id === selectedId);
  const prices = {
    adults: selectedRide?.data.prices.adults,
    preteens: selectedRide?.data.prices.preteens,
    children: selectedRide?.data.prices.children,
  };
  // const formRef = useRef(null);
  const plusPassengerCount = (setFieldValue, values) => {
    setFieldValue("numberOfPassengers", values.numberOfPassengers + 1);
  };
  const minusPassengerCount = (setFieldValue, values) => {
    if (values.numberOfPassengers > 0) {
      setFieldValue("numberOfPassengers", values.numberOfPassengers - 1);
    }
  };
  const plusChildrenCount = (setFieldValue, values) => {
    setFieldValue("children", values.children + 1);
  };
  const minusChildrenCount = (setFieldValue, values) => {
    if (values.children > 0) {
      setFieldValue("children", values.children - 1);
    }
  };

  const plusPreteenCount = (setFieldValue, values) => {
    setFieldValue("preteens", values.preteens + 1);
  };
  const minusPreteenCount = (setFieldValue, values) => {
    if (values.preteens > 0) {
      setFieldValue("preteens", values.preteens - 1);
    }
  };
  const validationSchema = (tour) =>
    yup.object().shape({
      roomNumber: yup
        .string()
        .required("Please enter your room number")
        .min(1, "Please enter your room number"),
      numberOfPassengers: yup
        .number()
        .required("Please enter a number of passengers")
        .max(10, "Max passengers 10")
        .min(1, "Min one passenger"),
      preteens: yup
        .number()
        .max(10, "Max passengers 10")
        .min(0, "Can't be less than zero"),
      children: yup
        .number()
        .max(10, "Max passengers 10")
        .min(0, "Can't be less than zero"),

    });
  const handleSubmit = async(values, { resetForm }) => {
    const tour = selectedTour;
    const tourRef = doc(db, "tours", tour.id);
    const docSnap = await getDoc(tourRef)
    tour.data = docSnap.data()
    if((values.numberOfPassengers + values.preteens + values.children) > tour.data.availableSeats){
      const message = "This tour has " + tour.data.availableSeats + (tour.data.availableSeats === 1 ? " seat left" : " seats left");
      //alert(message)
      setFail(message)
      return
    }
    const random = Math.floor(Math.random() * 1000000000);
    setTicketInfo({
      ...ticketInfo,
      boat: selectedRide.data.name,
      date: tour.data.date,
      numberOfPassengers: values.numberOfPassengers,
      roomNumber: values.roomNumber,
      phoneNumber: values.phoneNumber,
      children: values.children,
      preteens: values.preteens,
      ticketPrice:
        values.numberOfPassengers * prices.adults +
        values.preteens * prices.preteens +
        values.children * prices.children,
      isPaid: values.isPaid,
    });
    updateDoc(tourRef, {
      availableSeats:
        tour.data.availableSeats -
        (values.numberOfPassengers + values.preteens + values.children),
      reservations: arrayUnion({
        id: random,
        userEmail: user,
        numberOfPassengers: values.numberOfPassengers,
        children: values.children,
        preteens: values.preteens,
        roomNumber: values.roomNumber,
        phoneNumber: values.phoneNumber,
        isPaid: values.isPaid,
        ticketPrice:
          values.numberOfPassengers * prices.adults +
          values.preteens * prices.preteens +
          values.children * prices.children,
      }),
    });
    // setSelectedRide(null);
    resetForm();
    setSuccess(true);
    setFreshData(!freshData);

  };
  return (
    <div className="div-WrapperReservation">
      <ChooseBoat
        setAvailableDates={setAvailableDates}
        selectedRide={selectedRide}
        setSelectedRide={setSelectedRide}
        setSelectedId={setSelectedId}
      />
      {(selectedRide && filteredDates.length !== 0)  &&
      <h2 className="tour-title">
      Select day/date/time: <span>*</span>
    </h2>}
      <div className="dateWrapper">
        <div className="dateWrapperScroll">
          {(filteredDates.length === 0 && selectedRide) ? (
            <>
              <p>Sorry, there are no </p>
              <p>tours in this week.</p>
            </>
          ) : (
            filteredDates.map((obj, i) => {
              
              const {date, type, availableSeats, id} = obj
              console.log(obj)
              return (

                <TourButton disabled={availableSeats === 0} key={i} onClick={() => {setSelectedId(id); setTimeout(() => {
                  document.querySelector(".div-footer").scrollIntoView({ behavior: "smooth" });
                  }, 0);}} isSelected={selectedId === id} tourDate={dayjs(new Date(date)).format("ddd DD-MM HH:mm")} type={type}/>
              );
            })
          )}
        </div>
      </div>
      {(selectedTour && (filteredDates.length > 0)) && (
        <Formik
          initialValues={reservationInfo}
          validationSchema={() => validationSchema(selectedTour)}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="res-form">
              <section>
                <h2>
                <p style={{color: "darkorange"}}> {selectedTour.data.availableSeats + (selectedTour.data.availableSeats === 1 ? " seat left" : " seats left")}</p>
                  Adults: <span>*</span>
                </h2>
                <div style={{display: "flex",     justifyContent: "space-evenly"}}>
                <Button size="large" variant="contained" onClick={() => minusPassengerCount(setFieldValue, values)} color="primary" aria-label="add">
                  <RemoveIcon />
                </Button>
                <Field
                style={{width: "30px", fontSize: "30px", color: "white", backgroundColor:"transparent", border: "none"}}
                  type="number"
                  name="numberOfPassengers"
                  disabled
                />
                <Button size="large" variant="contained" onClick={() => plusPassengerCount(setFieldValue, values)} color="primary" aria-label="add">
                  <AddIcon />
                </Button>
                </div>
                <p className="error-handle">
                  <ErrorMessage name="numberOfPassengers" />
                </p>
              
                <h2>Kids 8-12 years:</h2>
                <div style={{display: "flex",     justifyContent: "space-evenly"}}>
                <Button size="large" variant="contained"  onClick={() => minusPreteenCount(setFieldValue, values)} color="primary" aria-label="add">
                  <RemoveIcon />
                </Button>
                <Field
                style={{width: "30px", fontSize: "30px", color: "white", backgroundColor:"transparent", border: "none"}}
                  type="number"
                  name="preteens"
                  disabled
                />
                <Button size="large" variant="contained"  onClick={() => plusPreteenCount(setFieldValue, values)} color="primary" aria-label="add">
                  <AddIcon />
                </Button>
                </div>

                <p className="error-handle">
                  <ErrorMessage name="preteens" />
                </p>
                <h2>Kids 0-7 years:</h2>
                <div style={{display: "flex",     justifyContent: "space-evenly"}}>
                <Button size="large" variant="contained"  onClick={() => minusChildrenCount(setFieldValue, values)} color="primary" aria-label="add">
                  <RemoveIcon />
                </Button>
                <Field
                style={{width: "30px", fontSize: "30px", color: "white", backgroundColor:"transparent", border: "none"}}
                  type="number"
                  name="children"
                  disabled
                />
                <Button size="large" variant="contained"  onClick={() => plusChildrenCount(setFieldValue, values)} color="primary" aria-label="add">
                  <AddIcon />
                </Button>
                </div>


                <p className="error-handle">
                  <ErrorMessage name="children" />
                </p>
                <h2>
                  Room number or name<span>*</span>
                </h2>
                <Field
                  type="text"
                  name="roomNumber"
                  placeholder="Number of room"
                  className="form-field"
                  style={{  backgroundColor: "white",  height: "44px", fontSize: "20px"}}
                />
                <p className="error-handle">
                  <ErrorMessage name="roomNumber" />
                </p>
                {/* <h2>Phone number</h2>
                  <label className="joke">
                  <Field
                    type="number"
                    name="phoneNumber"
                    placeholder="Your phone number"
                  />
              
                </label> */}
                <p className="error-handle">
                  <ErrorMessage name="phoneNumber" />
                </p>
                <p style={{ fontSize: "1.2em" }}>
                  {"Total price: " +
                    parseInt(
                      values.numberOfPassengers * prices.adults +
                        values.preteens * prices.preteens +
                        values.children * prices.children
                    ) +
                    " din."}
                </p>
                <Field className="radio-group" component="div" name="isPaid">
                  <label htmlFor="radioOne">
                    Paid in cash
                    <input
                      type="radio"
                      id="radioOne"
                      
                      name="isPaid"
                      value="true"
                    />
                  </label>
                  <label style={{color: "red"}} htmlFor="radioTwo">
                    Not Paid
                    <input
                      defaultChecked="radioOne"
                      type="radio"
                      id="radioTwo"
                      name="isPaid"
                      value="false"
                    />
                  </label>
                </Field>

                <Button variant="contained"   type="submit" size="large">
                  Book now
                </Button>
              </section>
            </Form>
          )}
        </Formik>
      )}
      {success && (
        <SuccessModal setSuccess={setSuccess} ticketInfo={ticketInfo} selectedRide={selectedRide} />
      )}
      {fail && (
        <SuccessModalNOT text={fail} setFail={setFail} />
      )}
    </div>
  );
};

export default WrapperReservation;
