import React from "react";

function ProfileCard({ reservation }) {
  return (
    <>
      <h1>Reservations</h1>

      <div className="profile-card">
        {reservation.map((res) => {
          return (
            <div className="profile-card-content">
              <h2>
                <span>Tour: </span>
                {res.data.boat}
              </h2>
              <p>
                <span>Price: </span>
                {res.data.ticketPrice}
              </p>
              <p>
                <span>Number of Passangers: </span>
                {res.data.numberOfPassengers}
              </p>
              <p>
                <span>Date: </span>
                {res.data.date}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProfileCard;
