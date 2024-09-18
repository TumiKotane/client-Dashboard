import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const EditProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params as { productId: string };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.18.33:5000/products/${productId}`);
      setName(response.data.name);
      setPrice(response.data.price);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      Alert.alert('Error', 'Failed to fetch product details');
    }
  };

  const updateProduct = async () => {
    try {
      await axios.patch(`http://192.168.18.33:5000/products/${productId}`, { name, price });
      Alert.alert('Success', 'Product updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update product:', error);
      Alert.alert('Error', 'Failed to update product');
    }
  };

  return (
    <View style={styles.container}>
      {/* <NavBar />
      <SideBar /> */}
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Update Product" onPress={updateProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default EditProduct;
