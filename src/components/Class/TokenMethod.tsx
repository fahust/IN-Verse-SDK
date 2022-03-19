import Connection from "./Connection";
import { ethers } from 'ethers';

class TokenMethod extends Connection {


    constructor(){
        super();
    }
    
    async addWhitelist(address_whitelisted:string,address_contract_token:string){
        if(this.connected && this.contract != null){
            return await this.contract.addWhitelist(address_whitelisted,address_contract_token)
        }else{
            return "Not connected to smart contract"
        }
    }

    async removeWhitelist(address_whitelisted:string,address_contract_token:string){
        if(this.connected && this.contract != null){
            return await this.contract.removeWhitelist(address_whitelisted,address_contract_token)
        }else{
            return "Not connected to smart contract"
        }
    }

    async isWhitelisted(address_whitelisted:string,address_contract_token:string){
        if(this.connected && this.contract != null){
            return await this.contract.isWhitelisted(address_whitelisted,address_contract_token)
        }else{
            return "Not connected to smart contract"
        }
    }

    async getWhitelist(address_contract_token:string){
        if(this.connected && this.contract != null){
            return await this.contract.getWhitelist(address_contract_token)
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * 
     * @returns An array of address collection
     */
    async getMyCollections(){
        if(this.connected && this.contract != null){
            return fetch("http://localhost:8080/getMyCollections", {
                method: "POST", //ou POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({userId:this.userId}), 
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
     * Can't be call if contrat is lazy mint
     * @param number_to_mint quantity of token you want to mint
     * @param address_contract_token address of token you want to mint
     * @returns 
     */
    async mint(address_contract_token:string,number_to_mint:number){
        if(this.connected && this.contract != null){
            let tokenContract = new ethers.Contract(address_contract_token,this.getAbiToken().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            let result = await tokenContract.mint(number_to_mint)
            fetch("http://localhost:8080/mint", {
                method: "POST", //ou POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({addressTokenContract:address_contract_token,userId:this.userId,number_to_mint:number_to_mint}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });
            return result;
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Meta data for open sea (royalties, description, name)
     * @param address_contract_token  address of the contract token
     * @param uri uri/url of your host metadatas open sea
     * @returns 
     */
    async setContractURI(address_contract_token:string,uri:string){
        if(this.connected && this.contract != null){
            let tokenContract = new ethers.Contract(address_contract_token,this.getAbiToken().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            let result = await tokenContract.setContractURI(uri)
            fetch("http://localhost:8080/setContractURI", {
                method: "POST", //ou POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({addressTokenContract:address_contract_token,userId:this.userId,uri:uri}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });
            return result;
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * 
     * @param address_contract_token  address of the contract token
     * @param uri uri/url of your host metadatas token
     * @returns 
     */
    async setBaseURI(address_contract_token:string,uri:string){
        if(this.connected && this.contract != null){
            let tokenContract = new ethers.Contract(address_contract_token,this.getAbiToken().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            let result = await tokenContract.setBaseURI(uri)
            fetch("http://localhost:8080/setBaseURI", {
                method: "POST", //ou POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({addressTokenContract:address_contract_token,userId:this.userId,uri:uri}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });
            return result;
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Burn a token
     * @param address_contract_token  address of the contract token
     * @param token_id 
     * @returns 
     */
    async burn(address_contract_token:string,token_id:string){
        if(this.connected && this.contract != null){
            let tokenContract = new ethers.Contract(address_contract_token,this.getAbiToken().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            let result = await tokenContract.burn(token_id)
            fetch("http://localhost:8080/burn", {
                method: "POST", //ou POST, PUT, DELETE, etc.
                headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
                },
                body: JSON.stringify({addressTokenContract:address_contract_token,userId:this.userId,token_id:token_id}), 
            }).then((res)=>{
                return res;
            }).catch((err)=>{
                return err
            });
            return result;
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * Give role of minter for mint token (only if contract is not lazy)
     * @param address_contract_token  address of the contract token
     * @param address address of user you want to give this role
     * @returns 
     */
    async grantRoleLister(address_contract_token:string,address:string){
        if(this.connected && this.contract != null){
            const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('MINTER_ROLE'));
            let tokenContract = new ethers.Contract(address_contract_token,this.getAbiToken().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            return await tokenContract.grantRole(MINTER_ROLE,address)
        }else{
            return "Not connected to smart contract"
        }
    }
    
    /**
     * Give role of burner for burn token
     * @param address_contract_token address of the contract token
     * @param address address of user you want to give this role
     * @returns 
     */
    async grantRoleBurner(address_contract_token:string,address:string){
        if(this.connected && this.contract != null){
            const BURNER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('BURNER_ROLE'));
            let tokenContract = new ethers.Contract(address_contract_token,this.getAbiToken().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            return await tokenContract.grantRole(BURNER_ROLE,address)
        }else{
            return "Not connected to smart contract"
        }
    }



}

export default TokenMethod ;