import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import { TourButton } from "../TourButton";
import dayjs from "dayjs";
import { applicationContext, bookingContext } from "../../context";
import "../Form/form.css";
function FormCard({ handleImageClick }) {
  const { freshData, setFreshData } = useContext(applicationContext);
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
    handleSubmit,
    reservationInfo,
    EUR,
    prices,
    selectedTour,
  } = useContext(bookingContext);
  return (
    <>
      <div className="tour-display">
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
      {selectedTour && filteredDates.length > 0 && (
        <Formik
          initialValues={reservationInfo}
          validationSchema={() => validationSchema(selectedTour)}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="res-form">
              <section>
                <Button
                  color="warning"
                  sx={{ fontWeight: "bold", color: "white" }}
                  variant="contained"
                  onClick={() => {
                    setFreshData(!freshData);
                  }}
                  size="large"
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
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button
                    color="warning"
                    size="large"
                    variant="contained"
                    onClick={() => minusPassengerCount(setFieldValue, values)}
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
                    color="warning"
                    size="large"
                    variant="contained"
                    onClick={() => plusPassengerCount(setFieldValue, values)}
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
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button
                    color="warning"
                    size="large"
                    variant="contained"
                    onClick={() => minusPreteenCount(setFieldValue, values)}
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
                    color="warning"
                    size="large"
                    variant="contained"
                    onClick={() => plusPreteenCount(setFieldValue, values)}
                    aria-label="add"
                  >
                    <AddIcon />
                  </Button>
                </div>
                <h3>Kids 0-7 years:</h3>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button
                    color="warning"
                    size="large"
                    variant="contained"
                    onClick={() => minusChildrenCount(setFieldValue, values)}
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
                    color="warning"
                    size="large"
                    variant="contained"
                    onClick={() => plusChildrenCount(setFieldValue, values)}
                    aria-label="add"
                  >
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
                <Field className="checkbox" component="div" name="promoCode">
                  <label htmlFor="promoCode">
                    Promo
                    <Field type="checkbox" id="promoCode" name="promoCode" />
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
                  <label style={{ color: "red" }} htmlFor="radioTwo">
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
                  <span style={{ visibility: "hidden" }}>Total price:</span>{" "}
                  {values.promoCode
                    ? Math.round(
                        (values.numberOfPassengers *
                          (prices.adults - (prices.adults && 500)) +
                          values.preteens *
                            (prices.preteens - (prices.preteens && 250)) +
                          values.children *
                            (prices.children - (prices.children && 250))) /
                          EUR
                      )
                    : Math.round(
                        (values.numberOfPassengers *
                          Math.round(
                            prices.adults +
                              values.preteens * prices.preteens +
                              values.children * prices.children
                          )) /
                          EUR
                      )}{" "}
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
                  color="warning"
                  sx={{ fontWeight: "bold" }}
                  variant="contained"
                  type="submit"
                  size="large"
                >
                  Book now
                </Button>
              </section>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

export default FormCard;
