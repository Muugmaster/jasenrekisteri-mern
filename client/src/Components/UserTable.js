import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/fi";
import { fetchUsers } from "../api/index.js";
import DelUserModal from "./DelUserModal.js";
import EditUserModal from "./EditUserModal.js";

// Bootstrap imports
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const UserTable = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [showDel, setShowDel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data.data));
  }, [refresh]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data.data));
  }, [showDel]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data.data));
  }, [showEdit]);

  const handleDelShow = (e) => {
    setUserId(e.target.value);
    setShowDel(true);
  };

  const handleEditShow = (e) => {
    setUserId(e.target.value);
    setShowEdit(true);
  };

  return (
    <>
      <DelUserModal showDel={showDel} setShowDel={setShowDel} userId={userId} />
      <EditUserModal
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        userId={userId}
      />
      <h4 className="text-left">Jäseniä yhteensä: {users.length}</h4>
      <Table
        responsive
        striped
        bordered
        hover
        size="sm"
        variant="dark"
        className="shadow"
      >
        <thead>
          <tr>
            <th>Etunimi</th>
            <th>Sukunimi</th>
            <th>Osoite</th>
            <th>Postinumero</th>
            <th>Puhelin</th>
            <th>Sähköposti</th>
            <th>Jäsenyys alkanut</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address}</td>
              <td>{user.postalCode}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{moment(user.membershipStart).locale("FI").format("L")}</td>
              <td align="center">
                <Button
                  variant="danger"
                  className="m-1"
                  onClick={handleDelShow}
                  onChange={(e) => setUserId(e.target.value)}
                  value={user._id}
                >
                  Poista
                </Button>
                <Button
                  variant="secondary"
                  className="m-1"
                  onClick={handleEditShow}
                  onChange={(e) => setUserId(e.target.value)}
                  value={user._id}
                >
                  Muokkaa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
