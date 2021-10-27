import { Col, Form, FormControl, Button } from "react-bootstrap";

export default function SearchInput({ search, setSearch }) {
  return (
    <Col className="d-flex flex-column align-items-center justify-content-center">
      <Form style={{ width: "40vw" }} onSubmit={(e) => e.preventDefault()}>
        <FormControl
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="lg"
          placeholder="Search"
        />
      </Form>
    </Col>
  );
}
