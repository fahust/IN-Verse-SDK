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

La SDK inverse, permet de créer des jetons ERC721 , ERC721A, ERC1155, et de les mettre en vente dans des enchères ou des ventes directes.
Chaque jeton reste paramétrable et peut être vendu sur les plateformes les plus connues telles que opensea, rarible...


## 🏁 Getting Started <a name = "getting_started"></a>

Il vous faudra obligatoirement vous inscrire sur nos serveurs, vous pourrez le faire depuis notre plateforme ou bien directement sur la sdk





### Prerequisites

Vous aurez besoin de node et npm.

- [Node JS](https://nodejs.org/en/download/)





### Installing

L'installation se fait de façon très simple, ouvrez un terminal dans la racine de votre projet puis copier la ligne suivante :

```javascript
npm i @fahust/test-inverse-react-lib
```







## 🎈 Usage <a name="usage"></a>

Pour utiliser notre package, vous devrez d'abord importer la librairie dans vos composant react :

```javascript
import { InVerseSdk } from '@fahust/test-inverse-react-lib';
```

Puis instancier le SDK de la manière suivante :

```javascript
sdk = new InVerseSdk()
```

___

### Connection Web3
Connection vers le wallet de votre choix.
À la connections si votre wallet n'est pas enregistrer sur nos serveurs, elle sera donc immédiatement enregistrée.

```javascript
sdk.connectWeb3()
```

___

À partir de ce moment, vous pourrez renseigner des paramètres utilisateurs en envoyant le tableau suivant.


```javascript
//ACCOUNT_OBJECT
{
  username:"",
  password:"",
  ...
}
```

Ses informations seront gardées sur nos serveurs.

```javascript
sdk.updateMyAccount(ACCOUNT_OBJECT);
```

### Création d'un smart contract de market place
Création d'un smart contract maketplace.sol
Ce contrat nécessitera de n'être créé qu'une seule fois, mais est obligatoire pour la suite.
L'adresse du contrat ainsi créé sera définitivement reliée à votre compte sur nos serveurs.

```typescript
sdk.createMarketPlaceContractBySign()
```


___
### Création d'un smart contract de token
Création d'un smart contract token, parmis les choix suivant ERC721 , ERC721A, ERC1155.
Ces contrats de tokens pourront être créé autant de fois que vous le voudrez pour ajouter des collections.
Pour vous permettre des frais de gaz minimum, nous enregistrons les adresses de ses contrats directement sur nos serveurs.
Attention, le nom et le symbole sont immuables, réfléchissez bien avant de créer votre contrat.
À la création du contrat, des metadatas du token sont enregistré sur ipfs ainsi que sur nos serveurs ainsi que les signatures ECDSA.

```typescript
sdk.createTokenContractBySign(CONTRACT_NAME:string,CONTRACT_SYMBOL:string,BASE_URI:string:optional)
```

### Connection Smart Contract
Connections vers le smart contract créé au préalable par nos utilisateurs.
Envoi une requête vers nos serveurs pour récupérer l'adresse du smart contract lié a votre adresse de wallet.


```javascript
sdk.getMyAddressMarketPlace()
```

Pour récupérer vos adresses de smart contract de token créer vous devrez appeler cette fonction vers le serveur qui vous renverra un tableau d'adresse :

```javascript
sdk.getMyAddressTokens().then((res)=>{return ArrayOfAddress = res}).catch((err)=>{return err})
```

Pour faire des modifications sur votre marketplace, rajouter des auctions, les paramétrer puis les liés a vos collections de token vous devrez rajouter l'adresse du market place dans la SDK :

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

## Method static
Ou bien vous pouvez utiliser les méthodes suivante de façon statique 

### Method TOKEN

```javascript
//Permet un mint de plusieurs token (max 100 pour erc721 et erc1155, max 1000 pour le erc721A)
sdk.mint(NUMBER_OF_MINT,ADDRESS_CONTRACT_TOKEN)//only owner
```

```javascript
sdk.getAllNft(ADDRESS_CONTRACT_TOKEN).then((res)=>{return ArrayOfNFTs = res}).catch((err)=>{return err})
```

```javascript
//Utilise ECDSA pour enregistrer les addresse whitelisté vers le serveur
sdk.addWhitelist(ADDRESS_WHITELISTED,ADDRESS_CONTRACT_TOKEN)
sdk.removeWhitelist(ADDRESS_WHITELISTED,ADDRESS_CONTRACT_TOKEN)
sdk.isWhitelisted(ADDRESS_WHITELISTED,ADDRESS_CONTRACT_TOKEN).then((res)=>{return res}).catch((err)=>{return err})
sdk.getWhitelist(ADDRESS_CONTRACT_TOKEN).then((res)=>{return ArrayOfWhitelisted = res}).catch((err)=>{return err})
```

```javascript
//Donne l'opportunité a un client de faire une offre sur un de vos NFT
sdk.sendOffer(WEI_VALUE,ID_TOKEN,ADDRESS_CONTRACT_TOKEN)

//validé une offre faite (une seul offre peut être validé et vous ne pourrez pas revenir en arrière)
sdk.validOffer(OFFER_ID,ID_TOKEN,ADDRESS_CONTRACT_TOKEN)//only owner
sdk.cancelOffer(OFFER_ID,ID_TOKEN,ADDRESS_CONTRACT_TOKEN)//only owner or sender
sdk.getAllOffer(ID_TOKEN,ADDRESS_CONTRACT_TOKEN).then((res)=>{return ArrayOfOffers = res}).catch((err)=>{return err})

//Une fois une offre validé, permet aux client de recevoir son NFT en échange 
sdk.buy(WEI_VALUE,ID_TOKEN,ADDRESS_CONTRACT_TOKEN)//only sender
```



### Method MARKETPLACE


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
sdk.startAuction()//onlyOwner
sdk.getAuction().then((res)=>{return AuctionObject = res}).catch((err)=>{return err})
//Mettre fin a une vente aux enchères enverra les NFTs aux gagnant et enverra le dépot du gagnant aux royalties
//Pour une optimisation maximal de frais de gaz nous transférons les datas de l'auction fermé vers nos serveurs
sdk.closeAuction()//onlyOwner or winner ?
//Une vente aux enchère ne peut être annulé qu'avant le démarage de cet derniète
sdk.cancelAuction()//onlyOwner
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
