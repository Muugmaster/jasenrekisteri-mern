import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { createUser } from "../api/index";

const CreateUserModal = ({ show, setShow }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phone: "",
    email: "",
    membershipStart: "",
  });

  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(newUser);
    createUser(newUser);
    setNewUser({
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      phone: "",
      email: "",
      membershipStart: "",
    });
    setShowAlert(true);
    setTimeout(function () {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Lisää uusi jäsen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>Etunimi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Anna etunimi"
              maxLength="15"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Sukunimi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Anna sukunimi"
              maxLength="15"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Osoite</Form.Label>
            <Form.Control
              type="text"
              placeholder="Anna osoite"
              maxLength="30"
              value={newUser.address}
              onChange={(e) =>
                setNewUser({ ...newUser, address: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formPostalCode">
            <Form.Label>Postinumero</Form.Label>
            <Form.Control
              type="text"
              placeholder="Anna postinumero"
              value={newUser.postalCode}
              onChange={(e) =>
                setNewUser({ ...newUser, postalCode: e.target.value })
              }
              required
              pattern="\d{5}"
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Puhelin</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Anna puhelinnumero"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              required
              pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Sähköposti</Form.Label>
            <Form.Control
              type="email"
              placeholder="Anna sähköposti"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Jäsenyyden aloitus päivämäärä</Form.Label>
            <Form.Control
              type="date"
              value={newUser.membershipStart}
              onChange={(e) =>
                setNewUser({ ...newUser, membershipStart: e.target.value })
              }
              required
            />
          </Form.Group>
          <Alert className="m-2" variant="primary" show={showAlert}>
            Lisätty onnistuneesti!
          </Alert>
          <Button variant="primary" type="submit" className="mr-2">
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Sulje
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUserModal;
