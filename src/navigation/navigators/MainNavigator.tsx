import { CONTENT } from '@assets/data/content';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ColorInterpolationScreen from '@screens/ColorInterpolation';
import HomeScreen from '@screens/Home';
import MergeGesturesScreen from '@screens/MergeGestures';
import PanGestureScreen from '@screens/PanGesture';
import PinchGestureScreen from '@screens/PinchGesture';
import TikTokDiskScreen from '@screens/TikTokDisk';
import * as React from 'react';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Group
        screenOptions={() => {
          return {
            headerShown: true,
          };
        }}
      >
        <Stack.Screen name="PinchGesture" component={PinchGestureScreen} />
        <Stack.Screen name="PanGesture" component={PanGestureScreen} />
        <Stack.Screen name="MergeGestures" component={MergeGesturesScreen} />
        <Stack.Screen name="TikTokDisk" component={TikTokDiskScreen} />
        <Stack.Screen
          name="ColorInterpolation"
          component={ColorInterpolationScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainNavigator;
