import { React, useContext, useState } from "react";
import dayjs from "dayjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ChooseBoat from "../ChooseBoat";
import SuccessModal from "../SuccessModal";
import SuccessModalNOT from "../SuccessModalNOT";
import { applicationContext } from "../../context";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as yup from "yup";
import "./../WrapperReservation/wrapper-reservation.scss";
import moment from "moment";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import { TourButton } from "../TourButton";

const  EUR  = 118

const color = (type) => {
  
  return  type === "daytime"
      ? "primary"
      : type === "night"
      ? "secondary"
      : "warning"
  
}

const WrapperReservation = () => {

  const { allDocs, user, freshData, setFreshData } = useContext(applicationContext);
  const reservationInfo = {
    id: "",
    roomNumber: "",
    numberOfPassengers: 0,
    children: 0,
    preteens: 0,
    promoCode: false
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
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const cardID = genRanHex(6)
    const docRef = doc(db, "cards", "" + cardID );

    setDoc(docRef,{
      ...ticketInfo,
      boat: selectedRide.data.name,
      date: tour.data.date,
      numberOfPassengers: values.numberOfPassengers,
      roomNumber: values.roomNumber,
      children: values.children,
      preteens: values.preteens,
      prices: prices,
      ticketPrice:
        values.numberOfPassengers * prices.adults +
        values.preteens * prices.preteens +
        values.children * prices.children,
      isPaid: values.isPaid,     
      id: cardID,
      userEmail: user,
      tourID: tourRef.id
    });
    setTicketInfo({
      ...ticketInfo,
      boat: selectedRide.data.name,
      date: tour.data.date,
      numberOfPassengers: values.numberOfPassengers,
      roomNumber: values.roomNumber,
      children: values.children,
      preteens: values.preteens,
      promoCode: values.promoCode,
      prices: prices,
      ticketPrice:
        values.numberOfPassengers * prices.adults +
        values.preteens * prices.preteens +
        values.children * prices.children,
      priceWithDiscount: 
      values.promoCode ? values.numberOfPassengers * (prices.adults - (prices.adults && 500)) +
      values.preteens * (prices.preteens - (prices.preteens && 250)) +
      values.children * (prices.children - (prices.children && 250) )
    :
    values.numberOfPassengers * (prices.adults) +
      values.preteens * prices.preteens +
      values.children * prices.children,
      isPaid: values.isPaid,
    })
    ;
    updateDoc(tourRef, {
      availableSeats:
        tour.data.availableSeats -
        (values.numberOfPassengers + values.preteens + values.children),
      reservations: arrayUnion({
        id: cardID,
        userEmail: user,
        numberOfPassengers: values.numberOfPassengers,
        children: values.children,
        preteens: values.preteens,
        roomNumber: values.roomNumber,
        isPaid: values.isPaid,
        promoCode: values.promoCode,
        ticketPrice:
          values.promoCode ? values.numberOfPassengers * (prices.adults - (prices.adults && 500)) +
              values.preteens * (prices.preteens - (prices.preteens && 250)) +
              values.children * (prices.children - (prices.children && 250) )
            :
            values.numberOfPassengers * (prices.adults) +
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
      <h3 className="tour-title">
      Select day/date/time: <span>*</span>
    </h3>}
      <div className="dateWrapper">
        <div className="dateWrapperScroll">
          {(filteredDates.length === 0 && selectedRide) ? (
            <div style={{backgroundColor: "red", padding: "20px", color: "white"}}>
              <p style={{color: "white"}}>Sorry, there are no </p>
              <p style={{color: "white"}}>tours in this week.</p>
            </div>
          ) : (
            filteredDates.map((obj, i) => {
              
              const {date, type, availableSeats, id} = obj
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
              <Button color={ color(selectedTour.data.type)} sx={{fontWeight:"bold", color:"white"}} variant="contained" onClick={() => {setFreshData(!freshData)}} size="large">
              {selectedTour.data.availableSeats + (selectedTour.data.availableSeats === 1 ? " seat left" : " seats left")}
                </Button>
                <h3>
                  Adults: <span>*</span>
                </h3>
                <div style={{display: "flex",     justifyContent: "space-evenly"}}>
                <Button  color={ color(selectedTour.data.type)}  size="large" variant="contained" onClick={() => minusPassengerCount(setFieldValue, values)} aria-label="add">
                  <RemoveIcon />
                </Button>
                <Field
                style={{width: "30px", fontSize: "30px", color: "white", backgroundColor:"transparent", border: "none"}}
                  type="number"
                  name="numberOfPassengers"
                  disabled
                />
                <Button color={ color(selectedTour.data.type)}  size="large" variant="contained" onClick={() => plusPassengerCount(setFieldValue, values)} aria-label="add">
                  <AddIcon />
                </Button>
                </div>
                <p className="error-handle">
                  <ErrorMessage name="numberOfPassengers" />
                </p>
              
                <h3>Kids 8-12 years:</h3>
                <div style={{display: "flex",     justifyContent: "space-evenly"}}>
                <Button  color={ color(selectedTour.data.type)} size="large" variant="contained"  onClick={() => minusPreteenCount(setFieldValue, values)} aria-label="add">
                  <RemoveIcon />
                </Button>
                <Field
                style={{width: "30px", fontSize: "30px", color: "white", backgroundColor:"transparent", border: "none"}}
                  type="number"
                  name="preteens"
                  disabled
                />
                <Button  color={ color(selectedTour.data.type)} size="large" variant="contained"  onClick={() => plusPreteenCount(setFieldValue, values)} aria-label="add">
                  <AddIcon />
                </Button>
                </div>
                <h3>Kids 0-7 years:</h3>
                <div style={{display: "flex",     justifyContent: "space-evenly"}}>
                <Button  color={ color(selectedTour.data.type)} size="large" variant="contained"  onClick={() => minusChildrenCount(setFieldValue, values)} aria-label="add">
                  <RemoveIcon />
                </Button>
                <Field
                style={{width: "30px", fontSize: "30px", color: "white", backgroundColor:"transparent", border: "none"}}
                  type="number"
                  name="children"
                  disabled
                />
                <Button  color={ color(selectedTour.data.type)} size="large" variant="contained"  onClick={() => plusChildrenCount(setFieldValue, values)} aria-label="add">
                  <AddIcon />
                </Button>
                </div>

                <h3>
                  Room number or name: <span>*</span>
                </h3>

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
            
                {/* <h3>
                  Promo Code: <span>*</span>
                </h3> */}
                <Field className="checkbox" component="div" name="promoCode">
                  <label htmlFor="promoCode">
                    Promo
                    <Field
                      type="checkbox"
                      id="promoCode"
                      name="promoCode"
                    />
                  </label>
                </Field>
                <h3>
                  Payment method: <span>*</span>
                </h3>
                <Field className="radio-group" component="div" name="isPaid">
                  <label htmlFor="radioOne">
                    Paid in cash
                    <Field
                      type="radio"
                      id="radioOne"
                      name="isPaid"
                      value="true"
                    />
                  </label>
                  <label style={{color: "red"}} htmlFor="radioTwo">
                    Not paid
                    <Field
                      type="radio"
                      id="radioTwo"
                      name="isPaid"
                      value="false"
                    />
                  </label>

                </Field>
                {console.log(values.promoCode)}
                <p style={{ fontSize: "1.2em"}}>
                  Total price: {values.promoCode ? values.numberOfPassengers * (prices.adults - (prices.adults && 500)) +
                        values.preteens * (prices.preteens - (prices.preteens && 250)) +
                        values.children * (prices.children - (prices.children && 250) )
                      :
                      values.numberOfPassengers * (prices.adults) +
                        values.preteens * prices.preteens +
                        values.children * prices.children} DINARS

                  {/* {"Total price: " +
                    values.promoCode ? parseInt(
                      values.numberOfPassengers * (prices.adults - 600) +
                        values.preteens * prices.preteens +
                        values.children * prices.children
                    ) : parseInt(
                      values.numberOfPassengers * (prices.adults + 200) +
                        values.preteens * (prices.preteens + 200) +
                        values.children * prices.children
                    )  +
                    " din." } */}
                </p>
                <p style={{ fontSize: "1.2em"}}>
                  <span style={{visibility:"hidden"}}>Total price:</span> {values.promoCode ? Math.round((values.numberOfPassengers * (prices.adults - (prices.adults && 500)) +
                        values.preteens * (prices.preteens - (prices.preteens && 250)) +
                        values.children * (prices.children - (prices.children && 250)) )/ EUR +0.25)
                      :
                      Math.round(values.numberOfPassengers * Math.round((prices.adults) +
                        values.preteens * prices.preteens +
                        values.children * prices.children) / EUR + 0.25)} EUROS

                  {/* {"Total price: " +
                    values.promoCode ? parseInt(
                      values.numberOfPassengers * (prices.adults - 600) +
                        values.preteens * prices.preteens +
                        values.children * prices.children
                    ) : parseInt(
                      values.numberOfPassengers * (prices.adults + 200) +
                        values.preteens * (prices.preteens + 200) +
                        values.children * prices.children
                    )  +
                    " din." } */}
                </p>
                <Button color={ color(selectedTour.data.type)} sx={{fontWeight:"bold"}} variant="contained"   type="submit" size="large">
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
