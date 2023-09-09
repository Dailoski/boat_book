import { React, useContext } from "react";
import { applicationContext } from "../../context";

import "./choose-boat.scss";

const ChooseBoat = ({ setAvailableDates, setSelectedRide, selectedRide,setSelectedId}) => {
  
  const { allDocs, rides } = useContext(applicationContext);
  const handleImageClick = (selectedBoat) => {
    const dates = allDocs?.filter((e) => e.data.boat === selectedBoat)
      .map((e) => ({id: e.id, date: e.data.date, type: e.data.type, availableSeats:e.data.availableSeats}));
      
    setAvailableDates(dates);
    setSelectedId(null)
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
      {filteredRItes.map(
        ride => (
          <div onClick={() => handleImageClick(ride.id)} className="card">
            <img
          src={ride.data.image}
          alt={ride.data.name}
          key={ride.id}
        />
        <hr/>
        <h2>{ride.data.name}</h2>
        <h3>Google rating: 4.7 <span style={{color:"yellow"}}>{[...Array(Math.round(4.7))].map(()=>{return <>&#9733;</>})}</span> </h3>
        <hr/>
        <div className="tour-desc">
          {[{img:"guide.svg", text:"LIVE TOUR  GUIDE"},{img:"guide.svg", text:"LIVE TOUR  GUIDE"},
          {img:"guide.svg", text:"LIVE TOUR  GUIDE"},{img:"guide.svg", text:"LIVE TOUR  GUIDE"},
          {img:"guide.svg", text:"LIVE TOUR  GUIDE"},{img:"guide.svg", text:"LIVE TOUR  GUIDE"},].map(e=>{
            return(
              <div>
              <img src={`${process.env.PUBLIC_URL}/icons/${e.img}`} />
              <p>{e.text}</p>
            </div>
            )
          })}
        </div>
          </div>
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

      { selectedRide && <p>
        Selected Tour: 
      </p>}
      { selectedRide && <p style={{ fontSize: "25px", color: "cyan"}}>
        {selectedRide?.data.name}
      </p>}
      
    </div>
  );
};

export default ChooseBoat;
