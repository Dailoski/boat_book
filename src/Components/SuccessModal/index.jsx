import React from "react";
import "./successModal.scss";
import { useContext } from "react";
import { applicationContext } from "../../context";
import {
  BlobProvider,
  Page,
  Image,
  Text,
  View,
  Document,
  Link,
  // Font
} from "@react-pdf/renderer";
import qrCode from "../../assets/qr-code.jpg";
import barcode from "../../assets/barcode.png";
import dayjs from "dayjs";
import { styles } from "./cardHelpers";

const SuccessModal = ({ setSuccess, ticketInfo, selectedRide, buttonMode }) => {
  const { userData } = useContext(applicationContext);

  const tourDate = new Date(ticketInfo.date);
  const meetingTime = dayjs(new Date(tourDate - 1800000)).format("HH:mm");
  const currentDate = dayjs(new Date()).format("DD-MM-YYYY HH:mm");

  const Tiketino = (
    <Document>
      <Page size={["250"]}>
        <View style={styles.page}>
          <Text
            style={{ fontSize: "12px", color: "red", marginBottom: "1.5rem" }}
          >
            Napomena : Ovo nije fiskalni racun
          </Text>
          <Text style={styles.meetTitle}>Meeting point address:</Text>
          <Text style={styles.meetAddress} wrap>
            Main entrance of Kalemegdan park from Knez Mihailova
          </Text>
          <Text style={styles.meetAddress}> Pariska 15, Belgrade</Text>
          <Text style={styles.scanqr}>Scan or click QR code for location</Text>
          <Link
            style={styles.qrCode}
            target="_blank"
            src="https://maps.app.goo.gl/Vs3wHRYBbjiWvgtYA?g_st=ic"
          >
            <Image src={qrCode} />
          </Link>
          <Text style={styles.meetPointTime}>
            {"Meeting point time: " + meetingTime} h
          </Text>

          <View style={styles.fullp}>
            <View style={styles.halfp}>
              <Text style={styles.tourText}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>Tour: </Text>
                {selectedRide?.data.name || ticketInfo?.boat}
              </Text>
              <Text style={styles.tourText}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>Hotel: </Text>
                {userData?.hotel_name}
              </Text>
              <Text style={styles.tourText}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>Provider: </Text>
                {userData?.full_name}
              </Text>
              <Text style={styles.tourText}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>
                  Receptionist:{" "}
                </Text>
                {ticketInfo?.receptionist ? ticketInfo?.receptionist : "/"}
              </Text>
              <Text style={styles.tourText}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>
                  Room or name:{" "}
                </Text>
                {ticketInfo.roomNumber}
              </Text>
              <Text style={styles.tourText}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>
                  Departure:{" "}
                </Text>
                {dayjs(new Date(ticketInfo.date)).format("ddd DD-MM HH:mm") +
                  " h"}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.passengersTitleWithTopMarging}>
              Adults: {ticketInfo.numberOfPassengers} *{" "}
              {ticketInfo.prices.adults} DINARS
            </Text>

            {ticketInfo.preteens && (
              <Text style={styles.passengersTitle}>
                Kids 8-12 YEARS: {ticketInfo.preteens} *{" "}
                {ticketInfo.prices.preteens} DINARS
              </Text>
            )}
            {ticketInfo.children && (
              <Text style={styles.passengersTitle}>
                Kids 0-7 YEARS:{" "}
                {ticketInfo.prices.children
                  ? ticketInfo.children +
                    " * " +
                    ticketInfo.prices.children +
                    " DINARS"
                  : ticketInfo.children + " FOR FREE"}{" "}
              </Text>
            )}

            {ticketInfo.promoCode && (
              <View>
                <Text style={styles.discount}>PRICE: </Text>
                <Text style={styles.discount}>
                  {ticketInfo.ticketPrice} DINARS
                </Text>
                <Text style={styles.discount}>DISCOUNT WITH PROMO CODE: </Text>
                <Text style={styles.discount}>
                  {ticketInfo.ticketPrice - ticketInfo.priceWithDiscount} DINARS
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* </View> */}
        <View style={{ padding: "10px" }}>
          <Text
            style={
              JSON.parse(ticketInfo.isPaid) ? styles.isPaid : styles.notPaid
            }
          >
            {JSON.parse(ticketInfo.isPaid) ? "Paid in cash " : "Not paid"}
          </Text>
          <Text
            style={
              JSON.parse(ticketInfo.isPaid)
                ? styles.isPaidBig
                : styles.notPaidBig
            }
          >
            TOTAL:
          </Text>
          <Text
            style={
              JSON.parse(ticketInfo.isPaid)
                ? styles.isPaidBig
                : styles.notPaidBig
            }
          >
            {ticketInfo.priceWithDiscount} DINARS
          </Text>
          <Text
            style={
              JSON.parse(ticketInfo.isPaid)
                ? styles.isPaidBig
                : styles.notPaidBig
            }
          >
            {Math.round((ticketInfo.priceWithDiscount / 118) * 100) / 100} EUROS
          </Text>
          <Image style={{ width: "95%", marginTop: "5px" }} src={barcode} />
        </View>
        <Text style={{ textAlign: "center" }}>cruisebelgrade.com </Text>
        <Text
          style={{ textAlign: "center", fontSize: "10px", marginTop: "5px" }}
        >
          {currentDate}
        </Text>
      </Page>
    </Document>
  );
  return (buttonMode ?  <BlobProvider document={Tiketino}>
          {({ blob, url, loading, error }) => {
            return (
              <img
    src={`${process.env.PUBLIC_URL}/printdugme.svg`}
    alt="print"
    onClick={() => window.open(url, "_blank")}
    className="print-icon"
    style={{ width: "150px", cursor: "pointer" }}
  />
            );
          }}
        </BlobProvider> :
    <div className="successModal" onClick={() => setSuccess(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <BlobProvider document={Tiketino}>
          {({ blob, url, loading, error }) => {
            return (
              <div className="modal-content">
                <button
                  style={{
                    padding: "3px",
                    fontSize: "18px",
                    position: "relative",
                    right: "-155px",
                    top: "-37px",
                    color: "black",
                  }}
                  onClick={() => setSuccess(false)}
                >
                  close
                </button>
                <p>Thank you for making a reservation!</p>
                <img
                  src={`${process.env.PUBLIC_URL}/ticketdugme2.png`}
                  alt="print"
                  onClick={() => window.open(url, "_blank")}
                  style={{ cursor: "pointer", width: "350px" }}
                />
                {/* <Button
                  variant="contained"
                  onClick={() => window.open(url, "_blank")}
                >
                  OPEN TICKET
                </Button> */}
              </div>
            );
          }}
        </BlobProvider>
      </div>
    </div>
  );
};

export default SuccessModal;
