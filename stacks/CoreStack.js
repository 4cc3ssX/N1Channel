import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Drawer from '../Drawer';
import Settings from '../screens/Settings';
import Loading from '../screens/Loading';
import Player from '../screens/Player';
import Details from '../screens/Details';
import About from '../screens/About';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      mode="modal"
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        animationTypeForReplace: 'pop',
      }}>
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="botTab" component={Drawer} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};
export default Auth;
