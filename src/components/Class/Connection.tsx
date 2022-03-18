
import Web3Modal from "web3modal";
import contractMarketPlace from "../ABI/AuctionContract.json";
import { ethers } from 'ethers';

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
        }else{
            return false;
        }
    }

    async currentChainIsAccepted(){
        return await this.networkInChainAccepted(await this.getIdChainNow())
    }
    
    async connectAddressMarketPlace (addressContract:string) {
        if(await this.currentChainIsAccepted()){
            if(this.connectedWeb3 == false) this.connectWeb3()
            this.contract = new ethers.Contract(addressContract,contractMarketPlace.abi,this.signer);
            this.connected = true;
        }
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



    setAddressContract(_address:string){
        this.addressContract = _address;
    }

}

export default Connection ;