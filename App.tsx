import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewRequest from './screens/Request/CreateNewRequest';
import RequestScreen from './screens/Request/Request';
import Region from './screens/Request/Region';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={LoginScreen} initialParams={{ token, setToken }} /> */}
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="CreateNewRequest" component={CreateNewRequest} />
        <Stack.Screen name='Request' component={RequestScreen} />
        <Stack.Screen name="Region" component={Region} />
        {/* <Stack.Screen name="FilterScreen" component={FilterScreen} /> */}
        {/* <Stack.Screen name="ClientDetails" component={ClientDetails} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})