import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CountriesCard({ d, index }) {
  function createLocalStorage() {
    localStorage.setItem("country", JSON.stringify(d));
  }
  return (
    <>
      <Col
        onClick={createLocalStorage}
        key={index}
        style={{ marginTop: "50px" }}
        md={3}
      >
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to={"/holidays/" + d.cca3}
        >
          <Card style={{ minHeight: "300px" }}>
            <Card.Img
              style={{
                borderBottom: "1px solid lightgrey",
                height: "150px",
              }}
              variant="top"
              src={d.flags.svg}
            />
            <Card.Body>
              <Card.Title>{d.name.common}</Card.Title>
              <Card.Text>{d.cca3}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
}
