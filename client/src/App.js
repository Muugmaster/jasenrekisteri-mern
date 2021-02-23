import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import UserTable from "./Components/UserTable";
import CreateUserModal from "./Components/CreateUserModal";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1 className="m-3">Jäsenrekisteri</h1>
          <Button className="m-3 shadow" variant="primary" onClick={handleShow}>
            Lisää uusi jäsen
          </Button>
          <CreateUserModal show={show} setShow={setShow} />
          <UserTable refresh={show} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
