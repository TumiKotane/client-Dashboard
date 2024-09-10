import React from "react";
import { useSelector } from "react-redux";

// Define the User interface
interface User {
  name: string;
}

// Define the shape of the auth state
interface AuthState {
  user: User | null;
}

// Define the shape of the overall state
interface RootState {
  auth: AuthState;
}

const Welcome: React.FC = () => {
  // Use the RootState type for the useSelector hook
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user ? user.name : "Guest"}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
