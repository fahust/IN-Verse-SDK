<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Inverse logo"></a>
</p>

<h3 align="center">@fahust/test-inverse-react-lib</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Ce package permet une communication avec les smarts contracts IN-VERSE.
    <br> 
</p>

## 🧐 About <a name = "about"></a>

Write about 1-2 paragraphs describing the purpose of your project.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.





### Prerequisites

Vous avez besoin de node et npm.

- [Node JS](https://nodejs.org/en/download/)





### Installing

L'installation ce fais de façon très simple, ouvrez un terminal dans la racine de votre projet puis copier la ligne suivante

```
npm i @fahust/test-inverse-react-lib
```







## 🎈 Usage <a name="usage"></a>

Pour utiliser notre package, vous devrez d'abbord importer la librarie dans vos composant react

```javascript
import { InVerseSdk } from '@fahust/test-inverse-react-lib';
```

Puis instancier le sdk de la manière suivante 
ADDRESS_CONTRACT est optionnel

```javascript
sdk = new InVerseSdk(ADDRESS_CONTRACT:string)
```

vous pourrez ajouter/modifier l'addresse du contrat à l'aide des fonctions suivantes

```javascript
sdk.setAddressContract(ADDRESS_CONTRACT:string)
```

___

### Connection Web3
Connection vers le wallet de votre choix

```javascript
sdk.connectWeb3()
```

___

### Création d'un smart contract
Création d'un smart contract auction et d'un smart contract de token ERC721

```typescript
sdk.createSmartContractBySign(CONTRACT_NAME:string,CONTRACT_SYMBOL:string,BASE_URI:string)
```

___

### Mise a jour du smart contract (optionnel)
Pour nous maintenir a jour en terme de sécurité et d'optimisation, nous allons mêttre a jour nos smart contract.
Vous pourrez choisir de mêttre a jour grace a cet fonction.
Le smart contract des tokens lui ne sera jamais mis a jour pour éviter toutes pertes de token.
Vos paramètres seront conservé lors de la mise a jour du contrat.

```typescript
sdk.updateContract()
```

___

### Connection Smart Contract
Connection vers le smart contract créé au préalable par nos utilisateurs

**Paramètre nécessaire :**
- l'addresse du contrat (ADDRESS_CONTRACT)

```javascript
sdk.connectSmartContract()
```






## 🔧 Method <a name="usage"></a>



### Method Dynamic
Vous pouvez faire appels a toutes les fonctions du smart contract a l'aide de notre composant Method

**Connection au smart contract nécessaire**

```javascript
sdk.method(NAME_METHOD,SEND_VALUE,ARGUMENT)
```

**Argument requis :**
- NAME_METHOD => le nom de la méthode exact du smart contract que vous désirez appeler
**Argument optionel :**
- SEND_VALUE => La valeur en eth que vous désirez envoyé vers le smart contract
- ARGUMENT => les arguments nécessaire a la fonction, sous forme de tableau, un élément pour chaque valeur

**Exemple :**

```javascript
sdk.method(mint,"1000000",[10,"10","test"])
```

___

### Method static
Ou bien vous pouvez utiliser les méthodes suivante de façon statique 

```javascript
sdk.mint(NUMBER_OF_MINT)
```
```javascript
sdk.getAllNft()
```
```javascript
//BIDDING_VALUE must be greater than current bid
sdk.bidding(BIDDING_VALUE)
```
```javascript
sdk.buy(VALUE)
```





## ⛏️ Built Using <a name = "built_using"></a>

- [Typescript](https://www.typescriptlang.org/) - Tooling 
- [NodeJs](https://nodejs.org/en/) - Server Environment





## ✍️ Authors <a name = "authors"></a>

- [@fahust](https://github.com/kylelobo) - Initial work





## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
