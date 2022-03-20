import TokenMethod from "./TokenMethod";
import { ethers } from 'ethers';
import List from "./List";


class MarketMethod extends TokenMethod {


    constructor(){
        super();
    }

    async getMyMarketPlace(){
        return fetch("http://localhost:8080/getMyMarketPlace", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify({userId:this.userId}), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });
    }

    /**
     * 
     * @param list List object you want to create, based on list @interface List
     * @returns 
     */
    async createList(list:List){
        if(this.connected && this.contract != null){
            let createList = await this.contract.createList(list)
            fetch("http://localhost:8080/createList", {
                method: "GET", //ou POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_market:this.contract.address,list:list}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });
            return createList;
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Update a list only if is not an auction started
     * @param list List object you want to update, based on list @interface List
     * @returns 
     */
    async updateList(list:List){
        if(this.connected && this.contract != null){
            let updateList = await this.contract.updateList(list)
            fetch("http://localhost:8080/updateList", {
                method: "GET", //ou POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_market:this.contract.address,list:list}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });
            return updateList;
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Give role of lister for create, update, cancel, end List
     * @param address of user you want to give role
     * @returns 
     */
    async grantRoleLister(address:string){
        if(this.connected && this.contract != null){
            const LISTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('LISTER_ROLE'));
            await this.contract.grantRole(LISTER_ROLE,address)
        }else{
            return "Not connected to smart contract"
        }
    }

    async getMySignedAddress(){
        if(this.connectedWeb3){
            return this.signer.getAddress()
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * End list only if is an auction and time passed
     * @param list_id 
     * @returns 
     */
    async endAuction(list_id:number){
        if(this.connected && this.contract != null){
            let endAuction = await this.contract.endAuction(list_id)
            fetch("http://localhost:8080/endAuction", {
                method: "GET", //ou POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_market:this.contract.address,list_id:list_id}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });
            return endAuction;
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Cancel list not started on your marketplace
     * @param list_id 
     * @returns 
     */
    async cancelList(list_id:number){
        if(this.connected && this.contract != null){
            return await this.contract.cancelList(list_id)
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Call InVerse server for get one list
     * @param address_market 
     * @param list_id 
     * @returns 
     */
    async getList(address_market:string,list_id:number){
        if(this.connected && this.contract != null){
            return fetch("http://localhost:8080/getList", {
                method: "GET", //ou POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_market:address_market,list_id:list_id}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Call InVerse server for get all lists
     * @param address_market 
     * @returns 
     */
    async getLists(address_market:string){
        if(this.connected && this.contract != null){
            return fetch("http://localhost:8080/getLists", {
                method: "GET", //ou POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_market:address_market}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Call InVerse server for get all pasts lists
     * @param address_market 
     * @returns 
     */
    async getHistoricLists(address_market:string){
        return fetch("http://localhost:8080/historicLists", {
            method: "GET", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify({address_market:address_market}), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });
    }

    /**
     * bid for a list only if is an auction, bid must be bigger than previous bidding and minimal bid, the previous bidder is immediately refund
     * @param list_id Id of listing where is token you want to buy
     * @param value the value of eth you want to send for bid
     * @returns 
     */
    async bidding(list_id:number,value:number){
        if(this.connected && this.contract != null){
            return await this.contract.bidding(list_id,{value:value})
        }else{
            return "Not connected to smart contract"
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
    async buy(list_id:number,array_number:number,token_id:number,value:string){
        if(this.connected && this.contract != null){
            return await this.contract.buy(list_id,array_number,token_id,{value:value})
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Owner can take all money
     * @returns 
     */
    async withdraw(){
        if(this.connected && this.contract != null){
            return await this.contract.withdraw();
        }else{
            return "Not connected to smart contract"
        }
    }



}

export default MarketMethod;