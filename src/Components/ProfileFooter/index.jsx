import React, { useContext } from "react";

import { applicationContext } from "../../context";

const ProfileFooter = () => {
  const { userData, totalCoins } = useContext(applicationContext);
  return (
    <div
      className="div-footer"
      onClick={() => {
        console.log(userData);
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
      <div>{/* <p>{totalCoins}</p> */}</div>
    </div>
  );
};

export default ProfileFooter;
