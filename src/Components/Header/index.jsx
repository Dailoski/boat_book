import { React, useContext } from "react";
import { applicationContext } from "../../context";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const { logOut, user, userData } = useContext(applicationContext);
  const path = useLocation().pathname;
  return (
    <div className="div-header">
      {path.includes("reservation") ? (
        <Link to="/profile">
          <img
            src={`${process.env.PUBLIC_URL}/profileiconlarge.png`}
            alt="profile-icon"
            className="profile-icon"
            style={{ width: "45px", cursor: "pointer" }}
          />
        </Link>
      ) : (
        <Link to="/reservation">
          <img
            src={`${process.env.PUBLIC_URL}/back.svg`}
            alt="profile-icon"
            className="profile-icon"
            style={{ width: "120px", cursor: "pointer", marginTop: ".5rem" }}
          />
        </Link>
      )}

      {userData ? (
        <h3 style={{ fontFamily: "Gagalin" }}>
          {userData.full_name.toUpperCase()}
        </h3>
      ) : (
        ""
      )}
      {(path === "/admin_page" || path === "/reservation") && (
        // <Link>
        //   <button className="log-out" onClick={logOut}>
        //     Log Out
        //   </button>
        // </Link>
        <img
          src={`${process.env.PUBLIC_URL}/logout.svg`}
          alt="logout"
          onClick={logOut}
          style={{
            width: "190px",
            marginBottom: ".5rem",
            paddingLeft: "1.5rem",
          }}
        />
      )}
    </div>
  );
};

export default Header;
