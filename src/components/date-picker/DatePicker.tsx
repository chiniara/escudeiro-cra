import React from "react";
import { Form } from "react-bootstrap";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from "react-day-picker/moment";

import "./DatePicker.scss";

function DatePicker({
  handleChange,
  currentDay,
}: {
  currentDay: Date;
  handleChange: (day: any) => void;
}) {
  return (
    <Form.Group className="date-input" controlId="Data">
      <Form.Label>Data</Form.Label>
      <Form.Control
        as={DayPickerInput}
        formatDate={MomentLocaleUtils.formatDate}
        parseDate={MomentLocaleUtils.parseDate}
        format="DD/MM/YYYY"
        placeholder={`${MomentLocaleUtils.formatDate(
          currentDay,
          "DD/MM/YYYY"
        )}`}
        dayPickerProps={{
          locale: "pt",
          localeUtils: MomentLocaleUtils,
          showWeekNumbers: true,
          todayButton: "Hoje",
        }}
        onDayChange={handleChange}
      />
    </Form.Group>
  );
}

export default DatePicker;
