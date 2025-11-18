import React, { useEffect, useState } from "react";
import "./UserDetail.css";

const UserDetail = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  if (users.length === 0) {
    <p>Loading...</p>;
  }

  return (
    <div className="container">
      {users.map((user) => (
        <div className="user-card">
          <h2>{user.name}</h2>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <div className="address-box">
            <h4>Address</h4>
            <p>
              <strong>Street:</strong> {user.address.street}
            </p>
            <p>
              <strong>Suite:</strong> {user.address.suite}
            </p>
            <p>
              <strong>City:</strong> {user.address.city}
            </p>
            <p>
              <strong>Zipcode:</strong> {user.address.zipcode}
            </p>
          </div>
          <div className="card-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDetail;
