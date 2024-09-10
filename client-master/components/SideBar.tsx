import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  AddUser: undefined;
  Dashboard: undefined;
};

type SideBarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const SideBar: React.FC<SideBarProps> = ({ navigation }) => {
  return (
    <View style={styles.sidebar}>
      <Button
        title="Add User"
        onPress={() => navigation.navigate('AddUser')}
      />
      <Button
        title="Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />
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
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default SideBar;
