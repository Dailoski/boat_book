import React from "react";
import dayjs from "dayjs";
function ProfileCard({ reservation }) {
  return (
    <>
      <h1>Reservations</h1>

      <div className="profile-card">
        {reservation.map((res) => {
          return (
            <div
              className="profile-card-content"
              style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}
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
                  <span className="profile-span">Children</span>:{" "}
                  {res.data.preteens}
                </li>
                <li>
                  <span className="profile-span">Preteens</span>:{" "}
                  {res.data.children}
                </li>
                <li>
                  <span className="profile-span">Adults</span>:{" "}
                  {res.data.numberOfPassengers}
                </li>
              </ul>
              <p>
                <span className="profile-span">Number of Passangers: </span>
                {res.data.numberOfPassengers +
                  res.data.preteens +
                  res.data.children}
              </p>
              <p>
                <span className="profile-span">Date: </span>
                {dayjs(new Date(res.data.date)).format("DD-MM YYYY HH:mm")}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProfileCard;
