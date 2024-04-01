import { React, useContext, useState } from "react";
import { applicationContext } from "../../context";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment/moment";
import dayjs from "dayjs";
import "./admin-tours.scss";
import { DeleteButton } from "../DeleteButton";

const AdminTours = ({ handleOpen }) => {
  const { rides, allDocs, freshData, setFreshData } =
    useContext(applicationContext);
  const boats = ["Turtle Boat", "Key Boat", "Nikola Tesla Boat", "Open Bus"];
  const dateFormat = "YYYY-M-D HH:mm";
  const [selectedBoat, setSelectedBoat] = useState(boats[0]);
  const [pastTours, setPastTours] = useState(false);
  const handleDelete = async (e) => {
    await deleteDoc(doc(db, "tours2024", e.id));
    setFreshData(!freshData);
  };
  const filteredDocs = allDocs
    .filter((e) => e?.data?.boat === selectedBoat.id)
    .sort((a, b) =>
      pastTours
        ? moment(b.data.date, dateFormat) - moment(a.data.date, dateFormat)
        : moment(a.data.date, dateFormat) - moment(b.data.date, dateFormat)
    )
    .filter((e) =>
      pastTours
        ? moment(e.data.date, dateFormat) < moment(new Date())
        : moment(e.data.date, dateFormat) >= moment(new Date())
    );
  return (
    <div className="div-admin-tours">
      <div className="boat-toggle-div" style={{ flexFlow: "row wrap" }}>
        {rides.map((ride, i) => (
          <button
            key={i}
            className={ride.id === selectedBoat.id ? "selected" : ""}
            onClick={() => setSelectedBoat(ride)}
          >
            {ride.data.name}
          </button>
        ))}
      </div>
      <div className="past-toggle-div">
        <button
          className={pastTours ? "selected" : ""}
          onClick={() => setPastTours(!pastTours)}
        >
          Past
        </button>
        <button
          className={pastTours ? "" : "selected"}
          onClick={() => setPastTours(!pastTours)}
        >
          Upcoming
        </button>
      </div>
      <main>
        {filteredDocs[0] ? (
          filteredDocs.map((e) => (
            <section key={e.id}>
              <p>{dayjs(e?.data?.date).format("ddd DD-MM HH:mm")}</p>
              <p>{e?.data?.availableSeats} free seats</p>
              {/* <p>{e.data.time}</p> */}
              <button onClick={() => handleOpen(e)}>Tour Info</button>
              {/* <button className="del" onClick={() => handleDelete(e)}>
                Delete
              </button> */}
              <DeleteButton
                color="error"
                deleteHandler={() => handleDelete(e)}
              />
            </section>
          ))
        ) : (
          <p>No tours found!</p>
        )}
      </main>
    </div>
  );
};

export default AdminTours;
