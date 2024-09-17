import React from 'react';
import Navbar from '../components/NavBar'; // add components
import Sidebar from '../components/SideBar'; // add components
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // add navigation
import { RootStackParamList } from '../types'; // add types
import { useNavigation } from 'react-router-dom';

// Define the type for the Layout component props
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar navigation={useNavigation()} />
      <view className="columns mt-6 full-height">
        <view className="column is-2">
          <Sidebar />
        </view>
        <view className="column has-background-light">
          <main>{children}</main>
        </view>
      </view>
    </>
  );
};

export default Layout;
