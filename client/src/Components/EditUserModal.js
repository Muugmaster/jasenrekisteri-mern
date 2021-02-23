import React, { useState, useEffect } from "react";
import moment from "moment";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { fetchUser, updateUser } from "../api/index";

const EditUserModal = ({ showEdit, setShowEdit, userId }) => {
  const [user, setUser] = useState([]);
  const [btnDisable, setBtnDisable] = useState(false);

  useEffect(() => {
    if (userId !== 0) {
      fetchUser(userId).then((data) => setUser(data.data));
    }
  }, [userId]);

  const handleClose = () => {
    setShowEdit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(user);
    updateUser(userId, user);
    setBtnDisable(true);
    setTimeout(function () {
      setShowEdit(false);
      setBtnDisable(false);
    }, 2000);
  };

  if (user.length !== 0) {
    return (
      <Modal show={showEdit} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Muokkaa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>Etunimi</Form.Label>
              <Form.Control
                type="text"
                value={user.firstName}
                maxLength="15"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Sukunimi</Form.Label>
              <Form.Control
                type="text"
                maxLength="15"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Osoite</Form.Label>
              <Form.Control
                type="text"
                maxLength="30"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Postinumero</Form.Label>
              <Form.Control
                type="text"
                value={user.postalCode}
                onChange={(e) =>
                  setUser({ ...user, postalCode: e.target.value })
                }
                required
                pattern="\d{5}"
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Puhelin</Form.Label>
              <Form.Control
                type="phone"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                required
                pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Sähköposti</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Jäsenyyden aloitus päivämäärä</Form.Label>
              <Form.Control
                type="date"
                value={moment(user.membershipStart).format("YYYY-MM-DD")}
                onChange={(e) =>
                  setUser({ ...user, membershipStart: e.target.value })
                }
                required
              />
            </Form.Group>
            <Alert className="m-2" variant="primary" show={btnDisable}>
              Muokataan...
            </Alert>
            <Button
              variant="danger"
              type="submit"
              className="mr-2"
              disabled={btnDisable}
            >
              Muokkaa
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

export default EditUserModal;
