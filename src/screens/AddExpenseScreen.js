import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView, Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { inserirGasto } from '../database/database';
import { cores, fontes, neumorfico, neumorficoPequeno, neumorficoPressionado } from '../styles/styles';

const CATEGORIAS = [
  { nome: 'alimentação', icone: 'food-fork-drink',                cor: '#fde8ef', corIcone: '#c45b7a' },
  { nome: 'transporte',  icone: 'bus',                            cor: '#e8f0fd', corIcone: '#5b7ac4' },
  { nome: 'lazer',       icone: 'gamepad-variant-outline',        cor: '#fdf4e8', corIcone: '#c49d5b' },
  { nome: 'estudos',     icone: 'book-open-outline',              cor: '#edfde8', corIcone: '#5bc47a' },
  { nome: 'moradia',     icone: 'home-outline',                   cor: '#f0e8fd', corIcone: '#8a5bc4' },
  { nome: 'saúde',       icone: 'heart-pulse',                    cor: '#e8fdfa', corIcone: '#5bb4c4' },
  { nome: 'roupas',      icone: 'hanger',                         cor: '#fde8f4', corIcone: '#c45b9a' },
  { nome: 'outros',      icone: 'dots-horizontal-circle-outline', cor: '#f5f5f5', corIcone: '#9e9891' },
];

export default function AddExpenseScreen({ navigation }) {

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const salvarGasto = () => {
    if (!descricao || !valor || !categoriaSelecionada) {
      Alert.alert('atenção 🦜', 'preencha todos os campos!');
      return;
    }

    const valorNumerico = parseFloat(valor.replace(',', '.'));

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('atenção 🦜', 'informe um valor válido maior que zero!');
      return;
    }

    const dataFormatada = data.toLocaleDateString('pt-BR');

    inserirGasto({ descricao, categoria: categoriaSelecionada, valor: valorNumerico, data: dataFormatada });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Descrição */}
      <Text style={styles.label}>descrição</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ex: almoço no restaurante"
          placeholderTextColor="#c5c0bc"
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      {/* Valor */}
      <Text style={styles.label}>valor (R$)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          placeholderTextColor="#c5c0bc"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />
      </View>

      {/* Data */}
      <Text style={styles.label}>data</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setMostrarCalendario(true)}
      >
        <View style={styles.dataButton}>
          <MaterialCommunityIcons name="calendar-outline" size={18} color={cores.textoSuave} />
          <Text style={styles.dataText}>{data.toLocaleDateString('pt-BR')}</Text>
        </View>
      </TouchableOpacity>

      {mostrarCalendario && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(evento, dataSelecionada) => {
            setMostrarCalendario(false);
            if (dataSelecionada) setData(dataSelecionada);
          }}
        />
      )}

      {/* Categoria */}
      <Text style={styles.label}>categoria</Text>
      <View style={styles.chipsContainer}>
        {CATEGORIAS.map((cat) => {
          const selecionada = categoriaSelecionada === cat.nome;
          return (
           <TouchableOpacity
  key={cat.nome}
  style={[
    styles.chip,
    {
      backgroundColor: selecionada ? cat.corIcone + '22' : cat.cor,
      borderWidth: selecionada ? 1.5 : 0,
      borderColor: selecionada ? cat.corIcone : 'transparent',
    },
    selecionada ? neumorficoPressionado : neumorficoPequeno,
  ]}
  onPress={() => setCategoriaSelecionada(cat.nome)}
>
  <MaterialCommunityIcons
    name={selecionada ? 'check-circle' : cat.icone}
    size={16}
    color={cat.corIcone}
  />
  <Text style={[styles.chipText, { color: cat.corIcone }]}> {cat.nome}</Text>
</TouchableOpacity>
          );
        })}
      </View>

      {/* Botão salvar */}
      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarGasto}>
        <MaterialCommunityIcons name="check" size={18} color="#ffffff" />
        <Text style={styles.botaoSalvarText}>salvar gasto</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: 16,
  },
  label: {
    fontSize: 11,
    fontFamily: fontes.normal,
    color: cores.textoSuave,
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 16,
  },
  inputContainer: {
    backgroundColor: cores.fundo,
    borderRadius: 12,
    ...neumorficoPressionado,
  },
  input: {
    padding: 14,
    fontSize: 15,
    fontFamily: fontes.normal,
    color: cores.texto,
  },
  dataButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 14,
  },
  dataText: {
    fontSize: 15,
    fontFamily: fontes.normal,
    color: cores.texto,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 13,
    fontFamily: fontes.normal,
    fontWeight: '500',
  },
  botaoSalvar: {
    backgroundColor: cores.roxo,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    shadowColor: '#8a7fc0',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoSalvarText: {
    fontSize: 15,
    fontFamily: fontes.negrito,
    color: '#ffffff',
  },
});