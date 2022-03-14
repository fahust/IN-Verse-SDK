
import contractMarketPlace from "../ABI/AuctionContract.json";
import contractToken from "../ABI/TokenContract.json";
import { ContractFactory } from 'ethers';

import MarketMethod from "./MarketMethod";

class Factory extends MarketMethod {

    constructor(){
        super();
    }

    async createMarketPlaceContract(){
        let accounts = await this.provider.listAccounts();
        try {
            if(!this.provider)await this.connectWeb3();
            let signer = await this.provider.getSigner()
                let factoryAuction = new ContractFactory(contractMarketPlace.abi, contractMarketPlace.bytecode, signer);
                return factoryAuction.deploy().then((auctionContract)=>{
                    return fetch("http://localhost:8080/setAuctionAddress", {
                        method: "POST", //ou POST, PUT, DELETE, etc.
                        headers: {
                        "Content-Type": "text/plain;charset=UTF-8" 
                        },
                        body: JSON.stringify({addressAuctionContract:auctionContract.address,userAddress:accounts[0]}), 
                    }).then((res)=>{
                        return res;
                    }).catch((err)=>{
                        return err
                    });
                }).catch((error:any)=>{
                    return {error};
                });
            
        } catch (error) {
            return {error};
        }
    }

    async createTokenContract(_name:string,_symbol:string,_initBaseURI:string){
        let accounts = await this.provider.listAccounts();
        try {
            if(!this.provider)await this.connectWeb3();
            let signer = await this.provider.getSigner()
            let factoryToken = new ContractFactory(contractToken.abi, contractToken.bytecode, signer);
            return factoryToken.deploy(_name, _symbol, _initBaseURI).then((tokenContract:any)=>{
                return fetch("http://localhost:8080/addTokenAddress", {
                        method: "POST", //ou POST, PUT, DELETE, etc.
                        headers: {
                        "Content-Type": "text/plain;charset=UTF-8" 
                        },
                        body: JSON.stringify({addressAuctionContract:tokenContract.address,userAddress:accounts[0]}), 
                    }).then((res)=>{
                        return res;
                    }).catch((err)=>{
                        return err
                    });
            }).catch((error:any)=>{
                return {error};
            });
            
        } catch (error) {
            return {error};
        }
    }
}

export default Factory ;