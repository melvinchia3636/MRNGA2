/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import {
  View, Text, FlatList, TextInput, RefreshControl,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import CountryFlag from 'react-native-country-flag';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import { FAB } from 'react-native-paper';
import { AnimatePresence, MotiView } from 'moti';
import scrapeData from '../scraper/exchangeRate';
import { getISOByParam } from '../scraper/ISOCountry';
import currencyName from '../scraper/currencyName.json';

function RateItem({ item }) {
  return (getISOByParam('currency', item[0]) !== undefined && currencyName.filter((e) => e.cc === item[0])[0] !== undefined ? (
    <View style={{
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
      <Text style={{
        color: '#EAB308',
        fontWeight: 'bold',
        marginLeft: 24,
      }}
      >
        {item[1]}
      </Text>
    </View>
  ) : null);
}

function ExchangeRate() {
  const [data, setData] = useState();
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [FABShow, setFABShow] = useState(false);
  const listRef = useRef();

  useEffect(() => {
    scrapeData().then((d) => setData(d));
  }, []);

  const updateData = () => {
    scrapeData().then((d) => setData(d));
    setRefreshing(false);
  };

  const listOnScroll = (e) => {
    if (e.nativeEvent.contentOffset.y > 150) {
      setFABShow(true);
    } else {
      setFABShow(false);
    }
  };

  return (
    data ? (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 24,
      }}
      >
        <View style={{
          marginTop: 24,
          marginBottom: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <Text style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}
          >
            1 USD =
          </Text>
          <Text>
            Last updated:
            {' '}
            <Text style={{
              color: '#EAB308',
            }}
            >
              {moment(data.time_last_update_unix * 1000).format('Do MMMM YYYY')}
            </Text>
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24,
          backgroundColor: '#F1F5F9',
          padding: 12,
          borderRadius: 6,
        }}
        >
          <Feather
            style={{
              marginRight: 8,
            }}
            name="search"
            size={24}
            color="black"
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            selectionColor="#EAB308"
            placeholder="Search for currency"
          />
        </View>
        <FlatList
          ref={listRef}
          onScroll={listOnScroll}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updateData} />}
          data={Object.entries(data.rates).filter((e) => (query === '' ? true : (
            getISOByParam('currency', e[0])?.toLowerCase().includes(query.toLowerCase())
            || currencyName.filter((c) => c.cc === e[0])[0]
              ?.name
              .toLowerCase()
              .includes(query.toLowerCase())
            || e[0].toLowerCase().includes(query.toLowerCase())
          )))}
          keyExtractor={(item) => item[0]}
          renderItem={RateItem}
          contentContainerStyle={{
            paddingBottom: 24,
          }}
        />
        <AnimatePresence>
          {FABShow && (
          <MotiView
            from={{
              bottom: -100,
            }}
            animate={{
              bottom: 0,
            }}
            exit={{
              bottom: -100,
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              margin: 16,
            }}
          >
            <FAB
              style={{
                backgroundColor: '#EAB308',
              }}
              onPress={() => listRef.current.scrollToOffset(0)}
              icon={() => <Feather name="chevrons-up" size={24} color="white" />}
            />
          </MotiView>
          )}
        </AnimatePresence>
      </View>
    ) : null
  );
}

export default ExchangeRate;
