import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { initDatabase } from './src/database/database';
import Routes from './src/navigation/routes';

import { useFonts, KleeOne_400Regular, KleeOne_600SemiBold } from '@expo-google-fonts/klee-one';

export default function App() {


  const [fontsLoaded] = useFonts({
    KleeOne_400Regular,   
    KleeOne_600SemiBold,  
  });

  useEffect(() => {
    initDatabase();
  }, []);

  
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0ede8' }}>
        <ActivityIndicator color="#8a7fc0" />
      </View>
    );
  }

  return <Routes />;
}