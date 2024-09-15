import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons

// Update the API URL with the correct IP address or localhost
const API_URL = 'http://192.168.100.6:5000/users'; // Use IP if running on device

// Define a type for the user object
interface User {
  uuid: number;
  name: string;
  email: string;
  role: string;
}

const UserScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store list of users
  const [userId, setUserId] = useState<number>(); // State to store user ID
  const [userName, setUserName] = useState<string>(''); // State to store user name
  const [newUserName, setNewUserName] = useState<string>(''); // State for new user name input

  // Fetch users once when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users
  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await axios.get(API_URL, {withCredentials: true}); //fix this error
      const data: User[] = response.data;
      setUsers(data); // Update state with fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to fetch a user by ID
  const fetchUserById = async (): Promise<void> => {
    if (!userId) {
      Alert.alert('Error', 'Please enter a valid User ID.');
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      const data = response.data;
      console.log('response.data', response.data)
      setUserName(data.name); // Assuming user object has a 'name' property
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      Alert.alert('Error', 'User not found.');
    }
  };

  // Function to create a new user
  const createUser = async (): Promise<void> => {
    if (!newUserName) {
      Alert.alert('Error', 'Please enter a valid name.');
      return;
    }
    try {
      await axios.post(API_URL, { name: newUserName });
      setNewUserName('');
      fetchUsers(); // Refresh the users list after creating
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Function to update an existing user's name
  const updateUser = async (id: string, updatedName: string): Promise<void> => {
    if (!id || !updatedName) {
      Alert.alert('Error', 'Please enter valid User ID and name.');
      return;
    }
    try {
      await axios.patch(`${API_URL}/${id}`, { name: updatedName });
      setUserId(undefined);
      setUserName('');
      fetchUsers(); // Refresh the users list after updating
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Function to delete a user
  const deleteUser = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers(); // Refresh the users list after deleting
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Render each user in a row
  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.uuid}</Text>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.email}</Text>
      <Text style={styles.tableCell}>{item.role}</Text>
      <View style={styles.tableCellActions}>
        <TouchableOpacity onPress={() => deleteUser(item.uuid)}>  
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Users List:</Text>
      
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>UUID</Text>
        <Text style={styles.tableHeaderCell}>Name</Text>
        <Text style={styles.tableHeaderCell}>Email</Text>
        <Text style={styles.tableHeaderCell}>Role</Text>
        <Text style={styles.tableHeaderCell}>Actions</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.uuid.toString()}
        renderItem={renderUser}
        ListEmptyComponent={<Text>No users found</Text>}
      />

      <TextInput
        placeholder="Enter New User Name"
        value={newUserName}
        onChangeText={setNewUserName}
        style={styles.input}
      />
      <Button title="Add User" onPress={createUser} />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 10 },
  tableHeaderCell: { flex: 1, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  tableCell: { flex: 1 },
  tableCellActions: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 },
});

export default UserScreen;
