import { React, useContext, useState } from "react";
import dayjs from "dayjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ChooseBoat from "../ChooseBoat";
import SuccessModal from "../SuccessModal";
import SuccessModalNOT from "../SuccessModalNOT";
import { BookingProvider, applicationContext } from "../../context";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as yup from "yup";
import "./../WrapperReservation/wrapper-reservation.scss";
import moment from "moment";
import { Outlet, Route, Routes } from "react-router-dom";

const EUR = 118;

const WrapperReservation = () => {
  const { allDocs, user, freshData, setFreshData } =
    useContext(applicationContext);
  const reservationInfo = {
    id: "",
    roomNumber: "",
    numberOfPassengers: 0,
    children: 0,
    preteens: 0,
    promoCode: false,
  };
  const [ticketInfo, setTicketInfo] = useState({
    boat: "",
    date: "",
    passengers: "",
  });
  const dateFormat = "D-M-YYYY H:m";
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRide, setSelectedRide] = useState(undefined);

  const today = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(today.getDate() + 7);
  const filteredDates = availableDates.length
    ? availableDates
        .sort((a, b) => moment(a.date, dateFormat) - moment(b.date, dateFormat))
        .filter(
          (item) => new Date(item.date).getTime() > new Date(today).getTime()
        )
        // .filter((item) => moment(item.date, dateFormat) > moment(today, dateFormat))
        .filter((item, index, dates) => dates.indexOf(item) === index)
    : [];
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  // const phoneRegExp =
  // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const selectedBoat = allDocs?.filter((e) => e.data.boat === selectedRide?.id);

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

  return (
    <BookingProvider
      value={{
        setAvailableDates,
        selectedRide,
        setSelectedRide,
        setSelectedId,
        filteredDates,
        plusChildrenCount,
        minusChildrenCount,
        plusPassengerCount,
        minusPassengerCount,
        validationSchema,
        plusPreteenCount,
        minusPreteenCount,
        fail,
        setFail,
        ticketInfo,
        setTicketInfo,
        user,
        freshData,
        setFreshData,
        setSuccess,
        reservationInfo,
        EUR,
        prices,
        selectedTour,
        selectedId,
      }}
    >
      <div className="div-WrapperReservation" onClick={console.log(ticketInfo)}>
        <ChooseBoat
          setAvailableDates={setAvailableDates}
          selectedRide={selectedRide}
          setSelectedRide={setSelectedRide}
          setSelectedId={setSelectedId}
          filteredDates={filteredDates}
        />

        {success && (
          <SuccessModal
            setSuccess={setSuccess}
            ticketInfo={ticketInfo}
            selectedRide={selectedRide}
          />
        )}
        {fail && <SuccessModalNOT text={fail} setFail={setFail} />}
      </div>
    </BookingProvider>
  );
};

export default WrapperReservation;
