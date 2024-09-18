import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

const API_URL = 'http://192.168.18.33:5000/users';

interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
}

const UserScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false); // Toggle for Add User form
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('User');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newConfPassword, setNewConfPassword] = useState('');
  // const [currentUserRole, setcurrentUserRole] = useState(AsyncStorage.getItem('userRole')); // New state for password

  useEffect(() => {
    fetchUsers();
  }, []);

  const api = axios.create({
    baseURL: 'http://192.168.18.33:5000', // your server address
    withCredentials: true, // Make sure credentials are sent with the request
  });

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (): Promise<void> => {
    if (!newUserName || !newUserEmail || !newUserPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const role = await AsyncStorage.getItem('userRole');

    if (role !== 'Admin') {
      Alert.alert('Error', 'Only admins can add users.');
      return;
    }

    try {
      await api.post('/users', {
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        password: newUserPassword,
        confPassword: newConfPassword, // Send password in the request
      });
      fetchUsers(); // Refresh the users list after adding
      setNewUserName('');
      setNewUserEmail('');
      setNewUserRole('');
      setNewUserPassword('');
      setNewConfPassword(''); // Clear password field
      setShowAddUserForm(false); // Close the form after submission
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', 'Failed to add user.');
    }
  };

  const UpdateUser = async (id: string): Promise<void> => {
    if (!newUserName || !newUserEmail || !newUserPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const role = await AsyncStorage.getItem('userRole');

    if (role !== 'Admin') {
      Alert.alert('Error', 'Only admins can add users.');
      return;
    }

    try {
      await api.patch(`users/${id}`, {
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        password: newUserPassword,
        confPassword: newConfPassword, // Send password in the request
      });
      fetchUsers(); // Refresh the users list after adding
      setNewUserName('');
      setNewUserEmail('');
      setNewUserRole('');
      setNewUserPassword('');
      setNewConfPassword(''); // Clear password field
      setShowAddUserForm(false); // Close the form after submission
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', 'Failed to add user.');
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    try {
      await api.delete(`users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.email}</Text>
      <Text style={styles.tableCell}>{item.role}</Text>
      <View style={styles.tableCellActions}>
        <TouchableOpacity onPress={() => deleteUser(item.uuid)}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => UpdateUser(item.uuid)}>
          <Icon name="edit" size={20} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add User" onPress={() => setShowAddUserForm(!showAddUserForm)} />

      {showAddUserForm && (
        <View style={styles.addUserForm}>
          <TextInput
            placeholder="Enter Name"
            value={newUserName}
            onChangeText={setNewUserName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Email"
            value={newUserEmail}
            onChangeText={setNewUserEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Enter Role"
            value={newUserRole}
            onChangeText={setNewUserRole}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Password"
            value={newUserPassword}
            onChangeText={setNewUserPassword}
            style={styles.input}
            secureTextEntry={true} // For password input
          />
          <TextInput
            placeholder="Re-enter Password"
            value={newConfPassword}
            onChangeText={setNewConfPassword}
            style={styles.input}
            secureTextEntry={true} // For password input
          />
      
        
          <Button title="Submit" onPress={addUser} />
        </View>
      )}

      <Text style={styles.heading}>Users List:</Text>
      <View style={styles.tableHeader}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 10 },
  tableHeaderCell: { flex: 1, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  tableCell: { flex: 1 },
  tableCellActions: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 },
  addUserForm: { marginBottom: 20 },
});

export default UserScreen;
