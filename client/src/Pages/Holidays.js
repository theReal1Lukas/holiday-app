import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import {
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Holidays({ language }) {
  const country = JSON.parse(localStorage.getItem("country"));
  const [holidays, setHolidays] = useState(null);
  const localizer = momentLocalizer(moment);

  /////

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

  window.scrollTo(0, 0);

  ///get holidays api ///
  useEffect(() => {
    try {
      const fetchHolidays = async () => {
        await axios
          .get("https://api.getfestivo.com/v2/holidays", {
            params: {
              api_key: "e4964b924d2afb1b0ec2309d79ceaab7",
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

  function Event({ event }) {
    const popoverClickRootClose = (
      <Popover
        style={{
          marginBottom: "20px",
          padding: "10px 10px 0px 10px",
          backgroundColor: "violet",
          color: "white",
        }}
        isOpen={false}
      >
        {event.public === true ? (
          <p>
            Bussiness Open On :&nbsp;
            <strong>
              {event.end.slice(0, 8) +
                (parseInt(event.end.slice(8, 10)) + parseInt(1))}
            </strong>
          </p>
        ) : (
          <p>
            <strong>Working Day</strong>
          </p>
        )}
      </Popover>
    );

    return (
      <div>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={popoverClickRootClose}
          style={{ paddingBottom: "30px" }}
        >
          <div>{event.title}</div>
        </OverlayTrigger>
      </div>
    );
  }

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
          <p style={{ color: "red" }}>
            <strong>
              IMPORTANT! Holidays names doesn't support all languages!
            </strong>
          </p>

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
            components={{ event: Event }}
          />
        </Col>
        {/* <Col md={12}>
          <h3> {`${country.name.common} Holidays`} </h3>
          <ul className="d-flex float-left ">
            {!holidays ? (
              <p>Loading ...</p>
            ) : (
              holidays.map((holiday, index) => (
                <li
                  style={{ marginRight: "30px" }}
                  className="d-flex flex-column "
                  key={index}
                >{`${holiday.name} ${holiday.date}`}</li>
              ))
            )}
          </ul>
        </Col> */}
      </Row>
    </Container>
  );
}
