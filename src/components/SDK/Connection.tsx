
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import Analytics from "./Analytics";
import Fetch from './Fetch';

const providerOptions = {
    /* See Provider Options Section */
};

class Connection extends Analytics {


    constructor(){
        super();
    }
    
    /**
     * Connect to web3 with wallet like MetaMask and other and sign to your website
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

        this.contractLogger = new ethers.Contract(this.addressLogger,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);

        this.connectedWeb3 = true;
    }
    
    /**
     * you need to connect to your marketplace for use them
     * @param addressContract Address of smart contract market place 
     * @returns 
     */
    /*async connectMarketPlace (addressContract:string) {
        if(await this.currentChainIsAccepted()){
            if(this.connectedWeb3 == false) this.connectWeb3()
            this.contract = new ethers.Contract(addressContract,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
            this.connected = true;
            return "connected";
        }else{
            return "not good chain id";
        }
    }*/

    /**
     * Set user id on SDK for create factory
     * @param _id Id of user on InVerse server
     */
    setUserId(_id:number){
        this.userId = _id;
    }

    /**
     * send a request to inVerse server for connect account, need it for update your data account
     * @returns 
     */
    async connectToInVerseAccount(){
        return fetch(this.serverUrl+"connectAccount", {
            method: "POST", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify(this.getMySignedAddress()), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });
        
    }
    
    /**
     * 
     * @param ObjectAccount {myaddress,username,password,...}
     * @returns 
     */
    async updateMyInVerseAccount(ObjectAccount:Object){
        return await Fetch("updateAccount","POST",JSON.stringify(ObjectAccount),this.JWT);
        /*return fetch(this.serverUrl+"updateAccount", {
            method: "POST", //ou POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify(ObjectAccount), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });*/
    }

    async connectWeb3WithNode (privateKey:string) {
        this.providerNode = await ethers.getDefaultProvider();
        this.walletWithProvider = await new ethers.Wallet(privateKey, this.providerNode);
        this.connectedWeb3 = true;
    }

    switchAddNetworkMatic(){
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "137",
                rpcUrls: ["https://rpc-mainnet.matic.network/"],
                chainName: "Matic mainnet",
                nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18
                },
                blockExplorerUrls: ["https://polygonscan.com/"]
            }]
        });
    }

    switchAddNetworkMumbai(){
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "8001",
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                chainName: "Mumbai",
                nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18
                },
                blockExplorerUrls: ["https://polygonscan.com/"]
            }]
        });
    }

    switchAddNetworkRinkeby(api_key_infura:string){
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "4",
                rpcUrls: ["https://rinkeby.infura.io/v3/"+api_key_infura],
                chainName: "Rinkeby testnet",
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18
                },
                blockExplorerUrls: ["https://polygonscan.com/"]
            }]
        });
    }

    switchAddNetworkEthereum(){
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "1",
                rpcUrls: ["https://mainnet.infura.io/v3/"],
                chainName: "Ethereum mainnet",
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18
                },
                blockExplorerUrls: ["https://polygonscan.com/"]
            }]
        });
    }

    async getIdChainNow(){
        let network = await this.provider.getNetwork();
        return network.chainId;
    }

    async networkInChainAccepted(currentChainId:number){
        if(currentChainId==4){
            return true;
        }else if(currentChainId==8001){
            return true;
        }else if(currentChainId==1){
            return true;
        }else if(currentChainId==137){
            return true;
        }else if(currentChainId==1337){
            return true;
        }else{
            return false;
        }
    }

    async currentChainIsAccepted(){
        return this.providerNode?true:await this.networkInChainAccepted(await this.getIdChainNow());
    }

}

export default Connection ;