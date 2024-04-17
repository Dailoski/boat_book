import React, { useContext, useRef, useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import { TourButton } from "../TourButton";
import dayjs from "dayjs";
import { applicationContext, bookingContext } from "../../context";
import "../Form/form.css";
import { forwardRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

const FormCard = forwardRef(({ openBooking, setOpenBooking, ride }, ref) => {
  // const theme = createTheme({
  //   palette: {
  //     daytime: "#1565c0",
  //     night: "#e65100",
  //     halfday: "#9C294B",
  //     fullday: "#80A7BF",
  //   },
  // });
  const [formModal, setFormModal] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    const tour = selectedTour;
    const tourRef = doc(db, "tours2024", tour.id);
    const docSnap = await getDoc(tourRef);
    tour.data = docSnap.data();

    if (
      values.numberOfPassengers + values.preteens + values.children >
      tour.data.availableSeats
    ) {
      const message =
        "This tour has " +
        tour.data.availableSeats +
        (tour.data.availableSeats === 1 ? " seat left" : " seats left");
      //alert(message)
      setFail(message);
      return;
    }
    const genRanHex = (size) =>
      [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
    const cardID = genRanHex(6);
    const docRef = doc(db, "tickets2024", "" + cardID);

    setDoc(docRef, {
      ...ticketInfo,
      boat: selectedRide.data.name,
      date: tour.data.date,
      numberOfPassengers: values.numberOfPassengers,
      roomNumber: values.roomNumber,
      children: values.children,
      preteens: values.preteens,
      promoCode: values.promoCode,
      specialPromo: ride.data.promoCode ? true : false,
      receptionist: window.innerWidth < 700 ? false : values.receptionist,
      prices: prices,
      ticketPrice:
        values.numberOfPassengers * prices.adults +
        values.preteens * prices.preteens +
        values.children * prices.children,
      isPaid: values.isPaid,
      id: cardID,
      userEmail: user,
      tourID: tourRef.id,
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
      specialPromo: ride.data.promoCode ? true : false,
      receptionist: values.receptionist,
      prices: prices,
      ticketPrice:
        values.numberOfPassengers * prices.adults +
        values.preteens * prices.preteens +
        values.children * prices.children,
      priceWithDiscount: values.promoCode
        ? values.numberOfPassengers * (prices.adults - (prices.adults && 500)) +
          values.preteens * (prices.preteens - (prices.preteens && 250)) +
          values.children * (prices.children - (prices.children && 250))
        : values.numberOfPassengers * prices.adults +
          values.preteens * prices.preteens +
          values.children * prices.children,
      isPaid: values.isPaid,
    });
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
        specialPromo: ride.data.promoCode ? true : false,
        ticketPrice: values.promoCode
          ? values.numberOfPassengers *
              (prices.adults - (prices.adults && 500)) +
            values.preteens * (prices.preteens - (prices.preteens && 250)) +
            values.children * (prices.children - (prices.children && 250))
          : values.numberOfPassengers * prices.adults +
            values.preteens * prices.preteens +
            values.children * prices.children,
      }),
    });
    if (ride.data.promoCode && !values.promoCode) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const docsData = docSnap.data();
      console.log(docsData);
      await updateDoc(doc(db, "users", uid), {
        coins: (docsData.coins || 0) + values.numberOfPassengers * 500,
      });
    }
    // setSelectedRide(null);
    setFreshData(!freshData);
    resetForm();
    setSuccess(true);
    setOpenBooking("");
  };
  const { freshData, setFreshData, uid } = useContext(applicationContext);
  const formRef = useRef(null);
  const handleRef = function () {
    const { current } = formRef;
    if (current !== null) {
      current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const {
    selectedId,
    selectedRide,
    setSelectedId,
    filteredDates,
    plusChildrenCount,
    minusChildrenCount,
    plusPassengerCount,
    minusPassengerCount,
    validationSchema,
    plusPreteenCount,
    minusPreteenCount,
    ticketInfo,
    setTicketInfo,
    user,
    setSuccess,
    setFail,
    reservationInfo,
    EUR,
    prices,
    selectedTour,
  } = useContext(bookingContext);
  const newDate = new Date(selectedTour?.data.date);
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -40%)",
    width: "400px",
    margin: "5rem 0",
    bgcolor: "#000000",
    cololr: "#FFF",
    outline: "none",
    maxHeight: "fit-content",
    boxShadow: 24,
    p: 4,
  };
  const style2 = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -40%)",
    width: "400px",
    height: "70vh",
    bgcolor: "#000000",
    cololr: "#FFF",
    border: "2px solid #000",
    maxHeight: "fit-content",
    boxShadow: 24,
    p: 4,
  };
  const buttonColor =
    selectedTour?.data.type === "daytime"
      ? "primary"
      : selectedTour?.data.type === "night"
      ? "secondary"
      : selectedTour?.data.type === "half day"
      ? "error"
      : selectedTour?.data.type === "full day"
      ? "success"
      : "warning";
  return (
    <Modal
      open={openBooking}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        overflow: "scroll",
        zIndex: "9999",
        outline: "none",
      }}
    >
      <Box sx={style} className="box-modal">
        <div
          style={{
            color: "#FFF",
            display: "flex",
            flexDirection: "column",
            border: "4px solid black",
          }}
          // className="form-modal"
          // style={{ visibility: openBooking === "" ? "hidden" : "visible" }}
        >
          {/* <img
            src={`${process.env.PUBLIC_URL}/close.png`}
            alt="close-modal"
            className="close-modal-img"
            onClick={function () {
              setOpenBooking("");
              setShowOverlay(false);
            }}
          /> */}
          <Button
            size="small"
            onClick={function () {
              setOpenBooking("");
              // setShowOverlay(false);
            }}
            style={{
              color: "#ed6c02",
              alignSelf: "end",
              marginTop: "23px",
            }}
          >
            Close
          </Button>

          <div className="tour-display" ref={ref}>
            {selectedRide && <p>Selected Tour:</p>}
            {selectedRide && (
              <p style={{ fontSize: "25px", color: "cyan" }}>
                {selectedRide?.data.name}
              </p>
            )}
            {selectedRide && filteredDates.length !== 0 && (
              <h3 className="tour-title">
                Select day/date/time: <span>*</span>
              </h3>
            )}
          </div>
          <div className="dateWrapper">
            <div className="dateWrapperScroll">
              {filteredDates.length === 0 && selectedRide ? (
                <div
                  style={{
                    backgroundColor: "red",
                    padding: "20px",
                    color: "white",
                  }}
                >
                  <p style={{ color: "white" }}>Sorry, there are no </p>
                  <p style={{ color: "white" }}>tours in this week.</p>
                </div>
              ) : (
                filteredDates.map((obj, i) => {
                  const { date, type, availableSeats, id } = obj;
                  return (
                    <TourButton
                      disabled={availableSeats === 0}
                      key={i}
                      onClick={() => {
                        setSelectedId(id);
                        setFormModal(true);
                        handleRef();
                      }}
                      isSelected={selectedId === id}
                      tourDate={dayjs(new Date(date)).format("ddd DD-MM HH:mm")}
                      type={type}
                    />
                  );
                })
              )}
            </div>
          </div>

          <Modal
            open={selectedTour && filteredDates.length > 0 && formModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              overflow: "scroll",
              zIndex: "9999",
            }}
          >
            <Box sx={style} className="box-modal">
              <div
                style={{
                  color: "#FFF",
                  display: "flex",
                  flexDirection: "column",
                }}
                // className="form-modal"
                // style={{ visibility: openBooking === "" ? "hidden" : "visible" }}
              >
                <Button
                  size="small"
                  onClick={function () {
                    console.log(filteredDates);
                    console.log(selectedTour);
                    console.log(ride);
                    setFormModal(false);
                  }}
                  style={{
                    color: "#ed6c02",
                    alignSelf: "start ",
                    marginTop: "13px",
                    paddingTop: "25px",
                  }}
                >
                  Back
                </Button>
                <div
                  className="tour-display"
                  ref={ref}
                  style={{ gap: ".5rem" }}
                  onClick={console.log(selectedTour)}
                >
                  {selectedRide && <p>Selected Tour:</p>}
                  {selectedRide && (
                    <p style={{ fontSize: "25px", color: "cyan" }}>
                      {selectedRide?.data.name}
                    </p>
                  )}
                  <p>
                    Date: {dayjs(new Date(newDate)).format("DD-MM YYYY HH:mm")}
                  </p>
                  <p style={{ marginBottom: ".5rem" }}>
                    Type:{" "}
                    {selectedTour?.data.type[0].toUpperCase() +
                      selectedTour?.data.type.slice(1)}
                  </p>
                </div>
                <Formik
                  initialValues={reservationInfo}
                  validationSchema={() => validationSchema(selectedTour)}
                  onSubmit={handleSubmit}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="res-form" ref={formRef}>
                      <section className="form-section">
                        <Button
                          color={buttonColor}
                          sx={{ fontWeight: "bold", color: "white" }}
                          variant="contained"
                          onClick={() => {
                            setFreshData(!freshData);
                            console.log(uid);
                            console.log(selectedTour);
                          }}
                          size="large"
                          style={{ width: "100%" }}
                        >
                          {selectedTour.data.availableSeats +
                            (selectedTour.data.availableSeats === 1
                              ? " seat left"
                              : " seats left")}
                        </Button>

                        <h3>
                          Adults: <span>*</span>
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            width: "100%",
                          }}
                        >
                          <Button
                            color={buttonColor}
                            size="large"
                            variant="contained"
                            onClick={() =>
                              minusPassengerCount(setFieldValue, values)
                            }
                            aria-label="add"
                          >
                            <RemoveIcon />
                          </Button>
                          <Field
                            style={{
                              width: "30px",
                              fontSize: "30px",
                              color: "white",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            type="number"
                            name="numberOfPassengers"
                            disabled
                          />
                          <Button
                            color={buttonColor}
                            size="large"
                            variant="contained"
                            onClick={() =>
                              plusPassengerCount(setFieldValue, values)
                            }
                            aria-label="add"
                          >
                            <AddIcon />
                          </Button>
                        </div>
                        <p className="error-handle">
                          <ErrorMessage name="numberOfPassengers" />
                        </p>

                        <h3>Kids 8-12 years:</h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Button
                            color={buttonColor}
                            size="large"
                            variant="contained"
                            onClick={() =>
                              minusPreteenCount(setFieldValue, values)
                            }
                            aria-label="add"
                          >
                            <RemoveIcon />
                          </Button>
                          <Field
                            style={{
                              width: "30px",
                              fontSize: "30px",
                              color: "white",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            type="number"
                            name="preteens"
                            disabled
                          />
                          <Button
                            color={buttonColor}
                            size="large"
                            variant="contained"
                            onClick={() =>
                              plusPreteenCount(setFieldValue, values)
                            }
                            aria-label="add"
                          >
                            <AddIcon />
                          </Button>
                        </div>
                        <h3>Kids 0-7 years:</h3>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Button
                            color={buttonColor}
                            size="large"
                            variant="contained"
                            onClick={() =>
                              minusChildrenCount(setFieldValue, values)
                            }
                            aria-label="add"
                          >
                            <RemoveIcon />
                          </Button>
                          <Field
                            style={{
                              width: "30px",
                              fontSize: "30px",
                              color: "white",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            type="number"
                            name="children"
                            disabled
                          />
                          <Button
                            color={buttonColor}
                            size="large"
                            variant="contained"
                            onClick={() =>
                              plusChildrenCount(setFieldValue, values)
                            }
                            aria-label="add"
                          >
                            <AddIcon />
                          </Button>
                        </div>
                        {window.innerWidth > 700 ? (
                          <div style={{ width: "100%" }}>
                            <h3>
                              Receptionist Name: <span>*</span>
                            </h3>
                            <Field
                              type="text"
                              name="receptionist"
                              placeholder="Receptionist"
                              className="form-field"
                              style={{
                                backgroundColor: "white",
                                height: "44px",
                                fontSize: "20px",
                                width: "100%",
                              }}
                            />
                            <p className="error-handle">
                              <ErrorMessage name="receptionist" />
                            </p>
                          </div>
                        ) : (
                          ""
                        )}

                        <h3>
                          Room number or One name: <span>*</span>
                        </h3>

                        <Field
                          type="text"
                          name="roomNumber"
                          placeholder="Number of room"
                          className="form-field"
                          style={{
                            backgroundColor: "white",
                            height: "44px",
                            fontSize: "20px",
                          }}
                        />
                        <p className="error-handle">
                          <ErrorMessage name="roomNumber" />
                        </p>

                        {/* <h3>
                  Promo Code: <span>*</span>
                </h3> */}
                        {ride.data.promoCode ? (
                          <Field
                            className="checkbox"
                            component="div"
                            name="promoCode"
                          >
                            <label htmlFor="promoCode">
                              Special Promo
                              <Field
                                type="checkbox"
                                id="promoCode"
                                name="promoCode"
                              />
                            </label>
                          </Field>
                        ) : (
                          ""
                        )}
                        <h3>
                          Payment method: <span>*</span>
                        </h3>
                        <Field
                          className="radio-group"
                          component="div"
                          name="isPaid"
                          style={{
                            display: "flex ",
                            flexDirection: "column",
                            fontSize: "24px",
                            marginTop: "7px",
                            marginBottom: !ride.data.promoCode ? "10px" : "",
                            gap: ".3rem",
                          }}
                        >
                          <label
                            htmlFor="radioOne"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              background: "#FFF",
                              color: "#000",
                              padding: "0.3rem",
                            }}
                          >
                            Paid in cash
                            <Field
                              type="radio"
                              id="radioOne"
                              name="isPaid"
                              value="true"
                            />
                          </label>
                          {ride.data.beforeBooking ? (
                            ""
                          ) : (
                            <label
                              style={{
                                color: "red",
                                display: "flex",
                                justifyContent: "space-between",
                                background: "#FFF",
                                padding: "0.3rem",
                                marginBottom: "13px",
                              }}
                              htmlFor="radioTwo"
                            >
                              Not paid
                              <Field
                                type="radio"
                                id="radioTwo"
                                name="isPaid"
                                value="false"
                              />
                            </label>
                          )}
                        </Field>
                        {console.log(values.promoCode)}
                        <p style={{ fontSize: "1.2em" }}>
                          Total price:{" "}
                          {values.promoCode
                            ? values.numberOfPassengers *
                                (prices.adults - (prices.adults && 500)) +
                              values.preteens *
                                (prices.preteens - (prices.preteens && 250)) +
                              values.children *
                                (prices.children - (prices.children && 250))
                            : values.numberOfPassengers * prices.adults +
                              values.preteens * prices.preteens +
                              values.children * prices.children}{" "}
                          DINARS
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
                        <p style={{ fontSize: "1.2em" }}>
                          <span style={{ visibility: "hidden" }}>
                            Total price:
                          </span>{" "}
                          {values.promoCode
                            ? Math.round(
                                ((values.numberOfPassengers *
                                  (prices.adults - (prices.adults && 500)) +
                                  values.preteens *
                                    (prices.preteens -
                                      (prices.preteens && 250)) +
                                  values.children *
                                    (prices.children -
                                      (prices.children && 250))) /
                                  EUR) *
                                  100
                              ) / 100
                            : Math.round(
                                ((values.numberOfPassengers * prices.adults +
                                  values.preteens * prices.preteens +
                                  values.children * prices.children) /
                                  EUR) *
                                  100
                              ) / 100}{" "}
                          EUROS
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
                        <Button
                          color={buttonColor}
                          sx={{ fontWeight: "bold" }}
                          variant="contained"
                          type="submit"
                          size="large"
                          style={{ width: "100%", marginTop: "13px" }}
                        >
                          Book now
                        </Button>
                      </section>
                    </Form>
                  )}
                </Formik>
              </div>
            </Box>
          </Modal>
        </div>
      </Box>
    </Modal>
  );
});
export default FormCard;
