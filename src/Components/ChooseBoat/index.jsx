import { React, useContext } from "react";
import { applicationContext } from "../../context";
import "/node_modules/flag-icons/css/flag-icons.min.css";

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
          <div className="card-and-buttons">

          <div className="card">
        <img className="pointer" style={{width:"80px", position:"absolute"}} src={`${process.env.PUBLIC_URL}/gallery.svg`} />

            <img
          src={ride.data.image}
          alt={ride.data.name}
          key={ride.id}
        />
        <hr/>
        <h2>{ride.data.name}</h2>
        <h3>Google rating: {ride.data.rating} <span style={{color:"#F9992E"}}>{[...Array(Math.round(ride.data.rating))].map(()=>{return <>&#9733;</>})}</span> </h3>
        <hr/>
        <div className="tour-desc">
          {ride.data.desc.map(e=>{
            return(
              <div>
              <img src={`${process.env.PUBLIC_URL}/icons/${e.img}`} />
              <p dangerouslySetInnerHTML={{ __html: e.text }}></p>
            </div>
            )
          })}
        </div>
        
        <div style={{fontSize: "25px", width: "fit-content", fontFamily:"Gagalin", margin: "15px auto 15px auto"}} dangerouslySetInnerHTML={{ __html: ride.data.price }} > 
        </div>

          </div>
          <div >
          {/* <img style={{width:"100%"}} src={`${process.env.PUBLIC_URL}/gallery.svg`} /> */}
          {ride.data.external ? 
          <img className="pointer"  style={{width:"80%", margin:"15px auto", display:"block"}} src={`${process.env.PUBLIC_URL}/wa.svg`} />
          :
          <img className="pointer" onClick={() => handleImageClick(ride.id)}  style={{width:"80%", margin:"15px auto", display:"block"}} src={`${process.env.PUBLIC_URL}/book.svg`} />

        }

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
