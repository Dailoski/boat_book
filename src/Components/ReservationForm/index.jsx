import React from "react";

import dayjs from "dayjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ChooseBoat from "../ChooseBoat";
import * as yup from "yup";
import "./reservation-form.scss";

const ReservationForm = () => {
  const bookDate = dayjs().add(1, "day").format("YYYY-MM-DD");
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const defaultValue = {
    date: "",
    time: "",
    email: "",
    adults: "",
    kids: "",
    infants: "",
    phone_number: "",
    gift_code: "",
  };
  const validationSchema = yup.object().shape({
    date: yup
      .date()
      .required("Please insert a date")
      .min(bookDate, "Date must be at least one day from today"),
    time: yup.string().required("Please select time for cruise"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter valid email"),
    adults: yup.string().required("Please insert number of adults"),
    phone_number: yup
      .string()
      .required("Please enter phone")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(8, "too short")
      .max(10, "too long"),
  });
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  return (
    <div className="div-reservationForm">
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <ChooseBoat />
          <h4>Choose Date</h4>
          <Field type="date" name="date" />
          <p className="error-handle">
            <ErrorMessage name="date" />
          </p>
          <h4>Choose time for tour</h4>
          <label>
            Daytime
            <Field type="radio" name="time" value="Daytime" />
          </label>
          <label>
            Sunset
            <Field type="radio" name="time" value="Sunset" />
          </label>
          <label>
            Night
            <Field type="radio" name="time" value="Night" />
          </label>
          <p className="error-handle">
            <ErrorMessage name="time" />
          </p>
          <h4>Enter numbers of passengers</h4>
          <h4>ADULTS</h4>
          <Field as="select" name="adults">
            <option value="">Select number of adults</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Field>
          <p className="error-handle">
            <ErrorMessage name="adults" />
          </p>
          <h4>KIDS (0-7 YO)</h4>
          <Field as="select" name="kids">
            <option value="0">Select number of kids</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>

          <h4>INFANTS(7-12 YO)</h4>
          <Field as="select" name="infants">
            <option value="0">Select number of infants</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>

          <h4>Enter your email</h4>
          <Field
            type="email"
            name="email"
            placeholder="Your email"
            className="form-field"
          />
          <p className="error-handle">
            <ErrorMessage name="email" />
          </p>
          <h4>Phone number</h4>
          <Field
            type="number"
            name="phone_number"
            placeholder="Your phone number"
          />
          <p className="error-handle">
            <ErrorMessage name="phone_number" />
          </p>
          <Field
            type="text"
            name="gift_code"
            placeholder="Enter your gift code"
          />
          <button className="sunmit-btn" type="submit">
            Reserve
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ReservationForm;
