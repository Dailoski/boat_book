import React, { useContext } from "react";
import { applicationContext } from "../../context";
import { Link } from "react-router-dom";
import "../AdminHeader/adminheader.css";
function AdminHeader() {
  const { logOut, user, userData } = useContext(applicationContext);

  return (
    <div className="admin-header" style={{ width: "100wv" }}>
      <h3 style={{ fontFamily: "Gagalin" }}>Admin</h3>

      <Link>
        <button className="log-out" onClick={logOut}>
          Log Out
        </button>
      </Link>
    </div>
  );
}

export default AdminHeader;
