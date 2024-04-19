import React, { useState } from "react";
import { ModifyButton } from "../ModifyButton";
function TourB({ handleCheckIn, handleNotShown, e }) {
  const [showMod, setShowMod] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {showMod ? (
        <>
          <ModifyButton
            handler={() => handleCheckIn(e, e.id)}
            mod="Checked In"
            setShowMod={setShowMod}
          />
          <ModifyButton
            handler={() => handleNotShown(e.id)}
            mod="Hasn't Shown"
            setShowMod={setShowMod}
          />
        </>
      ) : (
        <p>This Reservation has already been reviewed.</p>
      )}
    </div>
  );
}

export default TourB;
