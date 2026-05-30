import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Flatlist,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { listarGastos } from '../database/database';
import ExpenseItem from '../components/ExpenseItem'
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen ({ navigation }) {

    const [gastos, setGastos] = useState ([]);
    const carregarGastos = () => {
        const resultado = listarGastos ();
        setGastos (resultado);
    };

    useEffect (() => {
        carregarGastos ();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener ('focus', carregarGastos);
        return unsubscribe;
    }, [navigation]);

const total = gastos.reduce ((soma, item) => soma + item.valor, 0);

return (

    <View style={StyleSheet.container}>

        <View style={StyleSheet.totalCard}>
           <Text style={StyleSheet.totalLabel}>total registrado</Text>
           <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
           <Text style={styles.totalSub}>✦ {gastos.length} registros</Text>
        </View>
        {}

        <FlatList
         data={gastos}
         keyExtractor={( item ) => item.id.toString()}
         renderItemm={({ item }) => (
          <ExpenseItem gasto={item} />
         )} 

    ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum gasto ainda!</Text>
            <Text style={styles.emptySubText}>toque no botão abaixo para adicionar</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Text style={styles.fabText}>+ novo gasto</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f0ede8',
    padding: 16,
  },
  totalCard: {
    backgroundColor: '#f0ede8',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center', 
    marginBottom: 16,
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4, 
  },
  totalLabel: {
    fontSize: 12,
    color: '#9e9891',
    letterSpacing: 1,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '600',
    color: '#5a5550',
    marginTop: 4,
  },
  totalSub: {
    fontSize: 12,
    color: '#b5a8d4',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#9e9891',
  },
  emptySubText: {
    fontSize: 13,
    color: '#b5b0aa',
    marginTop: 8,
  },
  fab: {
    position: 'absolute', 
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#f0ede8',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  fabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8a7fc0',
  },
});