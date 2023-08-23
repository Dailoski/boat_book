import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { Button } from "@mui/material";

export function TourButton({ isSelected, type, onClick, tourDate, disabled }) {
  isSelected = isSelected && !disabled;
  return (
    <>
      <Button
      disabled={disabled}
        onClick={onClick}
        sx={
          isSelected
            ? { fontWeight:"bold", margin: "12px 0px", border: "1px white solid", color: disabled ? "red !important" : "white" }
            : { fontWeight:"bold", margin: "2px 0px", color: disabled ? "red !important" : "white" }
        }
        startIcon={isSelected ? <DoneOutlineIcon /> : null}
        size={isSelected ? "large" : "small"}
        fullWidth
        color={
          type === "daytime"
            ? "primary"
            : type === "night"
            ? "secondary"
            : "warning"
        }
        variant="contained"
        endIcon={
          type === "daytime" ? (
            <LightModeIcon />
          ) : type === "night" ? (
            <NightlightIcon />
          ) : (
            <WbTwilightIcon />
          )
        }
      >
        {disabled ? "SOLD OUT" : type + " tour"}
        <br/>
        {tourDate}
      </Button>
    </>
  );
}
