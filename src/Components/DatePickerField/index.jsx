import React from 'react'
import './date-picker-field.scss'
import "react-multi-date-picker/styles/colors/yellow.css"

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

const DatePickerField = ({name, value, onChange}) => {

  return (
    <div>
      <DatePicker
      className='yellow bg-dark'
      multiple
      value={value}
      minDate={new Date()}
      onChange={(e)=> 
        onChange('date', e)}
        plugins={[
          <TimePicker position="bottom" hStep={1} mStep={30} hideSeconds/>,
          <DatePanel />
        ]}
      />

    </div>
  )
}

export default DatePickerField