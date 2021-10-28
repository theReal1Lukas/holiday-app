import { Popover, OverlayTrigger } from "react-bootstrap";

export default function CalendarEvent_Popover({ event }) {
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
