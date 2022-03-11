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

La SDK inverse, permet de créer des jetons ERC721 , ERC721A, ERC1155, et de les mêttre en vente dans des enchères ou des ventes direct.
Chaque jeton reste paramètrable et peut être vendu sur les plateform les plus connues tel que opensea, rarible...


## 🏁 Getting Started <a name = "getting_started"></a>

Il vous faudra obligatoirement vous inscrire sur nos serveurs, vous pourrez le faire depuis notre plateforme ou bien directement sur la sdk





### Prerequisites

Vous avez besoin de node et npm.

- [Node JS](https://nodejs.org/en/download/)





### Installing

L'installation ce fais de façon très simple, ouvrez un terminal dans la racine de votre projet puis copier la ligne suivante

```javascript
npm i @fahust/test-inverse-react-lib
```







## 🎈 Usage <a name="usage"></a>

Pour utiliser notre package, vous devrez d'abbord importer la librarie dans vos composant react

```javascript
import { InVerseSdk } from '@fahust/test-inverse-react-lib';
```

Puis instancier le sdk de la manière suivante 

```javascript
sdk = new InVerseSdk()
```

___

### Connection Web3
Connection vers le wallet de votre choix.
A la connection si votre wallet n'est pas enregistrer sur nos serveur, elle sera donc immédiatement enregistré.

```javascript
sdk.connectWeb3()
```

___

A partir de ce moment vous pourrez renseigner des paramètres utilisateurs en envoyant le tableau suivant.
Ses informations seront garder sur nos serveurs

```javascript
//ACCOUNT_OBJECT
{
  username:"",
  password:"",
  ...
}
```

```javascript
sdk.updateMyAccount(ACCOUNT_OBJECT);
```

### Création d'un smart contract de market place
Création d'un smart contract maketplace.sol
Ce contrat ne nécessitera d'être créer une seul fois mais est obligatoire pour la suite.
L'addresse du contrat ainsi créer sera définitivement relié à votre compte sur nos serveur.

```typescript
sdk.createMarketPlaceContractBySign(CONTRACT_NAME:string,CONTRACT_SYMBOL:string,BASE_URI:string)
```


___
### Création d'un smart contract de token
Création d'un smart contract token, parmis les choix suivant ERC721 , ERC721A, ERC1155.
Ces contrats de tokens pourront être créer autant de fois que vous le voudrez pour ajouter des collections.
Pour vous permettre des frais de gaz minimum, nous enregistrons les addresse de ses contrats directement sur nos serveurs.
Attention le nom et le symbol sont immuable, réfléchissez bien avant de créer votre contrat.
A la création du contrat, des metadatas du token sont enregistré sur ipfs ainsi que sur nos serveurs ainsi que les signatures ECDSA.

```typescript
sdk.createTokenContractBySign(CONTRACT_NAME:string,CONTRACT_SYMBOL:string,BASE_URI:string:optional)
```

### Connection Smart Contract
Connection vers le smart contract créé au préalable par nos utilisateurs.
Envoi une requête vers nos serveurs pour récupérer l'addresse du smart contract lié a votre addresse de wallet.


```javascript
sdk.getMyAddressMarketPlace()
```

Pour récupérer vos address de smart contract de token créer vous devrez appelé cet fonction vers le serveur qui vous renverra un tableau d'addresse

```javascript
sdk.getMyAddressTokens()
```

Pour faire des modifications sur votre marketplace, rajouter des auctions, les paramètrer puis les lié a vos collections de token vous devrez rajouté l'addresse du market place dans la sdk

```javascript
sdk.setAddressMarketPlace(ADDRESS_MARKET_PLACE)
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

## Method TOKEN

```javascript
//Permet un mint de plusieurs token (max 100 pour erc721 et erc1155, max 1000 pour le erc721A)
sdk.mint(NUMBER_OF_MINT,ADDRESS_CONTRACT_TOKEN)//only owner
```

```javascript
sdk.getAllNft(ADDRESS_CONTRACT_TOKEN)
```

```javascript
//Utilise ECDSA pour enregistrer les addresse whitelisté vers le serveur
sdk.addWhitelist(ADDRESS_WHITELISTED,ADDRESS_CONTRACT_TOKEN)
sdk.removeWhitelist(ADDRESS_WHITELISTED,ADDRESS_CONTRACT_TOKEN)
sdk.getWhitelist(ADDRESS_WHITELISTED,ADDRESS_CONTRACT_TOKEN)
```

```javascript
//Donne l'opportunité a un client de faire une offre sur un de vos NFT
sdk.sendOffer(WEI_VALUE,ID_TOKEN,ADDRESS_CONTRACT_TOKEN)

//validé une offre faite (une seul offre peut être validé et vous ne pourrez pas revenir en arrière)
sdk.validOffer(OFFER_ID,ID_TOKEN,ADDRESS_CONTRACT_TOKEN)//only owner
sdk.cancelOffer(OFFER_ID,ID_TOKEN,ADDRESS_CONTRACT_TOKEN)//only owner or sender
sdk.getAllOffer(ID_TOKEN,ADDRESS_CONTRACT_TOKEN)

//Une fois une offre validé, permet aux client de recevoir son NFT en échange 
sdk.buy(WEI_VALUE,ID_TOKEN,ADDRESS_CONTRACT_TOKEN)//only sender
```



## Method MARKETPLACE


```javascript
//BIDDING_VALUE doit être plus élevé que l'offre d'enchère actuel
sdk.bidding(WEI_BIDDING_VALUE)
```

La création ou la mise a jour de vente nécessitera un objet de ce type :
```javascript
//OBJECT_AUCTION 
{
  timeAuction:"", //timestamp in seconds
  tokenIds: [], //array of id token
  addressOfContratToken: "", //address of contract token
  minimumPrice: "", //price minimum of bid
  royalties: [], //address of royalties
}
```

```javascript
sdk.createAuction(OBJECT_AUCTION)//onlyOwner
sdk.updateAuction(OBJECT_AUCTION)//onlyOwner
//démarrer une vente aux enchères
sdk.startAuction(WEI_BIDDING_VALUE)//onlyOwner
//Mettre fin a une vente aux enchères enverra les NFTs aux gagnant et enverra le dépot du gagnant aux royalties
//Pour une optimisation maximal de frais de gaz nous transférons les datas de l'auction fermé vers nos serveurs
sdk.closeAuction(WEI_BIDDING_VALUE)//onlyOwner or winner ?
//Une vente aux enchère ne peut être annulé qu'avant le démarage de cet derniète
sdk.cancelAuction(WEI_BIDDING_VALUE)//onlyOwner
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
