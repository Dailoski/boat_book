import {
    StyleSheet
  } from "@react-pdf/renderer";
export   const styles = StyleSheet.create({
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