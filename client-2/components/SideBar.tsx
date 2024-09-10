import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  UserList: undefined;
  Dashboard: undefined;
  Products: undefined;
};

type SideBarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const SideBar: React.FC<SideBarProps> = ({ navigation }) => {
  return (
    <View style={styles.sidebar}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Users"
            onPress={() => navigation.navigate('UserList')}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Dashboard"
            onPress={() => navigation.navigate('Dashboard')}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Products"
            onPress={() => navigation.navigate('Products')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 100,
    bottom: 0,
    width: 200,
    padding: 10,
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-end', // Align buttons to the bottom
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1, // Ensures buttons stay at the bottom
  },
  buttonWrapper: {
    marginBottom: 15, // Adds spacing between buttons
    paddingHorizontal: 5, // Padding inside the button wrapper for aesthetic spacing
  },
});

export default SideBar;
