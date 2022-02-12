import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import scrapeData from '../scraper/exchangeRate';

function ExchangeRate() {
  const [data, setData] = useState();

  useEffect(() => {
    scrapeData().then((d) => setData(d));
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
      padding: 24,
    }}
    >
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

export default ExchangeRate;
