import React, { useEffect } from 'react';
import Layout from './Layout';
import FormEditUser from '../components/FormEditUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store'; // Import types from your store
import { getMe } from '../redux/authSlice';

// Define the component as a functional component with no props
const EditUser: React.FC = () => {
  // Typed useDispatch hook
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Typed useSelector hook
  const { isError, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;
