import React, { useEffect, useState } from "react";
import "./CreateUser.css";

const emptyForm = {
  id: undefined,
  name: "",
  username: "",
  email: "",
  street: "",

  city: "",
  zipcode: "",
};

const CreateUser = ({ initialData = null, onSave, onCancel }) => {
  const [form, setForm] = useState(emptyForm);

  // populate when editingUser changes
  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        name: initialData.name || "",
        username: initialData.username || "",
        email: initialData.email || "",
        street: initialData.street || "",

        city: initialData.city || "",
        zipcode: initialData.zipcode || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    const requiredFields = [
      "name",
      "username",
      "email",
      "street",
      "city",
      "zipcode",
    ];
    for (let key of requiredFields) {
      if (!form[key] || form[key].toString().trim() === "") {
        alert(`Please fill the ${key} field`);
        return;
      }
    }

    // pass to parent
    if (onSave) {
      // send a shallow copy (so parent can add id if needed)
      onSave({ ...form });
    }

    // reset handled by parent closing modal, but keep safe fallback
    setForm(emptyForm);
  };

  const isEdit = Boolean(initialData && initialData.id);

  return (
    <div className="form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>{isEdit ? "Edit User" : "Create User"}</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="street"
          placeholder="Street"
          value={form.street}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          name="zipcode"
          placeholder="Zipcode"
          value={form.zipcode}
          onChange={handleChange}
          required
        />

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button type="submit">
            {isEdit ? "Save Changes" : "Create User"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
