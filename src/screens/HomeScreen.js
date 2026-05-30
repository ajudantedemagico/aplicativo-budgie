import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { listarGastos, excluirGasto } from '../database/database';
import ExpenseItem from '../components/ExpenseItem';

const CATEGORIAS_FILTRO = [
  { nome: 'todas',       icone: 'filter-outline',               cor: '#f0ede8', corIcone: '#9e9891' },
  { nome: 'alimentação', icone: 'food-fork-drink',               cor: '#fde8ef', corIcone: '#EF72A8' },
  { nome: 'transporte',  icone: 'bus',                           cor: '#e8f0fd', corIcone: '#5b7ac4' },
  { nome: 'lazer',       icone: 'gamepad-variant-outline',       cor: '#fdf4e8', corIcone: '#c49d5b' },
  { nome: 'estudos',     icone: 'book-open-outline',             cor: '#edfde8', corIcone: '#5bc47a' },
  { nome: 'moradia',     icone: 'home-outline',                  cor: '#f0e8fd', corIcone: '#8a5bc4' },
  { nome: 'saúde',       icone: 'heart-pulse',                   cor: '#e8fdfa', corIcone: '#5bb4c4' },
  { nome: 'roupas',      icone: 'hanger',                        cor: '#fde8f4', corIcone: '#c45b9a' },
  { nome: 'outros',      icone: 'dots-horizontal-circle-outline',cor: '#f5f5f5', corIcone: '#9e9891' },
];

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

export default function HomeScreen({ navigation }) {

  const [gastos, setGastos] = useState([]);

  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');

  
  const [mesFiltro, setMesFiltro] = useState(new Date().getMonth());
  const [anoFiltro, setAnoFiltro] = useState(new Date().getFullYear());

  const carregarGastos = () => {
    const resultado = listarGastos();
    setGastos(resultado);
  };

  useEffect(() => {
    carregarGastos();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarGastos);
    return unsubscribe;
  }, [navigation]);

  const mesAnterior = () => {
    if (mesFiltro === 0) {
      setMesFiltro(11);
      setAnoFiltro(anoFiltro - 1);
    } else {
      setMesFiltro(mesFiltro - 1);
    }
  };

  const proximoMes = () => {
    if (mesFiltro === 11) {
      setMesFiltro(0);
      setAnoFiltro(anoFiltro + 1);
    } else {
      setMesFiltro(mesFiltro + 1);
    }
  };

  const gastosFiltrados = gastos.filter((gasto) => {

    const partes = gasto.data.split('/');
    const mesGasto = parseInt(partes[1]) - 1; 
    const anoGasto = parseInt(partes[2]);
    const mesOk = mesGasto === mesFiltro && anoGasto === anoFiltro;
    const catOk = categoriaFiltro === 'todas' || gasto.categoria === categoriaFiltro;
    return mesOk && catOk;
  });

  const total = gastosFiltrados.reduce((soma, item) => soma + item.valor, 0);

  const confirmarExclusao = (id, descricao) => {
    Alert.alert(
      'excluir gasto',
      `deseja excluir "${descricao}"?`,
      [
        { text: 'cancelar', style: 'cancel' },
        {
          text: 'excluir',
          style: 'destructive', 
          onPress: () => {
            excluirGasto(id);
            carregarGastos(); 
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* Navegação de mês */}
      <View style={styles.mesFiltro}>
        <TouchableOpacity style={styles.setaMes} onPress={mesAnterior}>
          <MaterialCommunityIcons name="chevron-left" size={22} color="#5a5550" />
        </TouchableOpacity>

        <Text style={styles.mesTexto}>
          {MESES[mesFiltro]} {anoFiltro}
        </Text>

        <TouchableOpacity style={styles.setaMes} onPress={proximoMes}>
          <MaterialCommunityIcons name="chevron-right" size={22} color="#5a5550" />
        </TouchableOpacity>
      </View>

      {/* Card do total */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>total do mês</Text>
        <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        <Text style={styles.totalSub}>✦ {gastosFiltrados.length} registros</Text>
      </View>

      {/* Filtro de categorias — lista horizontal */}
      <FlatList
        horizontal 
        showsHorizontalScrollIndicator={false} 
        data={CATEGORIAS_FILTRO}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => {
          const ativo = categoriaFiltro === item.nome;
          return (
            <TouchableOpacity
              style={[
                styles.chipFiltro,
                ativo ? styles.chipFiltroAtivo : null,
                { backgroundColor: item.cor },
              ]}
              onPress={() => setCategoriaFiltro(item.nome)}
            >
              <MaterialCommunityIcons name={item.icone} size={14} color={item.corIcone} />
              <Text style={[styles.chipFiltroTexto, { color: item.corIcone }]}>
                {' '}{item.nome}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.chipsFiltroContainer}
        style={styles.chipsFiltroLista}
      />

      {/* Lista de gastos filtrados */}
      <FlatList
        data={gastosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          
          <ExpenseItem
            gasto={item}
            onExcluir={() => confirmarExclusao(item.id, item.descricao)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="bird" size={48} color="#d8d4ce" />
            <Text style={styles.emptyText}>nenhum gasto aqui!</Text>
            <Text style={styles.emptySubText}>toque em + para adicionar</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <MaterialCommunityIcons name="plus" size={20} color="#8a7fc0" />
        <Text style={styles.fabText}>novo gasto</Text>
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
  mesFiltro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  setaMes: {
    backgroundColor: '#f0ede8',
    borderRadius: 10,
    padding: 6,
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  mesTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5a5550',
  },
  totalCard: {
    backgroundColor: '#f0ede8',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  totalLabel: {
    fontSize: 11,
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
  chipsFiltroLista: {
    marginBottom: 12,
  },
  chipsFiltroContainer: {
    gap: 8,
    paddingRight: 16,
  },
  chipFiltro: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  chipFiltroAtivo: {
    shadowOffset: { width: -1, height: -1 },
    elevation: 0,
    opacity: 0.85,
  },
  chipFiltroTexto: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    gap: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#9e9891',
  },
  emptySubText: {
    fontSize: 13,
    color: '#b5b0aa',
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
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