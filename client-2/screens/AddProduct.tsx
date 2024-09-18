import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const AddProduct: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>();
  const navigation = useNavigation();

  const addProduct = async () => {
    try {
      await axios.post('http://192.168.18.33:5000/products', { name, price }, { withCredentials: true });
      Alert.alert('Success', 'Product added successfully');
      console.log('Product added successfully');
      navigation.goBack(); // Navigate back to the product list
    } catch (error) {
      console.error('Failed to add product:', error);
      Alert.alert('Error', 'Failed to add product');
      navigation.goBack();
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
      <Button title="Add Product" onPress={addProduct} />
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

export default AddProduct;
