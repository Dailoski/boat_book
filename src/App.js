import { React, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ApplicationProvider } from "./context";
import { db } from "./firebase";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import LoginPage from "./Pages/LoginPage";
import NoInternetConnection from "./Components/NoInternet";
import ReservationPage from "./Pages/ReservationPage";
import AdminPage from "./Pages/AdminPage";
import "./app.scss";
import ProfilePage from "./Pages/ProfilePage";

const App = () => {
  const [freshData, setFreshData] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("admin"))
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const [allDocs, setAllDocs] = useState([]);
  const [rides, setAllRides] = useState([]);

  useEffect(() => {
    const fetchAllDocs = async () => {
      const collectionRef = collection(db, "tours");
      const querySnapshot = await getDocs(collectionRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setAllDocs(docsData);
    };
    fetchAllDocs();
  }, [freshData]);

  useEffect(() => {
    const fetchAllRides = async () => {
      const collectionRef = collection(db, "tour-types");
      const querySnapshot = await getDocs(collectionRef);
      const ridesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setAllRides(ridesData);
    };
    fetchAllRides();
  }, []);

  //   useEffect(() => {
  //     const docRef = doc(db, "tour-types", "turtle-boat");
  //     setDoc(docRef,{
  // image:"https://firebasestorage.googleapis.com/v0/b/boat-book.appspot.com/o/images%2Fturtle.jpg?alt=media&token=c2e1d4cf-0f3c-4b67-b5c8-0c88f9fc0875",
  // isAvailable:true,
  // meetinPoint:"In front of your hotel",
  // name:"Turtle Boat",
  // position:1,
  // rating: 4.8,
  // prices:{
  // adults:3000,
  // children:3000,
  // preteens:3000,

  // },
  // desc: [
  //   {img: "guide.svg", text:"live tour guide"},
  //   {img: "no-gift.svg", text:"unlimited soft drinks"},
  //   {img: "time.svg", text:"1 hour 30 minutes"},
  //   {img: "no-card.svg", text:"only cash"},
  //   {img: "distance.svg", text:"15 km round trip"},
  //   {img: "cash.svg", text:"3000 dinars <br> 25 euro"},
  // ],
  // totalSeats:120,
  //     })
  //   }, []);

  const logOut = () => {
    setAccessToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("userData");
    setIsAdmin(false);
    setUser("");
  };

  return (
    <div className="div-app">
      <NoInternetConnection>
        <ApplicationProvider
          value={{
            setAccessToken,
            setIsAdmin,
            logOut,
            allDocs,
            user,
            setUser,
            userData,
            setUserData,
            setFreshData,
            freshData,
            rides,
          }}
        >
          {accessToken ? (
            isAdmin ? (
              <Routes>
                <Route exact path="/admin_page" element={<AdminPage />} />
                <Route
                  path="*"
                  element={<Navigate to="/admin_page" replace />}
                />
              </Routes>
            ) : (
              <Routes>
                <Route
                  path="/reservation"
                  element={<ReservationPage />}
                ></Route>
                <Route
                  path="*"
                  element={<Navigate to="/reservation" replace />}
                />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            )
          ) : (
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </ApplicationProvider>
      </NoInternetConnection>
    </div>
  );
};

export default App;
