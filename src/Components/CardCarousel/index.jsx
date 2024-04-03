import React from "react";
import { Carousel } from "react-responsive-carousel";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../CardCarousel/carousel.css";
import Button from "@mui/material/Button";
import { imgs } from "./imgs";
function CardCarousel({ handleCarousel }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    minWidth: 400,
    width: "50%",
    bgcolor: "#000000",
    cololr: "#FFF",
    border: "2px solid #000",
    // margin: "auto",
    // height: "500px",
    // margin: "15rem 0",

    boxShadow: 24,
    outline: "none",
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
      fullWidth={true}
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
              src={`${process.env.PUBLIC_URL}/carousel/carousel1.JPG`}
              alt="carousel"
              className="carousel-img"
              style={{ maxWidth: "900px" }}
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel2.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel3.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel4.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel5.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel6.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel7.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel8.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel9.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel10.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel11.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel12.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel13.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel14.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel15.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel16.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel17.JPG`}
              alt="carousel"
            />
          </div>
          <div style={{ height: "200px" }}>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel18.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel19.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel20.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel21.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel22.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel23.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel24.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel25.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel26.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel27.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel28.JPG`}
              alt="carousel"
            />
          </div>
          <div style={{ height: "200px" }}>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel29.JPG`}
              alt="carousel"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/carousel/carousel30.JPG`}
              alt="carousel"
            />
          </div>
        </Carousel>
      </Box>
    </Modal>
  );
}

export default CardCarousel;
