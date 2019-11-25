# Crafted Jewellers

Jerjis's Jewellery Store. An attempt to bring my father's jewellery business online.

Hosted on [craftedjewellers.in](https://craftedjewellers.in/)

## Usage

### Node

`10.16.3` or a greator version of node is supported

We also have a `.nvmrc` file that you can use if you have [nvm](https://github.com/nvm-sh/nvm). It will automatically select the node version for you

```Node
nvm use
```

### Installation

Run the following commands after cloning the repository

```Node
npm i
npm run dev
```

### Bundle Analyzer

Run the following command

```Node
npm run analyze
```

Check the path `.next/analyze` for `client.html` and `server.html`. Open these files in a browser to analyze the bundle sizes.

### ESLint

Run the following command

```Node
npm run lint
```

It will output the errors / warnings / info in the console if they exist.

### MongoDB

Install [MongoDB](https://www.mongodb.com/)

You may use any tool to view the documents.
Ideal tool [MongoDB Compass](https://www.mongodb.com/products/compass)

Ensure you have mongoDB service running for local connections

Upon running the server info / error / warning logs will be visible.

## IDE - Highly Recommended

1. [Visual Studio Code](https://code.visualstudio.com/)

## VSC Plugins

1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4. [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
