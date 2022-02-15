import { CONTENT } from '@assets/data/content';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home';
import PinchGestureScreen from '@screens/PinchGesture';
import * as React from 'react';

interface MainNavigatorProps {}
const Stack = createNativeStackNavigator();

const MainNavigator = (props: MainNavigatorProps) => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
        };
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Group
        screenOptions={({ route, navigation }) => {
          return {
            headerShown: true,
          };
        }}
      >
        <Stack.Screen name="PinchGesture" component={PinchGestureScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainNavigator;
