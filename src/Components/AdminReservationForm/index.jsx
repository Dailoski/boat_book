import { useRef, React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useContext } from "react";
import { applicationContext } from "../../context";
import * as yup from "yup";
import dayjs from "dayjs";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import DatePickerField from "../DatePickerField";
import "./admin-reservation-form.scss";
import { Button } from "@mui/material";

const AdminReservationForm = () => {
  const { setFreshData, freshData, rides } = useContext(applicationContext);
  const tourRef = useRef(null);
  const d = new Date();
  d.setHours(16,0,0,0)
  const defaultValue = {
    boat: "",
    date: [d],
    available_seats: 50,
    hours: 0,
  };

  const validationSchema = yup.object().shape({
    boat: yup.string().required("Select a boat"),
    date: yup.array().required("Please insert a date"),
    available_seats: yup
      .number()
      .required("Enter available seats")
      .min(1, "One seat minimum")
  });
  const getDates = (datesArray) => {
    let dates = [];
    datesArray.forEach((date) => {
      dates.push(dayjs(date).format("YYYY-MM-DD HH:mm"));
    });
    return dates;
  };
  
  const handleAdd = (values, { resetForm }) => {
    const dateRange = getDates(values.date);
    const selectedRide = rides.find((e) => e.id === values.boat);
    dateRange.forEach((singleDate) => {
      console.log(typeof singleDate)
      const tourID = `${values.boat}-${singleDate.replace(" ", "-")}-${Math.floor(Math.random() * 1000000000)}`
      const docRef = doc(db, "tours", "" + tourID );
      setDoc(docRef, 
        {
          boat: values.boat,
          date: `${singleDate}`,
          availableSeats: selectedRide.data.totalSeats,
          reservations: [],
          type: values.type
        })
      // addDoc(collection(db, "tours"), {
      //   boat: values.boat,
      //   date: `${singleDate}`,
      //   availableSeats: selectedRide.data.totalSeats,
      //   reservations: [],
      //   type: values.type
      // });
    });
    setTimeout(() => {
      document.querySelector(".div-footer").scrollIntoView({ behavior: "smooth" });
      }, 0);
    setFreshData(!freshData);
    resetForm();
  };
  // const hours = []
  // const minutes = [0, 15, 30, 45]
  // for(let i =0; i<24;i++){
  //   hours.push(i)
  // }

  return (
    <div className="div-admin-res">
      <h3>Create a tour:</h3>

      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleAdd}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <section className="admin-res">
              <h4>Tour:</h4>
              {rides.map((data, i) => (
                <label key={i}>
                  <p>{data.id }</p>
                  <Field
                    type="radio"
                    name="boat"
                    value={data.id}
                    key={i}
                  />
                </label>
              ))}
              <h4>Select Date/Dates</h4>
              <DatePickerField
                name="date"
                value={values.date}
                onChange={setFieldValue}
              />
              <h4>Type:</h4>
              {["daytime", "sunset", "night"].map((type, i) => (
                <label key={i}>
                  <p>{type}</p>
                  <Field
                    type="radio"
                    name="type"
                    value={type}
                  />
                </label>
              ))}
              <p className="error-handle">
                <ErrorMessage name="date" />
              </p>

              <p className="error-handle">
                <ErrorMessage name="hours" />
              </p>
              <p className="error-handle">
                <ErrorMessage name="minutes" />
              </p>
              <Button variant="contained" type="submit" ref={tourRef}>
                Create tour
              </Button>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminReservationForm;
