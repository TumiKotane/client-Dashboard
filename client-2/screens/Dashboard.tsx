// import React, {useState, useEffect} from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; 
// import NavBar from '../components/NavBar'; // Adjust the path if needed
// import SideBar from '../components/SideBar'; // Adjust the path if needed
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// type RootStackParamList = {
//   Login: undefined;
//   AddUser: undefined;
// };

// type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// const handleDashboard = async () => {
//   const role = await AsyncStorage.getItem('userRole');
//   console.log(role);
//   if ( role === 'Admin') {
//     const [userRole, setUserRole] = useState<string>('');
//     useEffect(() => {
//       setUserRole(role);
//     }, []);
//     console.log(role);
//   } else {
//     console.log('User');
//   }

// }

// const Dashboard: React.FC = () => {
// const navigation = useNavigation<DashboardNavigationProp>();
// handleDashboard();

//   return (
//     <View style={styles.container}>
//       <NavBar navigation={navigation} />
//       <SideBar navigation={navigation} />
//       <View style={styles.mainContent}>
//         <Text style={styles.title}>Welcome!</Text> ////edit dashboard text
//         <Text style={styles.subtitle}>Role:</Text>
//         <Text style={styles.title}>Loading...</Text>
//       </View>
//     </View>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     flexDirection: 'row', // Ensures Sidebar and main content are laid out horizontally
//   },
//   mainContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
// });

//new code
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/NavBar'; 
import SideBar from '../components/SideBar'; 

const Dashboard: React.FC = () => {
  const [userRole, setUserRole] = useState<string>('Loading...');

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setUserRole(role || 'User');
    };
    fetchUserRole();
  }, []);

  return (
    <View style={styles.container}>
      <NavBar />
      <SideBar />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Welcome to the Dashboard!</Text>
        <Text style={styles.subtitle}>Your Role: {userRole}</Text>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
  },
});
