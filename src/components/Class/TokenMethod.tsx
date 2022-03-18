import Connection from "./Connection";

class TokenMethod extends Connection {


    constructor(){
        super();
    }
    
    async addWhitelist(address_whitelisted:string,address_contract_token:string){
        if(this.connected && this.contract != null){
            return this.contract.addWhitelist(address_whitelisted,address_contract_token).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async removeWhitelist(address_whitelisted:string,address_contract_token:string){
        if(this.connected && this.contract != null){
            return this.contract.removeWhitelist(address_whitelisted,address_contract_token).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async isWhitelisted(address_whitelisted:string,address_contract_token:string){
        if(this.connected && this.contract != null){
            return this.contract.isWhitelisted(address_whitelisted,address_contract_token).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async getWhitelist(address_contract_token:string){
        if(this.connected && this.contract != null){
            return this.contract.getWhitelist(address_contract_token).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * 
     * @param id_user id of user in our API
     * @returns An array of address collection
     */
    async getMyCollections(id_user:number){
        if(this.connected && this.contract != null){
            return fetch("http://localhost:8080/getMyCollections", {
                method: "POST", //ou POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({id_user:id_user}), 
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
     * 
     * @param address_contract_token address of token smart contract you want to return datas
     * @returns return an array of metadata collection (token) from API
     */
    async getCollection(address_contract_token:string){
        if(this.connected && this.contract != null){
            return fetch("http://localhost:8080/getCollection", {
                method: "POST", //ou POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_contract_token:address_contract_token}), 
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
     * 
     * @param address_contract_token address of contract where is the token
     * @param token_id token id you want to retrieve
     * @returns an object of metada contains token
     */
    async getNFT(address_contract_token:string,token_id:number){
        if(this.connected && this.contract != null){
            return fetch("http://localhost:8080/getNFT", {
                method: "POST", //ou POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({address_contract_token:address_contract_token,token_id:token_id}), 
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
     * 
     * @param number_to_mint quantity of token you want to mint
     * @param address_contract_token address of token you want to mint
     * @returns 
     */
    async mint(number_to_mint:number,address_contract_token:string){
        if(this.connected && this.contract != null){
            return this.contract.mint(number_to_mint,address_contract_token).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }



}

export default TokenMethod ;