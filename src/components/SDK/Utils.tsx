
import contractMarketPlace from "../ABI/MarketPlaceAbi.json";
import contractToken from "../ABI/INERC721Abi.json";
import Analytics from './Analytics';
import { ethers } from 'ethers';

const providerOptions = {
    /* See Provider Options Section */
};

interface Creators {
    address:string,
    share:number
}

interface Collection {
    collectionName:string,
    collectionFamily:String
}

interface Trait {
    trait_type:string,
    value:string
}

class Utils { 
    
    provider: ethers.providers.Web3Provider;
    signer: ethers.providers.JsonRpcSigner;
    addressContract: string;
    contract:ethers.Contract;
    contractLogger:ethers.Contract;
    connected:boolean;
    connectedWeb3:boolean;

    providerNode: ethers.providers.BaseProvider
    walletWithProvider:ethers.Wallet;
    userId:number;

    addressLogger:string;
    serverUrl:string;
    JWT:string;

    constructor(){
        this.contract;
        this.contractLogger;
        this.provider;
        this.signer;
        this.connected = false;

        this.connectedWeb3 = false;

        this.providerNode;
        this.walletWithProvider;
        this.userId;
        this.addressLogger = "0x5544C8c946dD7157adE750A4E3F3115a4975ec5a";
        this.serverUrl = "http://localhost:8080/";
        this.JWT = "";
    }

    setAddressContract(_address:string){
        this.addressContract = _address;
    }

    getAbiMarketPlace(){
        return contractMarketPlace;
    }

    getAbiToken(){
        return contractToken;
    }

    async getMySignedAddress(){
        if(this.connectedWeb3){
            return this.signer.getAddress()
        }else{
            return "Not connected to smart contract"
        }
    }

}

export default Utils ;