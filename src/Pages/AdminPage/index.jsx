import React from "react";
import { useState } from "react";
import Header from "../../Components/Header";
import WrapperAdmin from "../../Components/WrapperAdmin";
import TourModal from "../../Components/TourModal";
import Footer from "../../Components/Footer";
import CreateAccount from "../../Components/CreateAccount";

import "./admin-page.scss";
import AdminHeader from "../../Components/AdminHeader";

const AdminPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [clickedTour, setClickedTour] = useState(null);

  const handleOpen = (tour) => {
    setOpenModal(true);
    setClickedTour(tour);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="div-admin-page">
      <AdminHeader />
      <WrapperAdmin handleOpen={handleOpen} />
      {openModal && (
        <TourModal
          handleClose={handleClose}
          clickedTour={clickedTour}
          setClickedTour={setClickedTour}
        />
      )}
      <CreateAccount />
      <Footer />
    </div>
  );
};

export default AdminPage;
