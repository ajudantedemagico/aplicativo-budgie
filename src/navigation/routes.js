import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

const Stack = createStackNavigator ();

export default function Routes() {
    return (
        <NavigationContainer>
            {}
            {}
            <Stack.Navigator
            screenOptions ={{
                headerStyle: { background: '#f0ede8'},
                headerTintColor: '#5a5550',
                headerTitleStyle: { fontWeight: '600'},
                cardStyle: {backgroundColor: '#f0ede8'},
            }}
            >
                {}
                {}
                {}
                {}
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'Budgie'}}
            />
            <Stack.Screen
                name="AddExpense"
                component={AddExpenseScreen}
                options={{title: 'Novo Gasto'}}
            />
            
            </Stack.Navigator>
        </NavigationContainer>
    )
}

