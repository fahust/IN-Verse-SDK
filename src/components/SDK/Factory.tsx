
import contractMarketPlace from "../ABI/MarketPlaceAbi.json";
import contractToken from "../ABI/INERC721Abi.json";
import { ContractFactory } from 'ethers';
import Collection from "./Interface/Collection";

import MarketMethod from "./MarketMethod";

class Factory extends MarketMethod {

    constructor(){
        super();
    }
    
    /**
     * Deploy smart contract MarketPlace.sol, after done it send address of smart contract on our server address 
     * @returns 
     */
    async createMarketPlaceContract(){
        let provider = this.provider?this.provider:this.providerNode;
        try {
            if(await this.getMySignedAddress()){
                if(!provider)await this.connectWeb3();
                let signer = this.walletWithProvider?this.walletWithProvider:await this.provider.getSigner();
                let factoryAuction = new ContractFactory(contractMarketPlace.abi, contractMarketPlace.bytecode, signer);
                return factoryAuction.deploy(this.addressLogger).then((auctionContract)=>{
                    fetch(this.serverUrl+"addMarketPlaceAddress", {
                        method: "POST", //ou POST, PUT, DELETE, etc.
                        headers: {
                        "Content-Type": "text/plain;charset=UTF-8" 
                        },
                        body: JSON.stringify({addressAuctionContract:auctionContract.address,myAddress:this.getMySignedAddress()}), 
                    }).then((res)=>{
                        return res;
                    }).catch((err)=>{
                        return err
                    });
                    return auctionContract.address
                }).catch((error:any)=>{
                    return {error};
                });
            }else{
                return "User id not setted"
            }
        } catch (error) {
            return {error};
        }
    }

    /**
     * Deploy smart contract of INERC721A, after done it send address of smart contract on our server address 
     * @param _name Name of token
     * @param _symbol symbol of token
     * @param _initBaseURI URI of base folder metadatas token
     * @param lazyMint if true, token created only when it saled
     * @returns 
     */
    async createERC721A(_name:string,_symbol:string,_initBaseURI:string,lazyMint:boolean,maxMint:number,metaDataPlatform:JSON,collectionDatas:Collection){
        let provider = this.provider?this.provider:this.providerNode;
        try {
            if(await this.getMySignedAddress()){
                if(!provider)await this.connectWeb3();
                let signer = this.walletWithProvider?this.walletWithProvider:await this.provider.getSigner();
                let factoryToken = new ContractFactory(contractToken.abi, contractToken.bytecode, signer);
                return factoryToken.deploy(_name, _symbol, _initBaseURI,lazyMint,this.addressLogger,maxMint).then((tokenContract:any)=>{
                    fetch(this.serverUrl+"addTokenAddress", {
                        method: "POST", //ou POST, PUT, DELETE, etc.
                        headers: {
                        "Content-Type": "text/plain;charset=UTF-8" 
                        },
                        body: JSON.stringify({addressTokenContract:tokenContract.address,myAddress:this.getMySignedAddress(),metaDataPlatform:metaDataPlatform,collectionDatas:collectionDatas}), 
                    }).then((res)=>{
                        return res;
                    }).catch((err)=>{
                        return err
                    });
                    return tokenContract.address;
                }).catch((error:any)=>{
                    return {error};
                });
            }else{
                return "User id not setted"
            }
            
        } catch (error) {
            return {error};
        }
    }
}

export default Factory ;