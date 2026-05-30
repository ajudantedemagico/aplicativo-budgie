import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const CATEGORIAS = {
  alimentação: { emoji: '🍕', cor: '#fde8ef' },
  transporte:  { emoji: '🚌', cor: '#e8f0fd' },
  lazer:       { emoji: '🎮', cor: '#fdf4e8' },
  estudos:     { emoji: '📚', cor: '#edfde8' },
  moradia:     { emoji: '🏠', cor: '#f0e8fd' },
  saúde:       { emoji: '💊', cor: '#e8fdfa' },
  outros:      { emoji: '✦',  cor: '#f5f5f5' },
};

export default function ExpenseItem({ gasto }) {

  
  const cat = CATEGORIAS[gasto.categoria] || CATEGORIAS['outros'];

  return (
    <View style={styles.container}>

      {}
      <View style={[
        styles.catDot,
        
        { backgroundColor: cat.cor }
      ]}>
        <Text style={styles.emoji}>{cat.emoji}</Text>
      </View>

      {}
      <View style={styles.info}>
        <Text style={styles.descricao}>{gasto.descricao}</Text>
        <Text style={styles.categoria}>{gasto.categoria}</Text>
      </View>

      {}
      <View style={styles.direita}>
        {}
        <Text style={styles.valor}>R$ {gasto.valor.toFixed(2)}</Text>
        <Text style={styles.data}>{gasto.data}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0ede8',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row', 
    alignItems: 'center', 
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  catDot: {
    width: 42,
    height: 42,
    borderRadius: 21, 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 18,
  },
  info: {
    flex: 1, 
  },
  descricao: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5a5550',
  },
  categoria: {
    fontSize: 11,
    color: '#9e9891',
    marginTop: 2,
  },
  direita: {
    alignItems: 'flex-end', 
  },
  valor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8a7fc0',
  },
  data: {
    fontSize: 11,
    color: '#b5b0aa',
    marginTop: 2,
  },
});