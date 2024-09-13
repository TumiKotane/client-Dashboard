// import React, { useEffect } from "react";
// import Layout from "./Layout";
// import ProductList from "../components/ProductList";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { AppDispatch, RootState } from "../redux/store"; // Import your Redux types
// import { getMe } from "../redux/authSlice";

// // Define the shape of the auth state
// interface AuthState {
//   isError: boolean;
// }

// // Define the component
// const Products: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for dispatch
//   const navigate = useNavigate();
//   const { isError } = useSelector((state: RootState) => state.auth as AuthState);

//   useEffect(() => {
//     dispatch(getMe());
//   }, [dispatch]);

//   useEffect(() => {
//     if (isError) {
//       navigate("/");
//     }
//   }, [isError, navigate]);

//   return (
//     <Layout>
//       <ProductList />
//     </Layout>
//   );
// };

// export default Products;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native"; // react-navigation for navigation

interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
}

const Userlist: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation(); // For navigation

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://192.168.137.80:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://192.168.137.80:5000/users/${userId}`);
      getUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 24 }}>Users</Text>
      <Text style={{ fontSize: 18 }}>List of Users</Text>
      <Button title="Add New" onPress={() => navigation.navigate("AddUser")} />
      <FlatList
        data={users}
        keyExtractor={(user) => user.uuid}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
            <Text>{index + 1}. {item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.role}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("EditUser", { userId: item.uuid })}>
              <Text style={{ color: "blue" }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteUser(item.uuid)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Userlist;