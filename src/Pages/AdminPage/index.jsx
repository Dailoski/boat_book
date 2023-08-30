import React from "react";
import { useState } from "react";
import Header from "../../Components/Header";
import WrapperAdmin from "../../Components/WrapperAdmin";
import TourModal from "../../Components/TourModal";
import Footer from "../../Components/Footer";
import CreateAccount from "../../Components/CreateAccount";
import AddNewTourModal from "../../Components/AddNewTourModal/index";
import "./admin-page.scss";

const AdminPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [clickedTour, setClickedTour] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleOpen = (tour) => {
    setOpenModal(true);
    setClickedTour(tour);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="div-admin-page">
      <Header />
      <WrapperAdmin handleOpen={handleOpen} setModalIsOpen={setModalIsOpen}/>
      {openModal && (<TourModal handleClose={handleClose} clickedTour={clickedTour} setClickedTour={setClickedTour}/>)}
      {modalIsOpen && <AddNewTourModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>}
      <CreateAccount />
      <Footer />
    </div>
  );
};

export default AdminPage;
