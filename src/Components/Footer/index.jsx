import React, { useContext } from "react";
import "./footer.scss";
import { applicationContext } from "../../context";

const Footer = () => {
  const { userData } = useContext(applicationContext);
  return (
    <div
      className="div-footer"
      onClick={() => {
      }}
    >
      {userData ? (
        <>
          <span>Reservation support:</span>{" "}
          <a
            href="tel:0693339696"
            style={{
              padding: "10px",
              paddingTop: "13px",
              backgroundColor: "#FEC034",
              borderRadius: "7px",
            }}
            target="_blank"
            rel="noreferrer"
          >
            0693339696
          </a>
        </>
      ) : (
        <span>Only for Receptionist Club members</span>
      )}
      {/* <div style={{ display: "flex", alignItems: "center" }}>
        <p>{userData.coins ? userData.coins : "You have 0 coins"}</p>
        <img
          src={`${process.env.PUBLIC_URL}/coindugme.svg`}
          alt="coin"
          style={{ cursor: "pointer", width: "70px", height: "50px" }}
        />
      </div> */}
    </div>
  );
};

export default Footer;
