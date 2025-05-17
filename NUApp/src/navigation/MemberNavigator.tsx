import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MemberStackParamList } from '../types/navigation';
import HomeScreen from '../screens/member/HomeScreen';
import ProfileScreen from '../screens/member/ProfileScreen';
import EditProfileScreen from '../screens/member/EditProfileScreen';
import QRISScreen from '../screens/member/QRISScreen';
import IuranScreen from '../screens/member/IuranScreen';
import UMKMMarketScreen from '../screens/member/UMKMMarketScreen';
import ProductDetailScreen from '../screens/member/ProductDetailScreen';
import AddProductScreen from '../screens/member/AddProductScreen';
import MyProductsScreen from '../screens/member/MyProductsScreen';
import DonationScreen from '../screens/member/DonationScreen';
import DonationDetailScreen from '../screens/member/DonationDetailScreen';
import CooperativeScreen from '../screens/member/CooperativeScreen';
import LoanCalculatorScreen from '../screens/member/LoanCalculatorScreen';
import AnnouncementScreen from '../screens/member/AnnouncementScreen';
import AnnouncementDetailScreen from '../screens/member/AnnouncementDetailScreen';
import BlogScreen from '../screens/member/BlogScreen';
import BlogPostScreen from '../screens/member/BlogPostScreen';

const Stack = createNativeStackNavigator<MemberStackParamList>();

export const MemberNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="MemberHome" 
        component={HomeScreen}
        options={{ 
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Profile',
        }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ 
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen 
        name="QRIS" 
        component={QRISScreen}
        options={{ 
          title: 'QRIS Payment',
        }}
      />
      <Stack.Screen 
        name="Iuran" 
        component={IuranScreen}
        options={{ 
          title: 'Contributions',
        }}
      />
      <Stack.Screen 
        name="UMKMMarket" 
        component={UMKMMarketScreen}
        options={{ 
          title: 'UMKM Market',
        }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ 
          title: 'Product Details',
        }}
      />
      <Stack.Screen 
        name="AddProduct" 
        component={AddProductScreen}
        options={{ 
          title: 'Add Product',
        }}
      />
      <Stack.Screen 
        name="MyProducts" 
        component={MyProductsScreen}
        options={{ 
          title: 'My Products',
        }}
      />
      <Stack.Screen 
        name="Donation" 
        component={DonationScreen}
        options={{ 
          title: 'Donations',
        }}
      />
      <Stack.Screen 
        name="DonationDetail" 
        component={DonationDetailScreen}
        options={{ 
          title: 'Donation Details',
        }}
      />
      <Stack.Screen 
        name="Cooperative" 
        component={CooperativeScreen}
        options={{ 
          title: 'Cooperative',
        }}
      />
      <Stack.Screen 
        name="LoanCalculator" 
        component={LoanCalculatorScreen}
        options={{ 
          title: 'Loan Calculator',
        }}
      />
      <Stack.Screen 
        name="Announcements" 
        component={AnnouncementScreen}
        options={{ 
          title: 'Announcements',
        }}
      />
      <Stack.Screen 
        name="AnnouncementDetail" 
        component={AnnouncementDetailScreen}
        options={{ 
          title: 'Announcement',
        }}
      />
      <Stack.Screen 
        name="Blog" 
        component={BlogScreen}
        options={{ 
          title: 'Blog',
        }}
      />
      <Stack.Screen 
        name="BlogPost" 
        component={BlogPostScreen}
        options={{ 
          title: 'Blog Post',
        }}
      />
    </Stack.Navigator>
  );
};
