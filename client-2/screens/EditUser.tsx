import React, { useEffect } from 'react';
import Layout from './Layout';
import FormEditUser from '../components/FormEditUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // For React Native navigation
import { RootStackParamList } from '../navigation/RootStackParamList'; // Import your navigation types
import { AppDispatch, RootState } from '../redux/store'; // Import types from your store
import { getMe } from '../redux/authSlice';
import { AsyncThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

const EditUser: React.FC = () => {
  // Typed useDispatch hook
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // For navigation

  // Typed useSelector hook
  const { isError, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigation.navigate('Home'); // Replace '/' with relevant screen name
    }
    if (user && user.role !== 'Admin') {
      navigation.navigate('Dashboard'); // Replace with your target screen name
    }
  }, [isError, user, navigation]);

  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;
function dispatch(arg0: AsyncThunkAction<User, void, { rejectValue: string; dispatch?: ThunkDispatch<unknown, unknown, UnknownAction> | undefined; state?: unknown; extra?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
  throw new Error('Function not implemented.');
}

