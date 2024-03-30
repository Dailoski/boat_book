import React from "react";
import { Carousel } from "react-responsive-carousel";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../CardCarousel/carousel.css";
import Button from "@mui/material/Button";
function CardCarousel({ handleCarousel }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -40%)",
    width: 400,
    bgcolor: "#000000",
    cololr: "#FFF",
    border: "2px solid #000",
    maxHeight: "fit-content",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "scroll" }}
    >
      <Box sx={style} className="carousel-box">
        <Button
          size="small"
          onClick={handleCarousel}
          style={{
            color: "#ed6c02",
            alignSelf: "end",
            marginBottom: "13px",
          }}
        >
          Close
        </Button>
        <Carousel className="carousel">
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/backicon.png`}
              alt="carousel"
            />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/backicon.png`}
              alt="carousel"
            />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/backicon.png`}
              alt="carousel"
            />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </Box>
    </Modal>
  );
}

export default CardCarousel;
