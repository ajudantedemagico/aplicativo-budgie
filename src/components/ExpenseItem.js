import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CATEGORIAS = {
  alimentação: { icone: 'food-fork-drink',                cor: '#fde8ef', corIcone: '#c45b7a' },
  transporte:  { icone: 'bus',                            cor: '#e8f0fd', corIcone: '#5b7ac4' },
  lazer:       { icone: 'gamepad-variant-outline',        cor: '#fdf4e8', corIcone: '#c49d5b' },
  estudos:     { icone: 'book-open-outline',              cor: '#edfde8', corIcone: '#5bc47a' },
  moradia:     { icone: 'home-outline',                   cor: '#f0e8fd', corIcone: '#8a5bc4' },
  saúde:       { icone: 'heart-pulse',                    cor: '#e8fdfa', corIcone: '#5bb4c4' },
  roupas:      { icone: 'hanger',                         cor: '#fde8f4', corIcone: '#c45b9a' },
  outros:      { icone: 'dots-horizontal-circle-outline', cor: '#f5f5f5', corIcone: '#9e9891' },
};

// Agora recebe também onExcluir — a função de excluir vinda do HomeScreen
export default function ExpenseItem({ gasto, onExcluir }) {

  const cat = CATEGORIAS[gasto.categoria] || CATEGORIAS['outros'];

  return (
    <View style={styles.container}>

      <View style={[styles.catDot, { backgroundColor: cat.cor }]}>
        <MaterialCommunityIcons name={cat.icone} size={20} color={cat.corIcone} />
      </View>

      <View style={styles.info}>
        <Text style={styles.descricao}>{gasto.descricao}</Text>
        <Text style={styles.categoria}>{gasto.categoria}</Text>
      </View>

      <View style={styles.direita}>
        <Text style={styles.valor}>R$ {gasto.valor.toFixed(2)}</Text>
        <Text style={styles.data}>{gasto.data}</Text>
      </View>

      {/* Botão de excluir — chama a função onExcluir ao tocar */}
      <TouchableOpacity style={styles.excluirBtn} onPress={onExcluir}>
        <MaterialCommunityIcons name="trash-can-outline" size={18} color="#d4a0b0" />
      </TouchableOpacity>

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
    marginRight: 10,
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
  excluirBtn: {
    padding: 6,
  },
});