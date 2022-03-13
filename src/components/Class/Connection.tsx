
import Web3Modal from "web3modal";
import contractMarketPlace from "../ABI/AuctionContract.json";
import contractToken from "../ABI/TokenContract.json";
import { ethers , ContractFactory } from 'ethers';

import Factory from "./Factory.js";
declare let window: any;

const providerOptions = {
    /* See Provider Options Section */
};

class Connection {


    provider: ethers.providers.Web3Provider;
    signer: ethers.providers.JsonRpcSigner;
    addressContract: string;
    contract:ethers.Contract;
    connected:boolean;

    connectedWeb3:boolean;

    constructor(){
        this.contract;
        this.provider;
        this.signer;
        this.connected = false;

        this.connectedWeb3 = false;
    }

    /**
     * INITIALIZATION
     */
    
    async connectWeb3 () {
        const web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions // required
        });
        
        const instance = await web3Modal.connect();
        
        this.provider = new ethers.providers.Web3Provider(instance);
        this.signer = this.provider.getSigner();

        this.connectedWeb3 = true;
    }
    
    async connectAddressMarketPlace (addressContract:string) {
        if(this.connectedWeb3 == false) this.connectWeb3()
        this.contract = new ethers.Contract(addressContract,contractMarketPlace.abi,this.signer);
        this.connected = true;
    }
    
    updateMyAccount(ObjectAccount:Object){
        return fetch("http://localhost:8080/updateAccount", {
            method: "POST", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify(ObjectAccount), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });
    }

    async getMyAddressMarketPlace(){
        let accounts = await this.provider.listAccounts();
        return fetch("http://localhost:8080/getMyAddressMarketPlace", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: accounts[0], 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });
    }

    async getMyAddressTokens(){
        let accounts = await this.provider.listAccounts();
        return fetch("http://localhost:8080/getMyAddressTokens", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: accounts[0], 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });
    }



    setAddressContract(_address:string){
        this.addressContract = _address;
    }

}

export default Connection ;