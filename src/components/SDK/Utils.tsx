import { ethers } from 'ethers';
import contractMarketPlace from "../ABI/MarketPlaceAbi.json";
import contractToken from "../ABI/INERC721Abi.json";

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
    connected:boolean;
    connectedWeb3:boolean;

    providerNode: ethers.providers.BaseProvider
    walletWithProvider:ethers.Wallet;
    userId:number;

    addressLogger:string;

    constructor(){
        this.contract;
        this.provider;
        this.signer;
        this.connected = false;

        this.connectedWeb3 = false;

        this.providerNode;
        this.walletWithProvider;
        this.userId;
        this.addressLogger = "0x5544C8c946dD7157adE750A4E3F3115a4975ec5a";
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

}

export default Utils ;