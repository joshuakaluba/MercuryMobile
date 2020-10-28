import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, SessionScreen, SessionCreationScreen, CameraScreen } from '../screens';
import { HomeParamList } from '../../types';

const HomeStack = createStackNavigator<HomeParamList>();

export default function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: true, title: "Locations" }} />
      <HomeStack.Screen name="SessionScreen" component={SessionScreen} options={{ headerShown: true, }} />
      <HomeStack.Screen name="SessionCreationScreen" component={SessionCreationScreen} options={{ headerShown: true, title: "" }} />
      <HomeStack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: true, title: "Scan QR Code" }} />
    </HomeStack.Navigator>
  );
}