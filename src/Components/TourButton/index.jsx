import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Button } from '@mui/material';
export function TourButton({text}) {
  return (<>
  <Button sx={{margin: "12px 0px", border:"1px white solid"}} startIcon={<DoneOutlineIcon/>} size="large" fullWidth  color="primary" variant='contained' endIcon={<LightModeIcon />}>DAY TOUR <br/>{text}</Button>
  <Button sx={{margin: "2px 0px"}} fullWidth color="secondary" size="small" variant='contained' endIcon={<NightlightIcon />}>NIGHT TOUR <br/>{text}</Button>
  <Button sx={{margin: "2px 0px"}} fullWidth color="warning" size="small" variant='contained' endIcon={<WbTwilightIcon />}>SUNSET TOUR <br/>{text}</Button>
  </>)}
  
