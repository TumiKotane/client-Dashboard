import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert, StyleSheet } from 'react-native';

// Update the API URL with the new IP address
const API_URL = 'http://localhost:5000/users'; //use either localhost:5000 or pc ip:192.168.137.226

// Define a type for the user object
interface User {
  uuid: number; // Change id to uuid
  name: string;
  email: string; // Add email property
  role: string; // Add role property
}
const UserScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store list of users
  const [userId, setUserId] = useState<string>(''); // State to store user ID
  const [userName, setUserName] = useState<string>(''); // State to store user name
  const [newUserName, setNewUserName] = useState<string>(''); // State for new user name input

  // Fetch users once when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users
  const fetchUsers = async (): Promise<void> => {
    try {
      console.log("Trying to get Users List");
      const response = await axios.get(API_URL); // Making a GET request to fetch users
      const data: User[] = response.data; // Cast response data to the User array type
      setUsers(data); // Update state with fetched users
      console.log(data); // Debugging: log fetched data
    } catch (error) {
      console.error('Error fetching users:', error); // Error handling for failed requests
    }
  };
  // interface User {
//   uuid: number; // Change id to uuid
//   name: string;
//   email: string; // Add email property
//   role: string; // Add role property
// }

// const UserScreen: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [userId, setUserId] = useState<string>('');
//   const [userName, setUserName] = useState<string>('');
//   const [newUserName, setNewUserName] = useState<string>('');

//   // Fetch users once when the component mounts
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Function to fetch all users
//   const fetchUsers = async (): Promise<void> => {
//     try {
//         console.log("Trying to get Users List")
//         const response = await axios.get(API_URL);
//         console.log(response.data);
//       // const response = await fetch(API_URL, { credentials: 'include' });
//       const data: User[] = await response.data;
//       setUsers(data);
//       console.log(data);
//       console.log(users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

  // Function to fetch a user by ID
  const fetchUserById = async (): Promise<void> => {
    if (!userId) {
      Alert.alert('Error', 'Please enter a valid User ID.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${userId}`, { credentials: 'include' });
      const data = await response.json();
      if (data.name) {
        setUserName(data.name); // Assuming user object has a 'name' property
      } else {
        Alert.alert('Error', 'User not found.');
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error);
    }
  };

  // Function to create a new user
  const createUser = async (): Promise<void> => {
    if (!newUserName) {
      Alert.alert('Error', 'Please enter a valid name.');
      return;
    }
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName }),
        credentials: 'include',
      });
      setNewUserName('');
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Function to update an existing user's name
  const updateUser = async (): Promise<void> => {
    if (!userId || !userName) {
      Alert.alert('Error', 'Please enter valid User ID and name.');
      return;
    }
    try {
      await fetch(`${API_URL}/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName }),
        credentials: 'include',
      });
      setUserId('');
      setUserName('');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Function to delete a user
  const deleteUser = async (): Promise<void> => {
    if (!userId) {
      Alert.alert('Error', 'Please enter a valid User ID.');
      return;
    }
    try {
      await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setUserId('');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Users List:</Text>
      
      {/* List of users */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.uuid.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No users found</Text>}
      />

      {/* Input for fetching, creating, and updating users */}
      <TextInput
        placeholder="Enter User ID"
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
      />
      <Button title="Fetch User" onPress={fetchUserById} />

      <TextInput
        placeholder="Enter New User Name"
        value={newUserName}
        onChangeText={setNewUserName}
        style={styles.input}
      />
      <Button title="Create User" onPress={createUser} />

      <TextInput
        placeholder="Update User Name"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
      <Button title="Update User" onPress={updateUser} />

      <Button title="Delete User" onPress={deleteUser} />
    </View>
  );
};

// Define styles separately
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  userName: {
    fontSize: 18,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default UserScreen;
