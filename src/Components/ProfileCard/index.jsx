import React, { useContext } from "react";
import dayjs from "dayjs";
import { applicationContext } from "../../context";
import SuccessModal from "../SuccessModal";
function ProfileCard() {
  const { reservation } = useContext(applicationContext);
  return (
    <>
      <h1>Reservations</h1>

      <div
        className="profile-card"
        style={{
          position: "relative",
        }}
      >
        {reservation
          .sort((a, b) => Date.parse(a.data.date) - Date.parse(b.data.date))
          .map((res) => {
            return (
              <div
                className="profile-card-content"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".3rem",
                  }}
                >
                  <h2>
                    <span className="profile-span">Tour: </span>
                    {res.data.boat}
                  </h2>
                  {!res.data.promoCode && res.data.specialPromo ? (
                    <p
                      style={{
                        color: "white",
                        width: "fit-content",
                      }}
                    >
                      <span style={{ color: "yellow" }}>Coins: </span>
                      {res.data.numberOfPassengers * 500}
                    </p>
                  ) : (
                    ""
                  )}

                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: ".5rem",
                    }}
                  >
                    <li>
                      <span className="profile-span">Adults:</span>{" "}
                      {res.data.numberOfPassengers}
                    </li>
                    <li>
                      <span className="profile-span">Preteens:</span>{" "}
                      {res.data.preteens}
                    </li>
                    <li>
                      <span className="profile-span">Children:</span>{" "}
                      {res.data.children}
                    </li>
                  </ul>

                  <p>
                    <span className="profile-span">Date: </span>
                    {dayjs(new Date(res.data.date)).format("DD-MM YYYY HH:mm")}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <img
                    src={`${process.env.PUBLIC_URL}/printdugme.svg`}
                    alt="print-icon"
                    className="print-icon"
                    style={{ width: "150px", cursor: "pointer" }}
                  /> */}
                  <SuccessModal ticketInfo={res.data} buttonMode={true}/>
                  {res.data.checkedIn ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/checkedin.svg`}
                      alt="-icon"
                      className="print-icon"
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {res.data.hasntShown ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/hasntshown.svg`}
                      alt="-icon"
                      className="print-icon"
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>

                {res.data.receptionist && window.innerWidth > 700 ? (
                  <p style={{ position: "absolute", left: "50%", top: "85%" }}>
                    <span className="profile-span">Receptionist Name:</span>{" "}
                    {res.data.receptionist}
                  </p>
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ProfileCard;
