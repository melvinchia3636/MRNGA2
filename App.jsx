/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import TodoList from './src/projects/TodoList';

import Home from './src/Home';
import CurrencyConverter from './src/projects/CurrencyConverter';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        drawerType: 'back',
        overlayColor: 'rgba(0, 0, 0, 0.3)',
        drawerInactiveTintColor: '#4B5563',
        headerTintColor: 'white',
      }}
      >
        <Drawer.Screen
          options={{
            drawerIcon: ({ color }) => <Feather name="home" size={20} color={color} />,
            drawerActiveTintColor: '#34D399',
            drawerActiveBackgroundColor: '#ECFDF5',
            headerStyle: {
              backgroundColor: '#34D399',
            },
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            title: 'Todo List',
            drawerIcon: ({ color }) => <Feather name="list" size={20} color={color} />,
            drawerActiveTintColor: '#F43F5E',
            drawerActiveBackgroundColor: '#FFF1F2',
            headerStyle: {
              backgroundColor: '#F43F5E',
            },
          }}
          name="TodoList"
          component={TodoList}
        />
        <Drawer.Screen
          options={{
            title: 'Currency Converter',
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="currency-usd-circle-outline" size={22} color={color} />,
            drawerActiveTintColor: '#EAB308',
            drawerActiveBackgroundColor: '#FEFCE8',
            headerStyle: {
              backgroundColor: '#EAB308',
            },
          }}
          name="CurrencyConverter"
          component={CurrencyConverter}
        />
      </Drawer.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
