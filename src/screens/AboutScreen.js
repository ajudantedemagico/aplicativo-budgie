import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { cores, fontes, neumorfico, neumorficoPequeno } from '../styles/styles';

export default function AboutScreen() {

  const abrirGithub = () => {
    Linking.openURL('https://github.com/ajudantedemagico');
  };

  return (
    <View style={styles.container}>

      {/* Card principal */}
      <View style={styles.card}>

        {/* Avatar emoji */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>🪄</Text>
        </View>

        <Text style={styles.nome}>Ajudante de Mágico</Text>

        {/* Botão GitHub */}
        <TouchableOpacity style={styles.githubBtn} onPress={abrirGithub}>
          <Text style={styles.githubTexto}>✦ github.com/ajudantedemagico</Text>
        </TouchableOpacity>

      </View>

      {/* Card da faculdade */}
      <View style={styles.card}>
        <Text style={styles.secaoLabel}>orientador</Text>
        <Text style={styles.secaoTexto}>Prof. Jonatas Santos de Souza</Text>

        <View style={styles.divisor} />

        <Text style={styles.secaoLabel}>instituição</Text>
        <Text style={styles.secaoTexto}>Faculdade de Tecnologia</Text>
        <Text style={styles.secaoDestaque}>FATEC — Miguel Reale</Text>
      </View>

      {/* Rodapé */}
      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>feito com ♡ e muito café</Text>
        <Text style={styles.rodapeTexto}>budgie - controle de gastos © 2026</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: cores.fundo,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    ...neumorfico,
  },
  avatarContainer: {
    backgroundColor: cores.fundo,
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...neumorfico,
  },
  avatarEmoji: {
    fontSize: 48,
  },
  nome: {
    fontSize: 22,
    fontFamily: fontes.negrito,
    color: cores.texto,
    marginBottom: 12,
  },
  githubBtn: {
    backgroundColor: cores.fundo,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...neumorficoPequeno,
  },
  githubTexto: {
    fontSize: 13,
    fontFamily: fontes.normal,
    color: cores.roxo,
  },
  divisor: {
    width: '80%',
    height: 1,
    backgroundColor: '#e8e4de',
    marginVertical: 12,
  },
  secaoLabel: {
    fontSize: 10,
    fontFamily: fontes.normal,
    color: cores.textoSuave,
    letterSpacing: 1,
    marginBottom: 4,
  },
  secaoTexto: {
    fontSize: 15,
    fontFamily: fontes.normal,
    color: cores.texto,
    textAlign: 'center',
  },
  secaoDestaque: {
    fontSize: 16,
    fontFamily: fontes.negrito,
    color: cores.roxo,
    textAlign: 'center',
    marginTop: 2,
  },
  rodape: {
    alignItems: 'center',
    gap: 4,
  },
  rodapeTexto: {
    fontSize: 12,
    fontFamily: fontes.normal,
    color: cores.textoMini,
  },
});