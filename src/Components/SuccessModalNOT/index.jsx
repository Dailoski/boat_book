import React from "react";
import "./successModal.scss";
import { Button } from "@mui/material";
// import Roboto from "typeface-roboto"

const SuccessModal = ({ setFail, text  }) => {

  return (
    <div className="successModal" onClick={() => setFail()}>
      <div onClick={(e) => e.stopPropagation()}>
        
              <div className="modal-content-red">
              <button style={{padding:"3px", fontSize:"18px", position: "relative", right:"-186px", top:"-37px", color: "black", width:"fit-content"}} onClick={() => setFail()}>close</button>
                <p>{text}</p>

              </div>
            );
      </div>
    </div>
  );
};

export default SuccessModal;
