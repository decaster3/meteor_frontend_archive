import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

const TimePickerR = () => (
  <div>
    <MuiThemeProvider>
        <div>
        <DatePicker hintText="Portrait Dialog" />
    <TimePicker
      format="24hr"
      hintText="24hr Format"
    />
    </div>
    </MuiThemeProvider>
  </div>
);

export default TimePickerR;
