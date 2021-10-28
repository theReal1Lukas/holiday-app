import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEvent_Popover from "../Components/Holiday Components/CalendarEvent_Popover";

export default function Holidays({ language }) {
  const country = JSON.parse(localStorage.getItem("country"));
  const [holidays, setHolidays] = useState(null);
  const localizer = momentLocalizer(moment);

  // add title to holiday arr and find if it's equal to name;
  //  slice start and end dates

  const holidayTitle = holidays && holidays.map((h) => h.name);

  holidays &&
    holidays.map(
      (h) =>
        (h.title = holidayTitle.find(
          (single) => h.name === single,
          (h.start = h.start.slice(0, 10)),
          (h.end = h.end.slice(0, 10)),
          (h.allDay = true)
        ))
    );

  ///get holidays api ///
  useEffect(() => {
    try {
      const fetchHolidays = async () => {
        await axios
          .get("https://api.getfestivo.com/v2/holidays", {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              country: country.cca3,
              year: 2020,
              language: language || null,
            },
          })
          .then((res) => setHolidays(res.data.holidays))
          .catch(() => setHolidays("api error"));
      };
      fetchHolidays();
    } catch (err) {
      console.log(err);
    }
  }, [country.cca3, language]);

  //public, non-public holidays different colors

  function changeEventColor(event, start, end, isSelected) {
    let holidayColor = {
      backgroundColor: "lightgreen",
      color: "white",
    };

    if (event.public === false) {
      holidayColor.backgroundColor = "skyblue";
    }

    return {
      className: "",
      style: holidayColor,
    };
  }
  // checkbox
  const [check, setCheck] = useState(false);
  const publicHolidays = holidays?.map((h) => h.public === true && h);

  //tooltip

  return (
    <Container style={{ padding: "100px 0 100px 0" }}>
      <Row>
        <Col>
          <div
            style={{ marginBottom: "50px" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img
              style={{ width: "40vw", height: "40vh", marginBottom: "30px" }}
              src={country.flags.png}
              alt={`${country.name.common} + flag`}
            />
            <h1>{country.name.common}</h1>
          </div>
        </Col>
        <Col md={12}>
          <div style={{ color: "red" }}>
            <strong>
              <p>IMPORTANT !</p>
            </strong>
            <ul>
              <li>Holidays names doesn't support all languages !</li>
              <li>Holidays are available for 2020 year only !</li>
            </ul>
          </div>

          <div className="d-flex">
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "lightgreen",
                marginRight: "10px",
              }}
            />
            <p>
              <strong>Public Holidays</strong>
            </p>
          </div>
          <div className="d-flex">
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "skyblue",
                marginRight: "10px",
              }}
            />
            <p>
              <strong>Non-Public Holidays</strong>
            </p>
          </div>
          <Form.Group>
            <Form.Check
              label={<strong>Show only public holidays</strong>}
              type="checkbox"
              defaultChecked={check}
              onChange={() => setCheck(!check)}
            />
          </Form.Group>

          <Calendar
            onSelectEvent={(event) => console.log(event)}
            endDate={new Date(2020, 12, 0)}
            defaultDate={new Date(2020, 12, 0)}
            localizer={localizer}
            events={!check ? holidays : publicHolidays}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, marginTop: 50 }}
            eventPropGetter={changeEventColor}
            components={{ event: CalendarEvent_Popover }}
          />
        </Col>
      </Row>
    </Container>
  );
}
