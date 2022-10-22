# app
Aplicativo de aprendizagem pela b7web

Devida as novas atualizaçoes do NodeJs e React-Native tive que realizar um downgrade para utilizar os mesmo componentes e modulos.
> **npm install -g react-native-cli @react-native-community/cli** 

foi necessario instalar. A versão mais nova recomenda o contrario remover para evitar quaisquer problemas de compatibilidade
> npx react-native init AwesomeProject --version ** 0.63.2**

posteriormente salvei versão 16.8.6 entrando dentro do diretorio criado do projeto e executando o comando abaixo
> projeto\app
> npm install --save **react@16.8.6** **react-dom@16.8.6**

procedimento necessario devido a componentes depreciados como **styled-components: 5.1.1**
