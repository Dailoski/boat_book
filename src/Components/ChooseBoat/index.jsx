import { React, useContext } from "react";
import { applicationContext } from "../../context";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import "./choose-boat.scss";
import CardContainer from "../Card";

const ChooseBoat = ({
  setAvailableDates,
  setSelectedRide,
  selectedRide,
  setSelectedId,
  filteredDates,
}) => {
  const { allDocs, rides } = useContext(applicationContext);

  const sortedRides = [...rides].sort(
    (a, b) => a.data.position - b.data.position
  );
  const filteredRItes = sortedRides.filter((a) => a.data.isAvailable);
  return (
    <div className="div-choose-boat">
      <div className="choose-boat" style={{ alignItems: "flex-start" }}>
        {/* {filteredRItes.map(
        ride => (
          <img
          onClick={() => handleImageClick(ride.id)}
          src={ride.data.image}
          alt={ride.data.name}
          key={ride.id}
        />
        )
      )} */}
        {filteredRItes.map((ride) => (
          <div className="card-and-buttons">
            <CardContainer
              ride={ride}
              filteredDates={filteredDates}
              setSelectedId={setSelectedId}
              selectedRide={selectedRide}
              setSelectedRide={setSelectedRide}
              setAvailableDates={setAvailableDates}
            />
          </div>
        ))}
        {/* <img
          onClick={() => handleImageClick("turtle-boat")}
          src={turtleImg}
          alt="Turtle Boat"
        />
        <img
          onClick={() => handleImageClick("key-boat")}
          src={keyImg}
          alt="Key Boat"
        />
        <img
          onClick={() => handleImageClick("nikola-tesla-boat")}
          src={teslaImg}
          alt="Nikola Tesla Boat"
        />
        <img
          onClick={() => handleImageClick("open-bus")}
          src={busImg}
          alt="Open Bus"
        /> */}
      </div>
    </div>
  );
};

export default ChooseBoat;
