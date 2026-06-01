import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { cores, fontes } from '../styles/styles';

const CORES_GRAFICO = {
  alimentação: '#f7c5d5',
  transporte:  '#c5d5f7',
  lazer:       '#f7e8c5',
  estudos:     '#c5f7d5',
  moradia:     '#e0c5f7',
  saúde:       '#c5f7f0',
  roupas:      '#f7c5ee',
  outros:      '#e0e0e0',
};

export default function ExpenseChart({ gastos }) {

  const [fatiaAtiva, setFatiaAtiva] = useState(null);

  if (!gastos || gastos.length === 0) return null;

 
  const porCategoria = gastos.reduce((acc, gasto) => {
    acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.valor;
    return acc;
  }, {});

  const categorias = Object.entries(porCategoria).map(([nome, valor]) => ({
    nome,
    valor,
    cor: CORES_GRAFICO[nome] || '#e0e0e0',
  }));

  const totalGeral = categorias.reduce((soma, cat) => soma + cat.valor, 0);

  // Dimensões do gráfico
  const tamanho = 200;      
  const centro = tamanho / 2; 
  const raio = 75;           
  const raioBuraco = 45;    

  const polarParaCartesiano = (angulo, r) => {
    const rad = (angulo - 90) * (Math.PI / 180); 
    return {
      x: centro + r * Math.cos(rad),
      y: centro + r * Math.sin(rad),
    };
  };

  const gerarFatia = (anguloInicio, anguloFim, r, rb) => {
    const eCirculoCompleto = anguloFim - anguloInicio >= 359.99;
    if (eCirculoCompleto) {
      return `
        M ${centro - r} ${centro}
        A ${r} ${r} 0 1 1 ${centro + r} ${centro}
        A ${r} ${r} 0 1 1 ${centro - r} ${centro}
        M ${centro - rb} ${centro}
        A ${rb} ${rb} 0 1 0 ${centro + rb} ${centro}
        A ${rb} ${rb} 0 1 0 ${centro - rb} ${centro}
        Z
      `;
    }

    const externo1 = polarParaCartesiano(anguloInicio, r);
    const externo2 = polarParaCartesiano(anguloFim, r);
    const interno1 = polarParaCartesiano(anguloInicio, rb);
    const interno2 = polarParaCartesiano(anguloFim, rb);

    const arcoGrande = anguloFim - anguloInicio > 180 ? 1 : 0;

    
    return `
      M ${externo1.x} ${externo1.y}
      A ${r} ${r} 0 ${arcoGrande} 1 ${externo2.x} ${externo2.y}
      L ${interno2.x} ${interno2.y}
      A ${rb} ${rb} 0 ${arcoGrande} 0 ${interno1.x} ${interno1.y}
      Z
    `;
  };

  let anguloAtual = 0;
  const fatias = categorias.map((cat) => {
    const angulo = (cat.valor / totalGeral) * 360;
    const fatia = {
      ...cat,
      anguloInicio: anguloAtual,
      anguloFim: anguloAtual + angulo,
      porcentagem: ((cat.valor / totalGeral) * 100).toFixed(1),
    };
    anguloAtual += angulo;
    return fatia;
  });

  const ativa = fatiaAtiva
    ? fatias.find((f) => f.nome === fatiaAtiva)
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>distribuição de gastos</Text>

      <View style={styles.graficoRow}>

        {/* SVG do gráfico donut */}
        <Svg width={tamanho} height={tamanho}>
          <G>
            {fatias.map((fatia) => (
              <Path
                key={fatia.nome}
                d={gerarFatia(fatia.anguloInicio, fatia.anguloFim, raio, raioBuraco)}
                fill={fatia.cor}
                scale={fatiaAtiva === fatia.nome ? 1.05 : 1}
                origin={`${centro}, ${centro}`}
                onPress={() =>
                  setFatiaAtiva(fatiaAtiva === fatia.nome ? null : fatia.nome)
                }
              />
            ))}

            {/* Texto no centro do grafico */}
            {ativa ? (
              <>
                {}
                <G>
                  <Path
                    d={`M ${centro} ${centro - 16} L ${centro} ${centro - 16}`}
                    stroke="none"
                  />
                </G>
              </>
            ) : null}
          </G>
        </Svg>

        {}
        <View style={styles.centroTexto} pointerEvents="none">
          {ativa ? (
            <>
              <Text style={styles.centroValor}>
                R$ {ativa.valor.toFixed(2)}
              </Text>
              <Text style={styles.centroNome}>{ativa.nome}</Text>
              <Text style={styles.centroPct}>{ativa.porcentagem}%</Text>
            </>
          ) : (
            <Text style={styles.centroHint}>toque{'\n'}numa fatia</Text>
          )}
        </View>

        {/* Legenda lateral */}
        <View style={styles.legenda}>
          {fatias.map((fatia) => (
            <TouchableOpacity
              key={fatia.nome}
              style={styles.legendaItem}
              onPress={() =>
                setFatiaAtiva(fatiaAtiva === fatia.nome ? null : fatia.nome)
              }
            >
              {/* Bolinha colorida */}
              <View style={[styles.legendaDot, { backgroundColor: fatia.cor }]} />
              <View>
                <Text style={styles.legendaNome}>{fatia.nome}</Text>
                <Text style={styles.legendaPct}>{fatia.porcentagem}%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cores.fundo,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#d8d4ce',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  titulo: {
    fontSize: 11,
    fontFamily: fontes.normal,
    color: cores.textoSuave,
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },
  graficoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centroTexto: {
    position: 'absolute',
    left: 62,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    top: 62,
    height: 90,
  },
  centroValor: {
    fontSize: 12,
    fontFamily: fontes.negrito,
    color: cores.texto,
    textAlign: 'center',
  },
  centroNome: {
    fontSize: 9,
    fontFamily: fontes.normal,
    color: cores.textoSuave,
    textAlign: 'center',
    marginTop: 2,
  },
  centroPct: {
    fontSize: 11,
    fontFamily: fontes.negrito,
    color: cores.roxo,
    textAlign: 'center',
  },
  centroHint: {
    fontSize: 10,
    fontFamily: fontes.normal,
    color: cores.textoMini,
    textAlign: 'center',
  },
  legenda: {
    flex: 1,
    paddingLeft: 12,
    gap: 6,
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendaDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendaNome: {
    fontSize: 10,
    fontFamily: fontes.normal,
    color: cores.texto,
  },
  legendaPct: {
    fontSize: 9,
    fontFamily: fontes.normal,
    color: cores.textoSuave,
  },
});