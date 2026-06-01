
# budgie
### controle de gastos pessoais

*um app fofinho para registrar e acompanhar seus gastos*

---

## ✦ sobre o projeto

O **budgie** é um aplicativo mobile de controle de gastos pessoais desenvolvido com React Native e Expo. Com uma interface minimalista e kawaii, o app permite registrar, categorizar e visualizar seus gastos de forma simples e bonita.

Desenvolvido como projeto avaliativo do curso de tecnologia da **FATEC — Miguel Reale**, sob orientação do **Prof. Jonatas Santos de Souza**.

---

## ✦ funcionalidades

- listagem de gastos por mês
- cadastro de novos gastos
- categorização com ícones
- gráfico de pizza interativo por categoria
- filtro por categoria e mês
- exclusão de gastos com confirmação
- persistência local com SQLite
- seleção de data com calendário nativo

---

## ✦ tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo SDK 52](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [Expo Google Fonts — Klee One](https://github.com/expo/google-fonts)
- [MaterialCommunityIcons](https://icons.expo.fyi/)

---

## ✦ como executar o projeto

### pré-requisitos

- [Node.js](https://nodejs.org/)
- [Expo Go](https://expo.dev/go) instalado no celular

### passo a passo

```bash
# clone o repositório
git clone https://github.com/ajudantedemagico/aplicativo-budgie

# entre na pasta
cd aplicativo-budgie

# instale as dependências
npm install --legacy-peer-deps

# inicie o projeto
npx expo start
```

Escaneie o QR code com o **Expo Go** no celular e o app abrirá automaticamente.

---

## ✦ estrutura do projeto

src/
├── screens/
│   ├── HomeScreen.js        # tela inicial com listagem e filtros
│   ├── AddExpenseScreen.js  # tela de cadastro de gastos
│   └── AboutScreen.js       # tela sobre o projeto
├── components/
│   ├── ExpenseItem.js       # componente de cada item da lista
│   └── ExpenseChart.js      # gráfico de pizza interativo
├── database/
│   └── database.js          # configuração e funções do SQLite
├── navigation/
│   └── routes.js            # configuração das rotas
└── styles/
└── styles.js            # cores, fontes e estilos globais


### feito com ♡ e muito café
