import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Detail } from './pages/Detail';
import { Incidents } from './pages/Incidents';

const AppStack = createStackNavigator();
const { Navigator, Screen } = AppStack;


export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen component={Incidents} name="Incidents" />
        <Screen component={Detail} name="Detail"/>
      </Navigator>
    </NavigationContainer>
  );
}
