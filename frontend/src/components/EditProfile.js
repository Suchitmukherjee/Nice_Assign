import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contactNumber: "", 
    higherUniversity: "",
    graduationYear: "",
    
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      console.log("User data updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name Update
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">
            Phone Number Update
          </label>
          <input
            type="text"
            className="form-control"
            id="contactNumber"
            name="contactNumber"
            value={userData.contactNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="higherUniversity" className="form-label">
            Hight Degree Update
          </label>
          <input
            type="text"
            className="form-control"
            id="higherUniversity"
            name="higherUniversity"
            value={userData.higherUniversity}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="graduationYear" className="form-label">
            Hight Graduation Year
          </label>
          <input
            type="text"
            className="form-control"
            id="graduationYear"
            name="graduationYear"
            value={userData.graduationYear}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
