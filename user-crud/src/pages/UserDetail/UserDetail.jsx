import React, { useEffect, useState } from "react";
import "./UserDetail.css";
import CreateUser from "../UserForm/CreateUser";

const UserDetail = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;
  }

  const handleEdit = (user) => {
    const flat = {
      id: user.id,
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      street: user.address?.street ?? user.street ?? "",

      city: user.address?.city ?? user.city ?? "",
      zipcode: user.address?.zipcode ?? user.zipcode ?? "",
    };
    setEditingUser(flat);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSave = (savedUser) => {
    // update existing (if id present)
    if (savedUser.id) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === savedUser.id
            ? {
                ...u,
                name: savedUser.name,
                username: savedUser.username,
                email: savedUser.email,
                address: {
                  ...(u.address || {}),
                  street: savedUser.street,

                  city: savedUser.city,
                  zipcode: savedUser.zipcode,
                },
              }
            : u
        )
      );
    } else {
      // create new
      const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = {
        id: newId,
        name: savedUser.name,
        username: savedUser.username,
        email: savedUser.email,
        address: {
          street: savedUser.street,

          city: savedUser.city,
          zipcode: savedUser.zipcode,
        },
      };
      setUsers((prev) => [newUser, ...prev]);
    }

    // close modal & clear editing user
    setShowForm(false);
    setEditingUser(null);
  };

  const handleCreateNew = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1>User List</h1>
        <button className="create-new-btn" onClick={handleCreateNew}>
          Create New
        </button>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="user-card">
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
                <strong>Street:</strong> {user.address?.street ?? ""}
              </p>
              <p>
                <strong>City:</strong> {user.address?.city ?? ""}
              </p>
              <p>
                <strong>Zipcode:</strong> {user.address?.zipcode ?? ""}
              </p>
            </div>

            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <CreateUser
              initialData={editingUser}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
