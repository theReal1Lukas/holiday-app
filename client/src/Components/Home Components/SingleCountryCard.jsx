import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SingleCountryCard({ singleCountry }) {
  function createLocalStorage() {
    localStorage.setItem("country", JSON.stringify(singleCountry));
  }
  return (
    <div>
      <Col onClick={createLocalStorage} style={{ marginTop: "50px" }} md={3}>
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to={"/holidays/" + singleCountry.cca3}
        >
          <Card style={{ minHeight: "300px" }}>
            <Card.Img
              style={{
                borderBottom: "1px solid lightgrey",
                height: "150px",
              }}
              variant="top"
              src={singleCountry.flags.svg}
            />
            <Card.Body>
              <Card.Title>{singleCountry.name.common}</Card.Title>
              <Card.Text>{singleCountry.cca3}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </div>
  );
}
