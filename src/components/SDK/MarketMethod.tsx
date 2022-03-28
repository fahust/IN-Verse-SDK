import TokenMethod from "./TokenMethod";
import { ethers } from 'ethers';
import List from "./Interface/List";
import Fetch from './Fetch';


class MarketMethod extends TokenMethod {


    constructor(){
        super();
    }
    /**
     * 
     * @returns returns array of marketplace addresses created previously
     */
    async getMyMarketPlaces(){
        return await Fetch("getMyMarketPlaces","GET",JSON.stringify({myAddress:this.getMySignedAddress()}),this.JWT);
        /*return fetch(this.serverUrl+"getMyMarketPlaces", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify({myAddress:this.getMySignedAddress()}), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });*/
    }

    /**
     * 
     * @param list List object you want to create, based on list @interface List
     * @returns 
     */
    async createList(list:List,address_market:string){
        if(this.connectedWeb3 == true){
            let contract = new ethers.Contract(address_market,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            let createList = await contract.createList(list)
            await Fetch("createList","GET",JSON.stringify({address_market:address_market,list:list}),this.JWT);
            /*fetch(this.serverUrl+"createList", {
                method: "GET", //ou POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_market:address_market,list:list}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });*/
            return createList;
        }else{
            this.connectWeb3()
        }
    }

    /**
     * Update a list only if is not an auction started
     * @param list List object you want to update, based on list @interface List
     * @returns 
     */
    async updateList(list:List,address_market:string){
        if(this.connectedWeb3 == true){
            let contract = new ethers.Contract(address_market,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            let updateList = await contract.updateList(list)
            await Fetch("updateList","GET",JSON.stringify({address_market:address_market,list:list}),this.JWT);
            /*fetch(this.serverUrl+"updateList", {
                method: "GET", //ou POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_market:address_market,list:list}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });*/
            return updateList;
        }else{
            this.connectWeb3()
        }
    }

    /**
     * Give role of lister for create, update, cancel, end List
     * @param address of user you want to give role
     * @returns 
     */
    /*async grantRoleLister(address:string){
        if(this.connected && this.contract != null){
            const LISTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('LISTER_ROLE'));
            await this.contract.grantRole(LISTER_ROLE,address)
        }else{
            return "Not connected to smart contract"
        }
    }*/

    /**
     * End list only if is an auction and time passed
     * @param list_id 
     * @returns 
     */
    async endAuction(list_id:number,address_market:string){
        if(this.connectedWeb3 == true){
            let contract = new ethers.Contract(address_market,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            let endAuction = await contract.endAuction(list_id)
            await Fetch("endAuction","GET",JSON.stringify({address_market:address_market,list_id:list_id}),this.JWT);
            /*fetch(this.serverUrl+"endAuction", {
                method: "GET", //ou POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_market:address_market,list_id:list_id}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });*/
            return endAuction;
        }else{
            this.connectWeb3()
        }
    }

    /**
     * Cancel list not started on your marketplace
     * @param list_id 
     * @returns 
     */
    async cancelList(list_id:number,address_market:string){
        if(this.connectedWeb3 == true){
            let contract = new ethers.Contract(address_market,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            return await contract.cancelList(list_id)
        }else{
            this.connectWeb3()
        }
    }

    /**
     * Call marketplace.sol for get one current list
     * @param list_id 
     * @returns 
     */
    async getList(list_id:number,address_market:string){
        if(this.connectedWeb3 == true){
            let contract = new ethers.Contract(address_market,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            return await contract.getList(list_id);
        }else{
            this.connectWeb3()
        }
    }

    /**
     * Call InVerse server for get all lists
     * @param address_market 
     * @returns 
     */
    async getLists(address_market:string){
        return await Fetch("getLists","GET",JSON.stringify({address_market:address_market}),this.JWT);
        /*return fetch(this.serverUrl+"getLists", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify({address_market:address_market}), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });*/
    }

    /**
     * Call InVerse server for get all pasts lists
     * @param address_market 
     * @returns 
     */
    async getHistoricLists(address_market:string){
        return await Fetch("historicLists","GET",JSON.stringify({address_market:address_market}),this.JWT);
        /*return fetch(this.serverUrl+"historicLists", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify({address_market:address_market}), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });*/
    }

    /**
     * Call InVerse server for get one past list
     * @param address_market 
     * @param list_id 
     * @returns 
     */
    async getHistoricList(address_market:string,list_id:number){
        return await Fetch("historicList","GET",JSON.stringify({address_market:address_market,list_id:list_id}),this.JWT);
        /*return fetch(this.serverUrl+"getHistoricList", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify({address_market:address_market,list_id:list_id}), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });*/
    }

    /**
     * bid for a list only if is an auction, bid must be bigger than previous bidding and minimal bid, the previous bidder is immediately refund
     * @param list_id Id of listing where is token you want to buy
     * @param value the value of eth you want to send for bid
     * @returns 
     */
    async bidding(list_id:number,value:number,address_market:string){
        if(this.connectedWeb3 == true){
            let contract = new ethers.Contract(address_market,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            return await contract.bidding(list_id,{value:value})
        }else{
            this.connectWeb3()
        }
    }

    /**
     * Buy a token only if list is not an auction, value send is bigger than minimum price
     * @param list_id Id of listing where is token you want to buy
     * @param array_number The key of array container of token id
     * @param token_id the id of token, must be correspond to element of key array
     * @param value the value you want to buy the token, must be up que minimum price of token
     * @returns 
     */
    async buy(list_id:number,array_number:number,token_id:number,value:string,address_market:string){
        if(this.connectedWeb3 == true){
            let contract = new ethers.Contract(address_market,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            return await contract.buy(list_id,array_number,token_id,{value:value})
        }else{
            this.connectWeb3()
        }
    }

    /**
     * Owner can take all money
     * @returns 
     */
    async withdraw(address_market:string){
        if(this.connectedWeb3 == true){
            let contract = new ethers.Contract(address_market,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            return await contract.withdraw();
        }else{
            this.connectWeb3()
        }
    }

    async onEventBidders(address_market:string,_listingId:number,_function:Function){
        if(this.connectedWeb3 == true && this.contractLogger != null){
            this.contractLogger.on("Bidders", (marketPlace, addressBidder, bid, listingId) => {
                if(marketPlace==address_market&&listingId==_listingId) _function(bid,addressBidder);
            });
        }else{
            this.connectWeb3()
        }
    }



}

export default MarketMethod;