import React, { useState, useEffect } from "react";
import moment from "moment";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { fetchUser, deleteUser } from "../api";

const DelUserModal = ({ showDel, setShowDel, userId }) => {
  const [user, setUser] = useState([]);
  const [btnDisable, setBtnDisable] = useState(false);

  useEffect(() => {
    if (userId !== 0) {
      fetchUser(userId).then((data) => setUser(data.data));
    }
  }, [userId]);

  const handleClose = () => {
    setShowDel(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(user);
    deleteUser(userId);
    setBtnDisable(true);
    setTimeout(function () {
      setShowDel(false);
      setBtnDisable(false);
    }, 2000);
  };

  if (user.length !== 0) {
    return (
      <Modal show={showDel} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Oletko varma että haluat poistaa jäsenen?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>Etunimi</Form.Label>
              <Form.Control type="text" value={user.firstName} readOnly />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Sukunimi</Form.Label>
              <Form.Control type="text" value={user.lastName} readOnly />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Osoite</Form.Label>
              <Form.Control type="text" value={user.address} readOnly />
            </Form.Group>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Postinumero</Form.Label>
              <Form.Control type="text" value={user.postalCode} readOnly />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Puhelin</Form.Label>
              <Form.Control type="phone" value={user.phone} readOnly />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Sähköposti</Form.Label>
              <Form.Control type="email" value={user.email} readOnly />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Jäsenyyden aloitus päivämäärä</Form.Label>
              <Form.Control
                type="text"
                value={moment(user.membershipStart).format("L")}
                readOnly
              />
            </Form.Group>
            <Alert className="m-2" variant="primary" show={btnDisable}>
              Poistetaan...
            </Alert>
            <Button
              variant="danger"
              type="submit"
              className="mr-2"
              disabled={btnDisable}
            >
              Poista
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={btnDisable}
            >
              Sulje
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  } else {
    return "";
  }
};

export default DelUserModal;
