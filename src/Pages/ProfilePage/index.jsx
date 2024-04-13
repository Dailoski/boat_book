import React, { useContext, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { db } from "../../firebase";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { applicationContext } from "../../context";
import ProfileCard from "../../Components/ProfileCard";
import "../ProfilePage/profilepage.css";
import ProfileFooter from "../../Components/ProfileFooter";

function ProfilePage() {
  const { user, reservation, setReservation, setTotalCoins } =
    useContext(applicationContext);
  useEffect(() => {
    const fetchAllDocs = async () => {
      const collectionRef = collection(db, "tickets2024");
      const querySnapshot = await getDocs(collectionRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const data = docsData.filter((data) => {
        return data.data.userEmail === user;
      });

      setReservation(data);
      console.log(reservation);
      setTotalCoins(
        data
          ?.filter((el) => el.data.promoCode === false)
          ?.reduce((acc, curr) => acc + curr.data.numberOfPassengers, 0) * 500
      );
    };

    fetchAllDocs();
  }, []);

  return (
    <div className="profile-page">
      <Header />
      <ProfileCard reservation={reservation} />
      <ProfileFooter />
    </div>
  );
}

export default ProfilePage;
