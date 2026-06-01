import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#ecdbf5' },
          headerTintColor: '#5a5550',
          headerTitleStyle: {
            fontFamily: 'KleeOne_600SemiBold',
            fontSize: 18,
          },
          cardStyle: { backgroundColor: '#f0ede8' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'budgie ✦ controle de gastos' }}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{ title: 'novo gasto' }}
        />
        <Stack.Screen
           name="About"
           component={AboutScreen}
           options={{ title: 'sobre ✦' }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}