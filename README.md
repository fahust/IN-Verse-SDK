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

La SDK inverse, permet de créer des jetons <strong>ERC721</strong> , <strong>ERC721A</strong>, <strong>ERC1155</strong>, et de les mettre en vente dans des <strong>enchères</strong> ou des <strong>ventes directes</strong>.
Chaque jeton reste paramétrable et peut être vendu sur les plateformes les plus connues telles que <strong>opensea</strong>, <strong>rarible</strong>...


## 🏁 Getting Started <a name = "getting_started"></a>

Il vous faudra obligatoirement vous inscrire sur nos serveurs, vous pourrez le faire depuis notre plateforme ou bien directement sur la SDK





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
Création d'un smart contract <strong>maketplace.sol</strong>
Ce contrat nécessitera de n'être créé qu'<strong>une seule fois</strong>, mais est <strong>obligatoire</strong> pour la suite.
<strong>L'adresse du contrat ainsi créé sera définitivement reliée à votre compte sur nos serveurs.</strong>

```typescript
sdk.createMarketPlaceContract()
```


___
### Création d'un smart contract de token
Création d'un smart contract token, parmis les choix suivant <strong>ERC721</strong> , <strong>ERC721A</strong>, <strong>ERC1155</strong>.
Ces contrats de tokens pourront être créé <strong>autant de fois que vous le voudrez</strong> pour ajouter des collections.
Pour vous permettre des frais de gaz minimum, nous enregistrons les adresses de ses contrats directement sur nos serveurs.
<strong>Attention, le nom et le symbole sont immuables</strong>, réfléchissez bien avant de créer votre contrat.
À la création du contrat, des metadatas du token sont enregistré sur ipfs ainsi que sur nos serveurs ainsi que les signatures ECDSA.

```typescript
sdk.createTokenContract(CONTRACT_NAME:string,CONTRACT_SYMBOL:string,BASE_URI:string:optional)
```

### Connection Smart Contract
Connections vers le smart contract créé au préalable par nos utilisateurs.
Envoi une requête vers nos serveurs pour récupérer l'adresse du smart contract lié a votre adresse de wallet.


```javascript
sdk.getMyAddressMarketPlace().then((res)=>{return ArrayOfAddress = res}).catch((err)=>{return err})
```

Pour récupérer vos adresses de smart contract de token créer vous devrez appeler cette fonction vers le serveur qui vous renverra un tableau d'adresse :

```javascript
sdk.getMyAddressTokens().then((res)=>{return ArrayOfAddress = res}).catch((err)=>{return err})
```

<strong><u>Pour faire des modifications sur votre marketplace, rajouter des auctions, les paramétrer puis les liés a vos collections de token, ainsi que permettre vos utilisateurs a effectuer des achats et enchère vous devrez rajouter l'adresse du market place dans la SDK :</u></strong>

```javascript
sdk.connectAddressMarketPlace(ADDRESS_MARKET_PLACE)
```






## 🔧 Method <a name="usage"></a>



### Method Dynamic
Vous pouvez faire appel à toutes les fonctions du smart contract a l'aide de notre composant Method

**Connection au smart contract nécessaire**

```javascript
sdk.method(NAME_METHOD,ADDRESS_METHOD,SEND_VALUE,ARGUMENT)
```

**Argument requis :**
- NAME_METHOD => Le nom de la méthode exact du smart contract que vous désirez appeler
- ADDRESS_METHOD => L'address exact du smart contract que vous désirez appeler
**Argument optionel :**
- SEND_VALUE => La valeur en eth que vous désirez envoyer vers le smart contract
- ARGUMENT => Les arguments nécessaires à la fonction, sous forme de tableau, un élément pour chaque valeur.

**Exemple :**

```javascript
sdk.method(mint,"0x0000000000000","1000000",[10,"10","test"])
```

___

## Method static
Ou bien, vous pouvez utiliser les méthodes suivantes de façon statique :

### Method TOKEN

```javascript
//Permet un mint de plusieurs token (max 100 pour erc721 et erc1155, max 1000 pour le erc721A)
sdk.mint(NUMBER_OF_MINT,ADDRESS_CONTRACT_TOKEN)//only owner
```

```javascript
sdk.getAllNft(ADDRESS_CONTRACT_TOKEN).then((res)=>{return ArrayOfNFTs = res}).catch((err)=>{return err})
```

```javascript
//Utilise ECDSA pour enregistrer les adresses whitelisté vers le serveur
sdk.addWhitelist(ADDRESS_WHITELISTED,ADDRESS_CONTRACT_TOKEN)
sdk.removeWhitelist(ADDRESS_WHITELISTED,ADDRESS_CONTRACT_TOKEN)
sdk.isWhitelisted(ADDRESS_WHITELISTED,ADDRESS_CONTRACT_TOKEN).then((res)=>{return res}).catch((err)=>{return err})
sdk.getWhitelist(ADDRESS_CONTRACT_TOKEN).then((res)=>{return ArrayOfWhitelisted = res}).catch((err)=>{return err})
```




### Method MARKETPLACE
Le marketplace contient des <strong>listes</strong>, qui peuvent être des <strong>ventes d'objet direct</strong>, ou bien des <strong>enchères</strong>.
Elle peuvent toutes deux contenir un tableau des id token mis en vente ainsi qu'un tableau de prix.

<strong>A la création d'une liste, les tokens listé seront transféré vers votre contract de marketplace.sol</strong>

Pour une vente direct les token contenu dans cet liste pourront être acheter un par un.
Pour une enchère les tokens contenu seront tous vendu a la fin de l'enchère.


La création ou la mise a jour de vente nécessitera un objet de ce type :
```javascript
//OBJECT_LIST
{
  startTime:"", //timestamp in seconds
  endTime:"", //timestamp in seconds
  tokenIds: [], //array of id token
  tokenPrice: [], //array of price for anyone
  basePrice: "", //Price of object
  addressOfContratToken: "", //address of contract token
  minimumPrice: "", //price minimum of bid
  royalties: [], //address of royalties
  typeOfList : 0 ,//direct sell or auction (0 or 1)
}
```

```javascript
sdk.createList(OBJECT_LIST)//onlyOwner // transfert des tokens
sdk.updateList(OBJECT_LIST)//onlyOwner
//Démarrer une vente aux enchères
sdk.getList(list_id).then((res)=>{return ListObject = res}).catch((err)=>{return err})
sdk.getLists().then((res)=>{return ListObject = res}).catch((err)=>{return err})
sdk.getHistoricList(list_id)//Récupère une liste fermé depuis nos serveurs
sdk.getHistoricLists()//Récupère les liste fermé depuis nos serveurs

//Mettre fin à une vente aux enchères enverra les NFTs aux gagnants et enverra le dépôt du gagnant aux royalties.
//Pour une optimisation maximale de frais de gaz, nous transférons les data de la list fermé vers nos serveurs.
sdk.closeList(list_id)//onlyOwner or winner ?
//Une vente aux enchères ne peut être annulé qu'avant le démarrage de cette dernière.
sdk.cancelList(list_id)//onlyOwner
```

Vos utilisateurs pourront ensuite intéragir avec vos listes de la façon suivante :


### AUCTION
```javascript
//BIDDING_VALUE Doit être plus élevé que l'offre d'enchère actuel
///@dev verify list, started, not finish, bid > msg.value, payable precedent bidder
sdk.bidding(WEI_BIDDING_VALUE)
```
### DIRECT SELL
```javascript
//Permet aux clients d'acheter et de recevoir son NFT en échange d'un achat. 
///@dev Verifiy list, token is listed, no transfered, send money, transfer to buyer, unset of list token and price
sdk.buy(WEI_VALUE,ID_TOKEN)//only sender
```


## 🔧 COMPONENTS <a name="usage"></a>

Nous méttons a votre disposition des composants natifs 

-Composant d'affichage d'un token (contient le token id, l'image, l'address owner, le nom et le symbol de la collection)


## ⛏️ Built Using <a name = "built_using"></a>

- [Typescript](https://www.typescriptlang.org/) - Tooling 
- [NodeJs](https://nodejs.org/en/) - Server Environment





## ✍️ Authors <a name = "authors"></a>

- [@fahust](https://github.com/kylelobo) - Initial work





## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
