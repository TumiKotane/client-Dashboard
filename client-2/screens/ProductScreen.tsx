import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
// import NavBar from "../components/NavBar";
// import SideBar from "../components/SideBar";

type RootStackParamList = {
  AddProduct: undefined;
};

interface User {
  name: string;
}

interface Product {
  uuid: string;
  name: string;
  price: string;
  user: User;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getProducts();
  }, []);

  // Axios instance to include credentials (cookies) automatically
  const api = axios.create({
    baseURL: 'http://192.168.18.33:5000', // your server address
    withCredentials: true, // Make sure credentials are sent with the request
  });

  const getProducts = async () => {
    try {
      const response = await api.get<Product[]>('/products');
      setProducts(response.data);
      console.log('Products:', response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      Alert.alert("Error", "Failed to fetch products");
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await api.delete(`/products/${productId}`);
      Alert.alert('Success', 'Product deleted successfully');
      getProducts(); // Refresh product list
    } catch (error) {
      console.error('Failed to delete product:', error);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => (
    <View style={styles.productRow}>
      <Text style={styles.text}>{index + 1}. {item.name}</Text>
      <Text style={styles.text}>Price: {item.price}</Text>
      <Text style={styles.text}>Created by: {item.user.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProduct', { productId: item.uuid })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteProduct(item.uuid)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <NavBar />
      <SideBar /> */}
      <Text style={styles.title}>Products</Text>
      <Button title="Add New" onPress={() => navigation.navigate('AddProduct')} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.uuid}
        renderItem={renderProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductList;
