import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Converter from './pages/converter';
import ExchangeRate from './pages/exchangeRate';

const Tabs = createMaterialTopTabNavigator();

function CurrencyConverter() {
  return (
    <Tabs.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: '#EAB308',
      },
      tabBarLabelStyle: {
        color: 'white',
      },
      tabBarIndicatorStyle: {
        backgroundColor: 'white',
      },
    }}
    >
      <Tabs.Screen name="Converter" component={Converter} />
      <Tabs.Screen
        name="ExchangeRate"
        options={{
          title: 'Exchange Rate',
        }}
        component={ExchangeRate}
      />
    </Tabs.Navigator>
  );
}

export default CurrencyConverter;
