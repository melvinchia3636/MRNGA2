/* eslint-disable import/no-extraneous-dependencies */
import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

function Home() {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}
    >
      <Ionicons name="md-logo-react" size={196} color="#34D399" />
      <Text style={{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E293B',
        letterSpacing: 1,
      }}
      >
        M.R.N.G.A.
      </Text>
      <Text style={{
        fontWeight: 'bold',
        color: '#1E293B',
        fontSize: 22,
      }}
      >
        2022
      </Text>
    </View>
  );
}

export default Home;
