// // // import React, { useState } from 'react';
// // // import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// // // import axios from 'axios';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RouteProp } from '@react-navigation/native';


// // // // Define the type for your navigation stack

// // // type RootStackParamList = {
// // //   Login: undefined;
// // //   Dashboard: undefined;
// // // };

// // // // Define props for the screen component

// // // type LoginScreenProps = {
// // //   navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
// // //   route: RouteProp<RootStackParamList, 'Login'>;
// // // };

// // // export default function LoginScreen({ navigation }: LoginScreenProps) {
// // //   const [email, setEmail] = useState<string>('');
// // //   const [password, setPassword] = useState<string>('');
// // //   const [loading, setLoading] = useState<boolean>(false);
// // //   const handleLogin = async () => {

// // //     // Basic validation
// // //     if (!email || !password) {
// // //       Alert.alert('Error', 'Please fill in all fields');
// // //       return;
// // //     }
// // //      try {
// // //        const response = await axios.post('http://localhost:5000/login', { //192.168.137.226
// // //          email,
// // //          password,
// // //       });
// // //   if(response) {
// // //     await AsyncStorage.setItem('userEmail', response.data.email);
// // //     await AsyncStorage.setItem('userName', response.data.name);
// // //     await AsyncStorage.setItem('userRole', response.data.role);
// // //     await AsyncStorage.setItem('userUUID', response.data.uuid);
// // //     navigation.navigate('Dashboard');
// // //     console.log("Login Successful");
// // //     console.log({response});
// // //   }
// // //    else {
// // //       Alert.alert('Login failed', 'Invalid credentials');      }

// // //     } catch (error) {
// // //       console.error(error);
// // //       Alert.alert('Login failed', 'An error occurred. Please try again.');
// // //     } 
// // //     finally {
// // //       setLoading(false); // Hide loading indicator
// // //     }
// // //   };

// // //   return (

// // //     <View style={styles.container}>
// // //       <TextInput
// // //         placeholder="Email"
// // //         value={email}
// // //         onChangeText={setEmail}
// // //         style={styles.input}
// // //       />
// // //       <TextInput
// // //         placeholder="Password"
// // //         value={password}
// // //         onChangeText={setPassword}
// // //         style={styles.input}
// // //         secureTextEntry
// // //       />
// // //       <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
// // //     </View>

// // //   );

// // // }

// // // const styles = StyleSheet.create({

// // // container: {
// // // flex: 1,
// // // justifyContent: 'center',
// // // padding: 20,
// // // },

// // // label: {
// // // marginBottom: 8,
// // // },

// // // input: {
// // // height: 40,
// // // borderColor: '#ccc',
// // // borderWidth: 1,
// // // marginBottom: 20,
// // // paddingHorizontal: 10,
// // // },
// // // });
// // // // import React, { useState } from 'react';
// // // // import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// // // // import axios from 'axios';
// // // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // import { RouteProp } from '@react-navigation/native';

// // // // // Define the type for your navigation stack
// // // // type RootStackParamList = {
// // // //   Login: undefined;
// // // //   Dashboard: undefined;
// // // // };

// // // // // Define props for the screen component
// // // // type LoginScreenProps = {
// // // //   navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
// // // //   route: RouteProp<RootStackParamList, 'Login'>;
// // // // };

// // // // export default function LoginScreen({ navigation }: LoginScreenProps) {
// // // //   const [email, setEmail] = useState<string>('');
// // // //   const [password, setPassword] = useState<string>('');

// // // // //   const handleLogin = async () => {
// // // // //     try {
// // // // //       const response = await axios.post('http://192.168.137.226:5000/login', { //192.168.137.1
// // // // //         email,
// // // // //         password,
// // // // //       });
// // // // //       console.log('Server response:', response.data); // Log the response
// // // // //       if (response.data.token) {
// // // // //         await AsyncStorage.setItem('token', response.data.token);
// // // // //         console.log('Login successful');
// // // // //         navigation.navigate('Dashboard');
// // // // //         console.log('Navigated to Dashboard screen');
// // // // //       } else {
// // // // //         Alert.alert('Login failed', 'Invalid email or password');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.log(error);
// // // // //       Alert.alert('Login failed', 'An error occurred');
// // // // //     }
// // // // //   };
// // // // const handleLogin = async () => {
// // // //     try {
// // // //       const response = await axios.post('http://192.168.137.226:5000/login', {
// // // //         email,
// // // //         password,
// // // //       });
      
// // // //       console.log('Server response:', response.data);
  
// // // //       // Check if uuid or email exists to verify a successful login
// // // //       if (response.data.uuid || response.data.email) {
// // // //         // Optionally, store other user info like email, name, role
// // //         // await AsyncStorage.setItem('userEmail', response.data.email);
// // //         // await AsyncStorage.setItem('userName', response.data.name);
// // //         // await AsyncStorage.setItem('userRole', response.data.role);
// // //         // await AsyncStorage.setItem('userUUID', response.data.uuid);
  
// // // //         console.log('Login successful');
// // // //         navigation.navigate('Dashboard');
// // // //         console.log('Navigated to Dashboard screen');
// // // //       } else {
// // // //         Alert.alert('Login failed', 'Invalid email or password');
// // // //       }
// // // //     } catch (error) {
// // // //       console.log(error);
// // // //       Alert.alert('Login failed', 'An error occurred');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <Text style={styles.label}>Email</Text>
// // // //       <TextInput
// // // //         style={styles.input}
// // // //         value={email}
// // // //         onChangeText={setEmail}
// // // //         keyboardType="email-address"
// // // //       />
// // // //       <Text style={styles.label}>Password</Text>
// // // //       <TextInput
// // // //         style={styles.input}
// // // //         value={password}
// // // //         onChangeText={setPassword}
// // // //         secureTextEntry
// // // //       />
// // // //       <Button
// // // //         title="Login"
// // // //         onPress={handleLogin}
// // // //       />
// // // //     </View>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     justifyContent: 'center',
// // // //     padding: 20,
// // // //   },
// // // //   label: {
// // // //     marginBottom: 8,
// // // //   },
// // // //   input: {
// // // //     height: 40,
// // // //     borderColor: '#ccc',
// // // //     borderWidth: 1,
// // // //     marginBottom: 20,
// // // //     paddingHorizontal: 10,
// // // //   },
// // // // });
// // import React, { useState } from 'react';
// // import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RouteProp } from '@react-navigation/native';

// // // Define the type for your navigation stack
// // type RootStackParamList = {
// //   Login: undefined;
// //   Dashboard: undefined;
// // };

// // // Define props for the screen component
// // type LoginScreenProps = {
// //   navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
// //   route: RouteProp<RootStackParamList, 'Login'>;
// // };

// // export default function LoginScreen({ navigation }: LoginScreenProps) {
// //   const [email, setEmail] = useState<string>('');
// //   const [password, setPassword] = useState<string>('');
// //   const [loading, setLoading] = useState<boolean>(false);

// //   const handleLogin = async () => {
// //     // Basic validation
// //     if (!email || !password) {
// //       Alert.alert('Error', 'Please fill in all fields');
// //       return;
// //     }

// //     try {
// //       setLoading(true); // Show loading indicator
// //       // Replace 'localhost' with your machine's local IP address
// //       const response = await axios.post('http://192.168.X.X:5000/login', {
// //         email,
// //         password,
// //       });

// //       if (response) {
// //         await AsyncStorage.setItem('userEmail', response.data.email);
// //         await AsyncStorage.setItem('userName', response.data.name);
// //         await AsyncStorage.setItem('userRole', response.data.role);
// //         await AsyncStorage.setItem('userUUID', response.data.uuid);

// //         navigation.navigate('Dashboard');
// //         console.log('Login Successful');
// //       } else {
// //         Alert.alert('Login failed', 'Invalid credentials');
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       Alert.alert('Login failed', 'An error occurred. Please try again.');
// //     } finally {
// //       setLoading(false); // Hide loading indicator
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         placeholder="Email"
// //         value={email}
// //         onChangeText={setEmail}
// //         style={styles.input}
// //       />
// //       <TextInput
// //         placeholder="Password"
// //         value={password}
// //         onChangeText={setPassword}
// //         style={styles.input}
// //         secureTextEntry
// //       />
// //       <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     padding: 20,
// //   },
// //   input: {
// //     height: 40,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     marginBottom: 20,
// //     paddingHorizontal: 10,
// //   },
// // });
//  //////////code that was working now
// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleLogin = async () => {
//     // Basic validation
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     try {
//       setLoading(true); // Show loading indicator
//       // Replace 'localhost' with your machine's local IP address
//       const response = await axios.post('http://192.168.137.226:5000/login', {
//         email,
//         password,
//       });

//       if (response) {
//         await AsyncStorage.setItem('userEmail', response.data.email);
//         await AsyncStorage.setItem('userName', response.data.name);
//         await AsyncStorage.setItem('userRole', response.data.role);
//         await AsyncStorage.setItem('userUUID', response.data.uuid);

//         navigation.navigate('Dashboard');
//         console.log('Login Successful');
//       } else {
//         Alert.alert('Login failed', 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Login failed', 'An error occurred. Please try again.');
//     } finally {
//       setLoading(false); // Hide loading indicator
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         secureTextEntry
//       />
//       <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

///////Current runnung code
// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleLogin = async () => {
//     // Basic validation
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     try {
//       setLoading(true); // Show loading indicator
//       // Replace 'localhost' with your machine's local IP address
//       const response = await axios.post('http://localhost:5000/login', {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         // Save user details in async storage
//         await AsyncStorage.setItem('userEmail', response.data.email);
//         await AsyncStorage.setItem('userName', response.data.name);
//         await AsyncStorage.setItem('userRole', response.data.role);
//         await AsyncStorage.setItem('userUUID', response.data.uuid);

//         // Navigate to Dashboard
//         navigation.navigate('Dashboard');
//         console.log('Login Successful');
//       } else {
//         Alert.alert('Login failed', 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Login failed', 'A network error occurred. Please try again.');
//     } finally {
//       setLoading(false); // Hide loading indicator
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         secureTextEntry
//       />
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Button title="Login" onPress={handleLogin} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
// });

//new code
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  route: RouteProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.uuid) {
        console.log('Login Successful...................');
        await AsyncStorage.setItem('userEmail', response.data.email);
        await AsyncStorage.setItem('userName', response.data.name);
        await AsyncStorage.setItem('userRole', response.data.role);
        await AsyncStorage.setItem('userUUID', response.data.uuid);
       
        navigation.navigate('Dashboard');
        console.log('Login Successful');
      } else {
        Alert.alert('Login failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login failed', 'A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eef2f5',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
