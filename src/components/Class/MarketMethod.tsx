
import Web3Modal from "web3modal";
import contractMarketPlace from "../ABI/AuctionContract.json";
import contractToken from "../ABI/TokenContract.json";
import { ethers , ContractFactory } from 'ethers';

import TokenMethod from "./TokenMethod";
declare let window: any;

class MarketMethod extends TokenMethod {


    constructor(){
        super();
    }


    /**
     * STATIC METHOD
     */

    async createList(object_list:Object){
        if(this.connected && this.contract != null){
            return this.contract.createList(object_list).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async updateList(object_list:Object){
        if(this.connected && this.contract != null){
            return this.contract.updateList(object_list).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async closeList(list_id:number){
        if(this.connected && this.contract != null){
            return this.contract.closeList(list_id).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async cancelList(list_id:number){
        if(this.connected && this.contract != null){
            return this.contract.cancelList(list_id).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async getList(list_id:number){
        if(this.connected && this.contract != null){
            return this.contract.getList(list_id).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async getLists(){
        if(this.connected && this.contract != null){
            return this.contract.getList().then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async getHistoricList(list_id:number){
        return fetch("http://localhost:8080/historicList", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify(list_id), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });
    }

    async getHistoricLists(address_market:string){
        return fetch("http://localhost:8080/historicLists", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: address_market, 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });
    }

    async bidding(value:string){
        if(this.connected && this.contract != null){
            return this.contract.bidding({value:value}).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async buy(tokenId:number,value:string){
        if(this.connected && this.contract != null){
            return this.contract.mint(tokenId,{value:value}).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }



}

export default MarketMethod ;