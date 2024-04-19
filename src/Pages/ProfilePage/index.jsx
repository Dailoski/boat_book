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
import Loader from "../../Components/Loader";
import { getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

function ProfilePage() {
  const { setReservation, reservation, setTotalCoins, user, rides, uid } =
    useContext(applicationContext);
  const [isLoading, setIsLoading] = useState(true);
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
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const docsData2 = docSnap.data();
      console.log(data);
      setReservation(data);
      // await updateDoc(doc(db, "users", uid), {
      //   coins:
      //     data
      //       ?.filter(
      //         (el) =>
      //           el.data.promoCode === false &&
      //           el.data.specialPromo &&
      //           el.data.coins
      //       )
      //       ?.reduce((acc, curr) => acc + curr.data.coins, 0) +
      //       docsData2.freeCoins || 0 + docsData2.freeCoins,
      // });
      // console.log(
      //   data
      //     ?.filter(
      //       (el) =>
      //         el.data.promoCode === false &&
      //         el.data.specialPromo &&
      //         el.data.coins
      //     )
      //     ?.reduce((acc, curr) => acc + curr.data.coins, 0)
      // );
      // setTotalCoins(
      //   data
      //     ?.filter((el) => el.data.promoCode === false && el.data.specialPromo)
      //     ?.reduce((acc, curr) => acc + curr.data.numberOfPassengers, 0) * 500
      // );
      setTotalCoins(docsData2.coins + docsData2.freeCoins);
    };

    fetchAllDocs();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="profile-page">
      <Header />
      {isLoading ? <Loader height={"84vh"} /> : <ProfileCard />}
      <ProfileFooter />
    </div>
  );
}

export default ProfilePage;
