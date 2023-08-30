import React, { useState } from "react";
import "./addNewTourModal.scss";
import close from "./close.png";
import TextField from "@mui/material/TextField";


function AddNewTourModal({modalIsOpen, setModalIsOpen}) {

    const [tourImage, setTourImage] = useState("");
    const [meetingPoint, setMeetingPoint ] = useState("");
    const [tourName, setTourName ] = useState("");
    const [isSubmitted, setIsSubmitted ] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const createTour = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    
        const data = {
        tourImage: tourImage,
        meetingPoint: meetingPoint,
        tourName: tourName
        };}


  return (
    <>

    <div className={`addNewTourModal ${modalIsOpen ? "show" : ""}`}>
        <form className="modal-card" onSubmit={(e) => (createTour)}> 
        <img
            src={close}
            className="close"
            onClick={() => {
              setModalIsOpen(false);
            }}
          />
          <div className="tourImage">
            <TextField
              id="outlined-basic"
              label="Image url"
              variant="standard"
              color="warning"
              fullWidth={true}
              type="text"
              onChange={(event) => {
                setTourImage(event.target.value);
              }}
              value={tourImage}
              required
            />
            <div className="errorMessage">{errorMessage}</div>
          </div>

          <div className="meetingPoint">
            <TextField
              id="outlined-basic"
              label="Meeting point"
              variant="standard"
              color="warning"
              fullWidth={true}
              type="text"
              onChange={(event) => {
                setMeetingPoint(event.target.value);
              }}
              value={meetingPoint}
              required
            />
            <div className="errorMessage">{errorMessage}</div>
          </div>

          <div className="tourName">
            <TextField
              id="outlined-basic"
              label="Tour name"
              variant="standard"
              color="warning"
              fullWidth={true}
              type="text"
              onChange={(event) => {
                setTourName(event.target.value);
              }}
              value={tourName}
              required
            />
            <div className="errorMessage">{errorMessage}</div>
          </div>

          <div className="submitButton">
            <button disabled={isSubmitted}>
              Submit
            </button>
            </div>
        </form>
    
    </div>

    </>
  )
    
    
}

export default AddNewTourModal