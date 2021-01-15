import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import CanvasScreen from '../screens/CanvasScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CanvasScreen"
        component={CanvasScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const Routes = () => {
  return <AppStack />;
};

export default Routes;
