import React, {useEffect} from 'react';
import {initDatabase} from './src/database/database';
import Routes from './src/navigation/routes';

export default function App() {
  useEffect (() => {
    initDatabase ();
  }, []);

  return <Routes />;
}