import axios from "axios";
import React, { Component } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";

import { toast } from 'react-toastify';


const Login = () => {
    const toastConfig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
const navigate = useNavigate();
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
       email: email,
       password:password,
     
    };
    
    try {

      const response = await axios.post(
        "http://localhost:8000/api/login",
        userData
      );
      console.log("User data posted:", response.data);
      toastConfig['type'] = 'success';
      toast("User Login", toastConfig);
      // navigate("/profile"s);
      // Handle success, update state or show a success message
    } catch (error) {
        toastConfig['type'] = 'error';
      toast("Error!!", toastConfig);
      console.error("Error posting user data:", error);
      // Handle error, show an error message, etc.
    }
  };
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/api/user/login"
    //     // userData
    //   );
    //   if (response.data.is_admin) {
    //     navigate("/list");
    //   } else {
    //     navigate("/profile", { state: response.data });
    //   }
    //   console.log("User data posted:", response.data);
    //   // Handle success, update state or show a success message
    // } catch (error) {
    //   console.error("Error posting user data:", error);
    //   // Handle error, show an error message, etc.
    // }};
  
  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="button" onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="/">password?</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
