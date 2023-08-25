import React from "react";
import AdminReservationForm from "../../Components/AdminReservationForm";
import AdminTours from "../AdminTours";
import "./wrapper-admin.scss";

const WrapperAdmin = ({ handleOpen, setModalIsOpen }) => {
  return (
    <div className="div-wrapper-admin">
      <AdminReservationForm setModalIsOpen={setModalIsOpen}/>
      <AdminTours handleOpen={handleOpen} />
    </div>
  );
};

export default WrapperAdmin;
