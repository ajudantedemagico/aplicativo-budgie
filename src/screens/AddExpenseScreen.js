import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,       // campo de texto — equivale ao <input> do HTML
  TouchableOpacity,
  StyleSheet,
  Alert,           // exibe popups de alerta nativos do celular
  ScrollView,      // permite rolar a tela quando o teclado abre
} from 'react-native';

import { inserirGasto } from '../database/database';

// Lista de categorias disponíveis para o usuário escolher
const CATEGORIAS = [
  { nome: 'alimentação', emoji: '🍕', cor: '#fde8ef' },
  { nome: 'transporte',  emoji: '🚌', cor: '#e8f0fd' },
  { nome: 'lazer',       emoji: '🎮', cor: '#fdf4e8' },
  { nome: 'estudos',     emoji: '📚', cor: '#edfde8' },
  { nome: 'moradia',     emoji: '🏠', cor: '#f0e8fd' },
  { nome: 'saúde',       emoji: '💊', cor: '#e8fdfa' },
  { nome: 'outros',      emoji: '✦',  cor: '#f5f5f5' },
];

export default function AddExpenseScreen({ navigation }) {

  // Um estado para cada campo do formulário
  // Começam como string vazia — o campo aparece vazio para o usuário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  // Categoria começa como null — nenhuma selecionada
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  // Função executada quando o usuário toca em "salvar"
  const salvarGasto = () => {

    // Validação — verifica se todos os campos foram preenchidos
    if (!descricao || !valor || !data || !categoriaSelecionada) {
      // Alert.alert exibe um popup nativo do celular
      Alert.alert('atenção', 'preencha todos os campos!');
      return; // interrompe a função aqui se houver campo vazio
    }

    // parseFloat converte a string do TextInput para número decimal
    const valorNumerico = parseFloat(valor.replace(',', '.'));
    // replace(',', '.') permite o usuário digitar vírgula ou ponto

    // Validação do valor
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('atenção', 'informe um valor válido maior que zero!');
      return;
    }

    // Monta o objeto gasto com todos os dados
    const gasto = {
      descricao: descricao,
      categoria: categoriaSelecionada,
      valor: valorNumerico,
      data: data,
    };

    // Salva no banco de dados
    inserirGasto(gasto);

    // Volta automaticamente para a tela anterior (HomeScreen)
    // goBack() é como apertar o botão voltar
    navigation.goBack();
  };

  return (
    // ScrollView permite rolar a tela — útil quando o teclado aparece
    <ScrollView style={styles.container}>

      {/* Campo de descrição */}
      <Text style={styles.label}>descrição</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          // placeholder = texto cinza que aparece quando o campo está vazio
          placeholder="ex: almoço no restaurante"
          placeholderTextColor="#c5c0bc"
          // value conecta o TextInput ao estado
          value={descricao}
          // onChangeText atualiza o estado a cada letra digitada
          onChangeText={setDescricao}
        />
      </View>

      {/* Campo de valor */}
      <Text style={styles.label}>valor (R$)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          placeholderTextColor="#c5c0bc"
          value={valor}
          onChangeText={setValor}
          // keyboardType numérico abre o teclado de números no celular
          keyboardType="numeric"
        />
      </View>

      {/* Campo de data */}
      <Text style={styles.label}>data</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/aaaa"
          placeholderTextColor="#c5c0bc"
          value={data}
          onChangeText={setData}
        />
      </View>

      {/* Seleção de categoria */}
      <Text style={styles.label}>categoria</Text>
      <View style={styles.chipsContainer}>
        {/* map percorre o array de categorias e renderiza um chip para cada uma */}
        {CATEGORIAS.map((cat) => {

          // Verifica se essa categoria está selecionada
          const selecionada = categoriaSelecionada === cat.nome;

          return (
            <TouchableOpacity
              key={cat.nome} // key é obrigatório em listas — ajuda o React a identificar cada item
              style={[
                styles.chip,
                // Se selecionada, aplica estilo de chip ativo (afundado)
                selecionada ? styles.chipAtivo : null,
                // Cor de fundo vem da categoria
                { backgroundColor: cat.cor },
              ]}
              onPress={() => setCategoriaSelecionada(cat.nome)}
            >
              <Text style={styles.chipText}>
                {cat.emoji} {cat.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botão salvar */}
      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarGasto}>
        <Text style={styles.botaoSalvarText}>✦ salvar gasto</Text>
      </TouchableOpacity>

      {/* Espaço no final para o botão não ficar colado na borda */}
      <View style={{ height: 40 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ede8',
    padding: 16,
  },
  label: {
    fontSize: 11,
    color: '#9e9891',
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 16,
  },
  inputContainer: {
    backgroundColor: '#f0ede8',
    borderRadius: 12,
    // sombra "afundada" — invertida em relação ao card normal
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 0,
  },
  input: {
    padding: 14,
    fontSize: 15,
    color: '#5a5550',
  },
  chipsContainer: {
    flexDirection: 'row',  // chips em linha
    flexWrap: 'wrap',      // quebra para a linha de baixo se não couber
    gap: 8,                // espaço entre os chips
    marginTop: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  chipAtivo: {
    // sombra invertida = efeito de "afundado" quando selecionado
    shadowOffset: { width: -1, height: -1 },
    elevation: 0,
    opacity: 0.85,
  },
  chipText: {
    fontSize: 13,
    color: '#5a5550',
    fontWeight: '500',
  },
  botaoSalvar: {
    backgroundColor: '#f0ede8',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  botaoSalvarText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8a7fc0',
  },
});