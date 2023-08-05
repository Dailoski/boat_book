import { React, useContext } from "react";
import { useRef } from "react";
import { applicationContext } from "../../context";

import "./choose-boat.scss";

const ChooseBoat = ({ setAvailableDates, setSelectedRide, selectedRide,setSelectedDate }) => {
  
  const { allDocs, rides } = useContext(applicationContext);
  const boatRef = useRef(null);
  const handleImageClick = (selectedBoat) => {
    const dates = allDocs?.filter((e) => e.data.boat === selectedBoat)
      .map((e) => ({date: e.data.date, type: e.data.type}));
      
    setAvailableDates(dates);
    setSelectedDate(null)
    setSelectedRide(()=>rides.find((e)=>selectedBoat === e.id))
    setTimeout(() => {
    document.querySelector(".div-footer").scrollIntoView({ behavior: "smooth" });
    }, 0);

     // 
    // }, 0);
  };
  const sortedRides = [...rides].sort((a,b)=> a.data.position - b.data.position)
  const filteredRItes = sortedRides.filter(a => a.data.isAvailable)
  return (
    <div className="div-choose-boat">
      <h4>Click on tour photo to make reservation now</h4>
      <div className="choose-boat">
      {filteredRItes.map(
        ride => (
          <img
          onClick={() => handleImageClick(ride.id)}
          src={ride.data.image}
          alt={ride.data.name}
          key={ride.id}
        />
        )
      )}
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

     { selectedRide && <p ref={boatRef}>
        Selected Tour: {selectedRide?.data.name}
      </p>}
    </div>
  );
};

export default ChooseBoat;
