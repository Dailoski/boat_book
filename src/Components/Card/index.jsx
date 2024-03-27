import React, { useContext, useEffect, useRef, useState } from "react";
import FormCard from "../Form";
import { applicationContext, bookingContext } from "../../context";
import CardCarousel from "../CardCarousel";

function CardContainer({ ride }) {
  const { allDocs, rides, setShowOverlay } = useContext(applicationContext);
  const { setAvailableDates, setSelectedId, setSelectedRide, selectedRide } =
    useContext(bookingContext);
  const [openBooking, setOpenBooking] = useState("");
  const scrollRef = useRef(null);
  const cardRef = useRef();
  const [carousel, showCarousel] = useState(false);

  const handleCarousel = function () {
    showCarousel((prev) => !prev);
  };

  const handleImageClick = (selectedBoat) => {
    const dates = allDocs
      ?.filter((e) => e.data.boat === selectedBoat)
      .map((e) => ({
        id: e.id,
        date: e.data.date,
        type: e.data.type,
        availableSeats: e.data.availableSeats,
      }));

    setAvailableDates(dates);
    setSelectedId(null);
    setSelectedRide(() => rides.find((e) => selectedBoat === e.id));

    if (openBooking === "" || openBooking?.id !== selectedRide?.id) {
      setOpenBooking(() => rides.find((e) => selectedBoat === e.id));
    } else {
      setOpenBooking("");
    }

    setShowOverlay(true);
    // console.log(selectedRide?.id);
    // console.log(openBooking?.id);
    // console.log(scrollRef);
  };
  return (
    <>
      <div className="card" ref={cardRef}>
        <img
          className="pointer"
          style={{ width: "80px", position: "absolute" }}
          src={`${process.env.PUBLIC_URL}/gallery.svg`}
          alt="pointer-img"
          onClick={handleCarousel}
        />

        <img src={ride.data.image} alt={ride.data.name} key={ride.id} />
        <hr />
        <h2>{ride.data.name}</h2>
        <h3>
          Google rating: {ride.data.rating}{" "}
          <span style={{ color: "#F9992E" }}>
            {[...Array(Math.round(ride.data.rating))].map(() => {
              return <>&#9733;</>;
            })}
          </span>{" "}
        </h3>
        <hr />
        <div className="tour-desc">
          {ride.data.desc.map((e) => {
            return (
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/${e.img}`}
                  alt="card=img"
                />
                <p dangerouslySetInnerHTML={{ __html: e.text }}></p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            fontSize: "25px",
            width: "fit-content",
            fontFamily: "Gagalin",
            margin: "15px auto 15px auto",
          }}
          dangerouslySetInnerHTML={{ __html: ride.data.price }}
        ></div>
      </div>

      <div>
        {/* <img style={{width:"100%"}} src={`${process.env.PUBLIC_URL}/gallery.svg`} /> */}
        {ride.data.external ? (
          <img
            className="pointer"
            style={{
              width: "80%",
              margin: "15px auto",
              display: "block",
            }}
            src={`${process.env.PUBLIC_URL}/wa.svg`}
            alt="pointer-img"
          />
        ) : (
          <img
            className="pointer refbutton"
            onClick={() => handleImageClick(ride.id)}
            style={{
              width: "80%",
              margin: "15px auto",
              display: "block",
            }}
            src={`${process.env.PUBLIC_URL}/book.svg`}
            alt="pointer-img"
          />
          // <img
          //   className="pointer"
          //   onClick={function () {
          //     handleNavigate();
          //     handleImageClick();
          //   }}
          //   style={{
          //     width: "80%",
          //     margin: "15px auto",
          //     display: "block",
          //   }}
          //   src={`${process.env.PUBLIC_URL}/book.svg`}
          //   alt="pointer-img"
          // />
        )}
      </div>

      {openBooking?.id === selectedRide?.id ? (
        <FormCard
          ref={scrollRef}
          openBooking={openBooking}
          setOpenBooking={setOpenBooking}
        />
      ) : (
        ""
      )}
      {carousel ? <CardCarousel handleCarousel={handleCarousel} /> : ""}
    </>
  );
}

export default CardContainer;
