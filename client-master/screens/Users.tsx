import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert, StyleSheet } from 'react-native';

// Update the API URL with the new IP address
const API_URL = 'http://192.168.137.226:5000/users';

// Define a type for the user object
interface User {
    id: number;
    name: string;
}

const UserScreen: React.FC = () => {
    // Use type annotation for state variables
    const [users, setUsers] = useState<User[]>([]);
    const [userId, setUserId] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [newUserName, setNewUserName] = useState<string>('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (): Promise<void> => {
        try {
            const response = await fetch(API_URL, { credentials: 'include' });
            const data: User[] = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserById = async (): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/${userId}`, { credentials: 'include' });
            const data = await response.json();
            setUserName(data.name); // Assuming user object has a 'name' property
        } catch (error) {
            console.error('Error fetching user by ID:', error);
        }
    };

    const createUser = async (): Promise<void> => {
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newUserName }),
                credentials: 'include'
            });
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const updateUser = async (): Promise<void> => {
        try {
            await fetch(`${API_URL}/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userName }),
                credentials: 'include'
            });
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (): Promise<void> => {
        try {
            await fetch(`${API_URL}/${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Users List:</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />

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
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
    }
});

export default UserScreen;
