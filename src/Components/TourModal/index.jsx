import React, { useContext } from "react";
import { applicationContext } from "../../context";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./tour-modal.scss";
import { DeleteButton } from "../DeleteButton";
import { collection, getDocs } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
const TourModal = ({ handleClose, clickedTour }) => {
  const { freshData, setFreshData, allDocs } = useContext(applicationContext);
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  const selectedTour = allDocs.filter((tour) => tour.id === clickedTour.id)[0];
  const handleDelete = async (resID, seats) => {
    const docRef = doc(db, "tours2024", selectedTour?.id);
    const updatedReservations = selectedTour?.data.reservations.filter(
      (reservation) => reservation.id !== resID
    );
    await updateDoc(docRef, {
      availableSeats: selectedTour.data.availableSeats + seats,
      reservations: updatedReservations,
    });
    setFreshData(!freshData);
  };
  // const children = selectedTour.data.reservations.reduce(
  //   (a, b) => a + b.children,
  //   0
  // );
  const handleCheckIn = async function (res, id) {
    console.log(id);
    const collectionRef = collection(db, "tickets2024");
    const querySnapshot = await getDocs(collectionRef);
    const docsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    const data = docsData.find((el) => el.data.roomNumber === res.roomNumber);
    console.log(data);
    const docRef = doc(db, "tickets2024", id);
    const docSnap = await getDoc(docRef);
    const docsData2 = docSnap.data();
    console.log(docsData2);
    await updateDoc(doc(db, "tickets2024", id), {
      checkedIn: true,
      hasntShown: false,
    });
  };
  const handleNotShown = async function (id) {
    const docRef = doc(db, "tickets2024", id);
    const docSnap = await getDoc(docRef);
    const docsData2 = docSnap.data();
    console.log(docsData2);
    await updateDoc(doc(db, "tickets2024", id), {
      hasntShown: true,
      checkedIn: false,
    });
  };
  return (
    <div className="div-modal-tour" onClick={handleOverlayClick}>
      <div className="modal-container">
        <main>
          <h1>Tour Info</h1>
          <button onClick={handleClose}>X</button>
        </main>
        <section>
          <div className="seats-boat">
            <h5>Available Seats:</h5>
            <p>{selectedTour.data.availableSeats} seats</p>

            <h5>Name of the Tour:</h5>
            <p>{selectedTour.data.boat} </p>
          </div>
          <div className="reservation-passengers">
            <h4>Reservations:</h4>
            {selectedTour.data.reservations?.map((e, i) => (
              <div key={i} className="reservation-content">
                <div className="user-email">
                  <h5>Seller email:</h5>
                  <p>{e.userEmail}</p>
                </div>
                <div className="modal-content">
                  <h5>Reservation room:</h5>
                  <p>{e.roomNumber}</p>
                </div>
                <div className="modal-content">
                  <h5>Number of adults:</h5>
                  <p>{e.numberOfPassengers}</p>
                </div>
                <div className="modal-content">
                  <h5>Preteens:</h5>
                  <p>{e.preteens}</p>
                </div>
                <div className="modal-content">
                  <h5>Small children:</h5>
                  <p>{e.children}</p>
                </div>
                <div className="modal-content">
                  <h5>Is Paid:</h5>
                  <p>{JSON.parse(e.isPaid) === true ? "paid" : "not paid"}</p>
                </div>
                <div className="modal-content">
                  <h5>Phone number:</h5>
                  <p>{e.phoneNumber}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <button
                    style={{ padding: ".5rem", backgroundColor: "green" }}
                    onClick={() => handleCheckIn(e, e.id)}
                  >
                    Checked in
                  </button>
                  <button
                    style={{ padding: ".5rem" }}
                    onClick={() => handleNotShown(e.id)}
                  >
                    Hasn't shown
                  </button>
                </div>

                <DeleteButton
                  deleteHandler={() =>
                    handleDelete(
                      e.id,
                      e.numberOfPassengers + e.preteens + e.children
                    )
                  }
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TourModal;
