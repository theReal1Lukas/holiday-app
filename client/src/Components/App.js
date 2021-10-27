import { useState } from "react";
import Home from "../Pages/Home";
import Holidays from "../Pages/Holidays";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import languages from "./languages";
import "./App.css";

export default function App() {
  const defaultLanguage = navigator.language.slice(0, 2);

  const getLanguage = localStorage.getItem("lang");

  const [selectLanguage, setSelectLanguage] = useState(
    getLanguage || defaultLanguage
  );

  localStorage.setItem("lang", selectLanguage);

  return (
    <>
      <Navbar
        style={{
          position: "fixed",
          width: "100vw",
          zIndex: "9999",
        }}
        variant="dark"
        bg="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="/">Holidays App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-around w-100">
              <NavDropdown
                className="mt-2"
                variant="outline-secondary"
                title="Languages"
                id="input-group-dropdown-1"
              >
                {languages.map((lan, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => setSelectLanguage(lan.code)}
                  >
                    {lan.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Navbar.Text>
                <Button
                  variant="warning"
                  onClick={() => setSelectLanguage(defaultLanguage)}
                >
                  Switch to default
                </Button>
              </Navbar.Text>
              <Navbar.Text className="mt-2">
                Current Language : <strong>{selectLanguage}</strong>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/holidays">
            <Holidays language={selectLanguage} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
