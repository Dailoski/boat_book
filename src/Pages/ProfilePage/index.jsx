import React, { useContext, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { db } from "../../firebase";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { applicationContext } from "../../context";
import ProfileCard from "../../Components/ProfileCard";
import "../ProfilePage/profilepage.css";

function ProfilePage() {
  const [reservation, setReservation] = useState([]);
  const { user, setUser } = useContext(applicationContext);
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
    };
    fetchAllDocs();
  }, []);
  console.log(reservation);
  return (
    <div className="profile-page">
      <Header />
      <ProfileCard reservation={reservation} />
      <Footer />
    </div>
  );
}

export default ProfilePage;
