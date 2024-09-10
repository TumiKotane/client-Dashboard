import React, { useEffect } from "react";
import Layout from "./Layout";
import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store"; // Import your Redux types
import { getMe } from "../redux/authSlice";

// Define the shape of the auth state
interface AuthState {
  isError: boolean;
}

// Define the component
const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for dispatch
  const navigate = useNavigate();
  const { isError } = useSelector((state: RootState) => state.auth as AuthState);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default Products;
