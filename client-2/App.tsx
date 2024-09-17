import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import AddUser from './screens/AddUser';
import Dashboard from './screens/Dashboard';
import UserScreen from './screens/Users';
import ProductScreen from './screens/ProductScreen';
import AddProduct from './screens/AddProduct';
import EditProduct from './screens/EditProduct';

// Define types for navigation stack
type RootStackParamList = {
  Login: undefined;
  AddUser: undefined;
  Dashboard: undefined;
  UserList: undefined;
  Products: undefined;
  AddProduct: undefined;
  EditProduct: undefined;
};

// Create the stack navigator with typed screens
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AddUser" component={AddUser} />
          <Stack.Screen name="UserList" component={UserScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Products" component={ProductScreen} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="EditProduct" component={EditProduct} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>

  );
}
