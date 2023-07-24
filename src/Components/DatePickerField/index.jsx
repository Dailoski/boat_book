import React from 'react'
import './date-picker-field.scss'
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"

const DatePickerField = ({name, value, onChange}) => {

  return (
    <div>
        <DatePicker
      multiple
      value={value}
      minDate={new Date()}
      onChange={(e)=> console.log(value) ||
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