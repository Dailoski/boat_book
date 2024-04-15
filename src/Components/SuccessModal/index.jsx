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
  StyleSheet,
  Link,
  // Font
} from "@react-pdf/renderer";
import qrCode from "../../assets/qr-code.jpg";
import barcode from "../../assets/barcode.png";
import dayjs from "dayjs";
import { Button } from "@mui/material";
// import Roboto from "typeface-roboto"

const SuccessModal = ({ setSuccess, ticketInfo, selectedRide }) => {
  const { userData } = useContext(applicationContext);

  //   Font.register({family:'Roboto', format:'truetype', src: Roboto
  // })

  // const tourDate = dayjs(new Date(ticketInfo.date)).format("ddd DD-MM HH:mm");
  const tourDate = new Date(ticketInfo.date);
  const meetingTime = dayjs(new Date(tourDate - 1800000)).format("HH:mm");
  const currentDate = dayjs(new Date()).format("DD-MM-YYYY HH:mm");
  const styles = StyleSheet.create({
    page: {
      width: "95%",
      paddingTop: "20px",
      margin: "0 auto",
      justifyContent: "center",
      alignItems: "center",
    },
    qrCode: {
      // position: "absolute",
      // top: 20,
      // right: 20,
      width: "45%",
      margin: "10px auto",
    },
    fullp: {
      width: "100%",
      paddingVertical: "15px",
      borderTop: "2px solid black",
      borderBottom: "2px solid black",
      display: "flex",
      flexDirection: "column",
    },
    fullBottom: {
      width: "100%",
      paddingVertical: "5px",

      display: "flex",
      flexDirection: "row",
    },
    halfp: {
      width: "100%",
    },
    // middle: {
    //   width: "100%"
    // },
    meetTitle: {
      fontFamily: "Helvetica-Bold",
      paddingBottom: "5px",
      fontSize: "18px",
    },
    meetAddress: {
      fontFamily: "Helvetica-Bold",
      fontSize: "14px",
      width: "100%",
      textAlign: "center",
      paddingBottom: "5px",
    },
    scanqr: {
      fontSize: "14px",
      fontFamily: "Helvetica-Bold",
      color: "red",
    },
    meetPointTime: {
      fontFamily: "Helvetica-Bold",
      fontSize: "14px",
      paddingBottom: "5px",
    },
    tourText: {
      paddingBottom: "5px",
      fontSize: "15px",
    },
    passengersTitle: {
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      fontSize: "14px",
      marginBottom: "5px",
    },
    passengersTitleWithTopMarging: {
      marginTop: "10px",
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      fontSize: "14px",
      marginBottom: "5px",
    },
    passengersText: {
      fontFamily: "Helvetica-Bold",
      paddingBottom: "20px",
      textTransform: "uppercase",
      fontSize: "14px",
    },
    discount: {
      fontFamily: "Helvetica-Bold",
      fontSize: "14px",
    },
    isPaid: {
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      fontSize: "14px",
      color: "green",
    },
    notPaid: {
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      fontSize: "14px",
      color: "red",
    },
    isPaidBig: {
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      fontSize: "25px",
      color: "green",
      width: "100%",
    },
    notPaidBig: {
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      fontSize: "25px",
      color: "red",
      width: "100%",
    },
    isPaidWithPadding: {
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      fontSize: "14px",
      color: "green",
      paddingBottom: "20px",
    },
    notPaidWithPadding: {
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      fontSize: "14px",
      color: "red",
      paddingBottom: "20px",
    },
  });
  console.log(typeof ticketInfo.prices.children);
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
                {selectedRide?.data.name}
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
                {ticketInfo?.receptionist ? "Yes" : "No"}
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
  return (
    <div className="successModal" onClick={() => setSuccess(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <BlobProvider document={Tiketino}>
          {({ blob, url, loading, error }) => {
            console.log(blob);
            console.log(url);
            console.log(loading);
            console.log(error);
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
