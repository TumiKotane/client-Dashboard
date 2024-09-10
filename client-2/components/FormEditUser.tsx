import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Define an interface for the user data
interface User {
  name: string;
  email: string;
  role: string;
}

const FormEditUser: React.FC = () => {
  // Use type annotations for state variables
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Type the id parameter

  useEffect(() => {
    const getUserById = async () => {
      if (id) {
        try {
          const response = await axios.get<User>(`http://localhost:5000/users/${id}`);
          setName(response.data.name);
          setEmail(response.data.email);
          setRole(response.data.role);
        } catch (error: any) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      try {
        await axios.patch(`http://localhost:5000/users/${id}`, {
          name,
          email,
          password,
          confPassword,
          role,
        });
        navigate("/users");
      } catch (error: any) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  // Handle changes to input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confPassword":
        setConfPassword(value);
        break;
      case "role":
        setRole(value);
        break;
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    name="confPassword"
                    value={confPassword}
                    onChange={handleChange}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="role"
                      value={role}
                      onChange={handleChange}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUser;
