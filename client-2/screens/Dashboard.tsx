import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import NavBar from '../components/NavBar'; // Adjust the path if needed
import SideBar from '../components/SideBar'; // Adjust the path if needed
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type RootStackParamList = {
  Login: undefined;
  AddUser: undefined;
};

type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const getRole = async () => {
  const role = await AsyncStorage.getItem('userRole');
  console.log(role);
}
const Dashboard: React.FC = () => {
const navigation = useNavigation<DashboardNavigationProp>();
getRole();

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <SideBar navigation={navigation} />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Role:`${role}</Text>
        <Text style={styles.title}>Loading...</Text>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row', // Ensures Sidebar and main content are laid out horizontally
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});
