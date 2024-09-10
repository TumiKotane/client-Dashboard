import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';


// Define the type for your navigation stack

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

// Define props for the screen component

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  route: RouteProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async () => {

    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
    setLoading(true); // Show loading indicator
    // Make API request to your backend (adjust URL as necessary)
    const response = await axios.post('http://localhost:5000/login', { //192.168.137.226
    email,
    password,
    });
    // Assuming the API returns a token upon successful login
  const { token } = response.data;
  console.log({ token });

    if (response) {
    // Store token in AsyncStorage
   //await AsyncStorage.setItem('userToken', token);
   console.log(response)

    // Navigate to Dashboard
    navigation.navigate('Dashboard');
    console.log("Login Successful")
  } else {
      Alert.alert('Login failed', 'Invalid credentials');      }

    } catch (error) {
      console.error(error);
      Alert.alert('Login failed', 'An error occurred. Please try again.');
    } 
    finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (

    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
    </View>

  );

}

const styles = StyleSheet.create({

container: {
flex: 1,
justifyContent: 'center',
padding: 20,
},

label: {
marginBottom: 8,
},

input: {
height: 40,
borderColor: '#ccc',
borderWidth: 1,
marginBottom: 20,
paddingHorizontal: 10,
},
});
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RouteProp } from '@react-navigation/native';

// // Define the type for your navigation stack
// type RootStackParamList = {
//   Login: undefined;
//   Dashboard: undefined;
// };

// // Define props for the screen component
// type LoginScreenProps = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
//   route: RouteProp<RootStackParamList, 'Login'>;
// };

// export default function LoginScreen({ navigation }: LoginScreenProps) {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');

// //   const handleLogin = async () => {
// //     try {
// //       const response = await axios.post('http://192.168.137.226:5000/login', { //192.168.137.1
// //         email,
// //         password,
// //       });
// //       console.log('Server response:', response.data); // Log the response
// //       if (response.data.token) {
// //         await AsyncStorage.setItem('token', response.data.token);
// //         console.log('Login successful');
// //         navigation.navigate('Dashboard');
// //         console.log('Navigated to Dashboard screen');
// //       } else {
// //         Alert.alert('Login failed', 'Invalid email or password');
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       Alert.alert('Login failed', 'An error occurred');
// //     }
// //   };
// const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://192.168.137.226:5000/login', {
//         email,
//         password,
//       });
      
//       console.log('Server response:', response.data);
  
//       // Check if uuid or email exists to verify a successful login
//       if (response.data.uuid || response.data.email) {
//         // Optionally, store other user info like email, name, role
//         await AsyncStorage.setItem('userEmail', response.data.email);
//         await AsyncStorage.setItem('userName', response.data.name);
//         await AsyncStorage.setItem('userRole', response.data.role);
//         await AsyncStorage.setItem('userUUID', response.data.uuid);
  
//         console.log('Login successful');
//         navigation.navigate('Dashboard');
//         console.log('Navigated to Dashboard screen');
//       } else {
//         Alert.alert('Login failed', 'Invalid email or password');
//       }
//     } catch (error) {
//       console.log(error);
//       Alert.alert('Login failed', 'An error occurred');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button
//         title="Login"
//         onPress={handleLogin}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   label: {
//     marginBottom: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });
