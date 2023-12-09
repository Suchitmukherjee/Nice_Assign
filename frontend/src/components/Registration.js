import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Registration = () => {
    const toastConfig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [higherUniversity, setHigherUniversity] = useState("");
  const [higherDegree, setHigherDegree] = useState("");
  const [higherMajor, setHigherMajor] = useState("");
  const [higherGraduationYear, setHigherGraduationYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: fullName,
      email: email,
      password: password,
      user_number: contactNumber,
      higher_university: higherUniversity,
      higher_degree: higherDegree,
      higher_major: higherMajor,
      higher_graduation: higherGraduationYear,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        userData
      );
      console.log("User data posted:", response.data);
      toastConfig['type'] = 'success';
      toast("Success Register", toastConfig);
      // Handle success, update state or show a success message
    } catch (error) {
        toastConfig['type'] = 'error';
      toast("Error!!", toastConfig);
      console.error("Error posting user data:", error);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h3>Registration</h3>

        <div className="row">
          {/* Personal Details */}
          <div className="col-md-6 mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Contact Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {  <div className="col-md-6 mb-3">
  <label>Password</label>
  <input
    type="password"
    className="form-control"
    placeholder="Password"
    value={password}
    onChange={(e) => {
      const enteredPassword = e.target.value;
      setPassword(enteredPassword);

      if (enteredPassword.length < 5) {
        // Display a message to the user, you can replace this with your own logic (e.g., show/hide a message div)
        console.log('Password should be at least 5 characters long');
      }
    }}
  />
</div>

            /* <div className="col-md-6 mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
        </div>

        {/* Higher Education Details */}
        <div className="mb-3">
        
          <h4 className="mt-2">Higher Education Details</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Higher University</label>
              <input
                type="text"
                className="form-control"
                placeholder="Higher university name"
                value={higherUniversity}
                onChange={(e) => setHigherUniversity(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Higher Degree</label>
              <select
                className="form-control"
                value={higherDegree}
                onChange={(e) => setHigherDegree(e.target.value)}
              >
                <option value="">Select Higher Degree ↓</option>
                <option value="doctorate">Doctorate</option>
                <option value="masters">Masters</option>
                <option value="post-graduate-diploma">
                  Post Graduate Diploma
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Higher Major</label>
              <input
                type="text"
                className="form-control"
                placeholder="Higher major"
                value={higherMajor}
                onChange={(e) => setHigherMajor(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Higher Graduation Year</label>
              <input
                type="text"
                className="form-control"
                placeholder="Higher graduation year"
                value={higherGraduationYear}
                onChange={(e) => setHigherGraduationYear(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>

        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    </div>
  );
};

export default Registration;
