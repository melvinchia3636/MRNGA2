/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  View, Text, Pressable, FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import CurrencyInput from 'react-native-currency-input';
import CountryFlag from 'react-native-country-flag';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import getISOByParam from '../scraper/ISOCountry';
import scrapeData from '../scraper/scrape';
import currencyName from '../scraper/currencyName.json';

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function ConverterIndex({ navigation }) {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('MYR');
  const [toCurrency, setToCurrency] = useState('USD');

  const [rates, setRates] = useState();

  useEffect(
    () => {
      if (fromValue <= 0) {
        setFromValue(0);
      }
    },
    [fromValue],
  );

  useEffect(() => {
    if (rates) {
      setToValue((rates[toCurrency] * fromValue).toFixed(2));
    }
  }, [fromValue, toCurrency, rates]);

  useEffect(() => {
    scrapeData(fromCurrency).then((res) => setRates(res.rates));
  }, [fromCurrency]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Pressable
          onPress={() => navigation.navigate('currencyChooser', {
            currency: fromCurrency,
            setCurrency: setFromCurrency,
          })}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
          }}
        >
          <CountryFlag
            size={18}
            style={{ marginRight: 8, marginTop: 2 }}
            isoCode={getISOByParam('currency', fromCurrency).toLowerCase()}
          />
          <Text style={{ fontSize: 16 }}>{fromCurrency}</Text>
          <FontAwesome5 style={{ marginLeft: 8 }} name="caret-down" size={16} color="black" />
        </Pressable>
        <Pressable
          onPress={() => {
            setFromCurrency(toCurrency);
            setToCurrency(fromCurrency);
          }}
          style={{ paddingVertical: 16 }}
        >
          <FontAwesome5 name="exchange-alt" size={18} color="black" />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('currencyChooser', {
            currency: toCurrency,
            setCurrency: setToCurrency,
          })}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
          }}
        >
          <CountryFlag
            size={18}
            style={{ marginRight: 8, marginTop: 2 }}
            isoCode={getISOByParam('currency', toCurrency).toLowerCase()}
          />
          <Text style={{ fontSize: 16 }}>{toCurrency}</Text>
          <FontAwesome5 style={{ marginLeft: 8 }} name="caret-down" size={16} color="black" />
        </Pressable>
      </View>
      <View style={{
        marginTop: 16,
        marginHorizontal: 24,
      }}
      >
        <Text style={{
          fontSize: 16,
          marginBottom: 8,
        }}
        >
          From currency:
        </Text>
        <CurrencyInput
          style={{
            backgroundColor: '#F1F5F9',
            padding: 16,
            fontSize: 24,
            borderRadius: 6,
            elevation: 6,
          }}
          value={fromValue}
          onChangeValue={setFromValue}
          prefix={currencyName.filter((e) => e.cc === fromCurrency)[0]?.symbol || '$'}
          delimiter=","
          separator="."
          precision={2}
          selectionColor="#EAB308"
        />
        <Text style={{
          fontSize: 16,
          marginBottom: 8,
          marginTop: 12,
        }}
        >
          To currency:
        </Text>
        <View
          style={{
            backgroundColor: '#F1F5F9',
            padding: 16,
            fontSize: 24,
            elevation: 6,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontSize: 24 }}>
            {currencyName.filter((e) => e.cc === toCurrency)[0]?.symbol || '$'}
            {formatNumber(toValue)}
          </Text>
        </View>
      </View>
    </View>
  );
}
function CurrencyItem({ item, params, navigation }) {
  return (getISOByParam('currency', item[0]) !== undefined && currencyName.filter((e) => e.cc === item[0])[0] !== undefined ? (
    <Pressable
      onPress={() => {
        params.setCurrency(item[0]);
        navigation.navigate('converterIndex');
      }}
      style={{
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <CountryFlag
        style={{
          borderRadius: 4,
        }}
        isoCode={getISOByParam('currency', item[0]).toLowerCase()}
        size={48}
      />
      <View style={{
        justifyContent: 'center',
        marginLeft: 12,
        flex: 1,
      }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            flex: 1,
          }}
          numberOfLines={1}
        >
          {currencyName.filter((e) => e.cc === item[0])[0].name}
        </Text>
        <Text style={{
          color: '#EAB308',
        }}
        >
          {item[0]}
        </Text>
      </View>
      {item[0] === params.currency && <Feather name="check" size={18} color="#EAB308" />}
    </Pressable>
  ) : null);
}

function CurrencyChooser({ navigation, route: { params } }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    scrapeData().then((d) => setData(d));
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
      padding: 16,
    }}
    >
      {data?.rates ? (
        <FlatList
          data={Object.entries(data.rates)}
          keyExtractor={(item) => item[0]}
          renderItem={(props) => (
            <CurrencyItem
              {...props}
              params={params}
              navigation={navigation}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 24,
          }}
        />
      ) : null }
      <Pressable
        style={{
          backgroundColor: '#EAB308',
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: 'white' }}>Cancel</Text>

      </Pressable>
    </View>
  );
}

const Stack = createStackNavigator();
function Converter() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      persentation: 'modal',
    }}
    >
      <Stack.Screen name="converterIndex" component={ConverterIndex} />
      <Stack.Screen name="currencyChooser" component={CurrencyChooser} />
    </Stack.Navigator>
  );
}

export default Converter;
