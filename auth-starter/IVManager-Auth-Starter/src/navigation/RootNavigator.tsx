import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RoleDashboard from '../screens/RoleDashboard';

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  const {user} = useAuth();
  return <Stack.Navigator screenOptions={{headerShown: false}}>
    {user ? <Stack.Screen name="Dashboard" component={RoleDashboard} /> : <Stack.Screen name="Login" component={LoginScreen} />}
  </Stack.Navigator>;
}
