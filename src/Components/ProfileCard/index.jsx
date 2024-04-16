import React, { useContext } from "react";
import dayjs from "dayjs";
import { applicationContext } from "../../context";
function ProfileCard() {
  const { reservation } = useContext(applicationContext);
  return (
    <>
      <h1>Reservations</h1>

      <div className="profile-card">
        {reservation
          .sort((a, b) => Date.parse(a.data.date) - Date.parse(b.data.date))
          .map((res) => {
            console.log(res);
            return (
              <div
                className="profile-card-content"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
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
                  {!res.data.promoCode ? (
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
                      {res.data.children}
                    </li>
                    <li>
                      <span className="profile-span">Children:</span>{" "}
                      {res.data.preteens}
                    </li>
                  </ul>

                  <p>
                    <span className="profile-span">Date: </span>
                    {dayjs(new Date(res.data.date)).format("DD-MM YYYY HH:mm")}
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <img
                    src={`${process.env.PUBLIC_URL}/printdugme.svg`}
                    alt="print-icon"
                    className="print-icon"
                    style={{ width: "150px", cursor: "pointer" }}
                  />
                  {res.data.checkedIn ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/checkedin.svg`}
                      alt="-icon"
                      className="print-icon"
                      style={{ width: "50px", cursor: "pointer" }}
                    />
                  ) : (
                    ""
                  )}
                  {res.data.hasntShown ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/hasntshown.svg`}
                      alt="-icon"
                      className="print-icon"
                      style={{ width: "50px", cursor: "pointer" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ProfileCard;
