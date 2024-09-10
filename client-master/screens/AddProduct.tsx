import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // For Redux state management
import { useNavigation, NavigationProp } from '@react-navigation/native'; // For navigation
import { getMe } from '../redux/authSlice'; // Assuming you have this Redux slice
import Layout from './Layout'; // Custom layout component
import FormAddProduct from '../components/FormAddProduct'; // Form component for adding product
import { RootState } from '../redux/store'; // Import RootState type from your Redux store

const AddProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>(); // Use navigation from React Navigation
  const { isError } = useSelector((state: RootState) => state.auth); // Get the error state from Redux

  // Fetch user authentication data
  useEffect(() => {
    dispatch(getMe()); // Dispatch getMe action to check authentication
  }, [dispatch]);

  // If there's an error (e.g., unauthenticated), navigate back to the login or home page
  useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'You are not authenticated. Redirecting to login.');
      navigation.navigate('Login'); // Replace "Login" with the appropriate route
    }
  }, [isError, navigation]);

  return (
    <Layout>
      <FormAddProduct />
    </Layout>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});
