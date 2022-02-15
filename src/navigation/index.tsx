import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from '@navigation/navigators/MainNavigator';

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
