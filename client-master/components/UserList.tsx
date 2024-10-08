import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the User interface based on the expected structure of the user data
interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
}

const Userlist: React.FC = () => {
  // Use the User type for the users state
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  // Define the type of userId as string for the deleteUser function
  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      // Handle errors here if necessary
      console.error("Failed to fetch users", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      getUsers();
    } catch (error) {
      // Handle errors here if necessary
      console.error("Failed to delete user", error);
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
