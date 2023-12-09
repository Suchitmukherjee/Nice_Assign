import React from "react";
import { useLocation, Link } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const userData = location.state;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"> User Name: {userData?.name}</h5>
        <Link to={{ pathname: "/edit-profile", state: userData }}>
          <button className="btn btn-primary">Edit</button>
        </Link>
      </div>
      <ul className="list-group list-group-flush">
      
        <li className="list-group-item">Contact Number: {userData?.user_number}</li>
        <li className="list-group-item">Highest University: {userData?.higher_university}</li>
        <li className="list-group-item">Highest Degree: {userData?.higher_degree}</li>
        <li className="list-group-item">Click to see User Information</li>
      </ul>
      <div className="card-body"></div>
    </div>
  );
};

export default Profile;

