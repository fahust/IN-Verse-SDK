import Connection from "./Connection";

class TokenMethod extends Connection {


    constructor(){
        super();
    }

    /**
     * STATIC METHOD
     */
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

    async getAllNft(address_contract_token:string){
        if(this.connected && this.contract != null){
            return this.contract.getAllNft(address_contract_token).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

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