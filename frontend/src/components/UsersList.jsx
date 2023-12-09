import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/profile")
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  const handleOnClick = (data) => {
    navigate("/profile", { state: data });
  };
  return (
    <div className="user-grid">
      {users.map((user, index) => (
        <div
          key={index}
          className="user-box"
          onClick={() => handleOnClick(user)}
        >
        <li className="list-group-item">Click to see User Information</li>
          <p style={{ fontWeight: 'bold' }}>User Name: {user.name}</p>
           <p>Contact Number:-{user?.user_number}</p>
          <p>HigherDegree:-{user?.higher_degree}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
