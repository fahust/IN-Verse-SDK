import { ethers , ContractFactory } from 'ethers';
import Web3Modal from "web3modal";
import contractAuction from "../ABI/AuctionContract.json";
import contractToken from "../ABI/TokenContract.json";
import contractAdmin from "../ABI/AdminController.json";
declare let window: any;

const providerOptions = {
    /* See Provider Options Section */
};

class App {

    provider: ethers.providers.Web3Provider;
    signer: ethers.providers.JsonRpcSigner;
    addressContract: string;
    contract:ethers.Contract;
    connected:boolean;

    adminContract:ethers.Contract;
    addressAdminContract: string;
    connectedWeb3:boolean;

    constructor(addressContract = ""){
        this.contract;
        this.provider;
        this.signer;
        this.addressContract=addressContract;
        this.connected = false;

        this.adminContract;
        this.addressAdminContract = "";//mêttre ici l'address de notre admin contract
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

        this.adminContract = new ethers.Contract(this.addressAdminContract,contractAdmin.abi,this.signer);
        this.connectedWeb3 = true;
    }
    
    async connectSmartContract () {
        if(this.connectedWeb3 == false) this.connectWeb3()
        this.contract = new ethers.Contract(this.addressContract,contractAuction.abi,this.signer);
        this.connected = true;
    }

    setAddressContract(_address:string){
        this.addressContract = _address;
    }

    /**
     * DYNAMIC METHOD
     */

    async method(method:string,value?:string,argument?:Array<string|BigInteger|Number|Object>){
        try{
            if(this.connected){
                const {ethereum} = window;
                if(ethereum){
                    
                    let arg:Array<string|BigInteger|Number|Object> = [];
                    if(value!=""&&value&&argument&&argument.length>0){
                        argument?.push({value: value})
                        arg = argument;
                    }else if(value!=""&&value){
                        arg = [{value: value}];
                    }else if(argument&&argument.length>0){
                        arg = argument;
                    }
                    return this.contract[method](...arg).then((result:any)=>{
                        return result;
                    }).cach((error:any)=>{
                        return error;
                    })
                    
                }
            }else{
                return "Not connected to smart contract"
            }
        } catch(err) {
            return err;
        }
    }

    /**
     * METADATA
     */
    

    async metaDescription(){

    }

    async setURI(){

    }

    async setBaseURI(){

    }

    async sendToIPFS(){

    }

    /**
     * STATIC METHOD
     */

    async mint(number:number){
        if(this.connected){
            return this.contract.mint(number).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async getAllNft(){
        if(this.connected){
            return this.contract.getAllNft().then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    async bidding(value:string){
        if(this.connected){
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
        if(this.connected){
            return this.contract.mint(tokenId,{value:value}).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "Not connected to smart contract"
        }
    }

    /**
     * SMART CONTRACT CREATION
     */

    async createSmartContractBySign(_name:string,_symbol:string,_initBaseURI:string){
        try {
            if(!this.provider)await this.connectWeb3();
            let signer = await this.provider.getSigner()
            let factoryToken = new ContractFactory(contractToken.abi, contractToken.bytecode, signer);
            let tokenContract = await factoryToken.deploy(_name, _symbol, _initBaseURI);
            let factoryAuction = new ContractFactory(contractAuction.abi, contractAuction.bytecode, signer);
            let auctionContract = await factoryAuction.deploy(tokenContract.address);
            return this.adminContract.addContract(_name, _symbol, _initBaseURI, tokenContract.address, auctionContract.address).then((result:any)=>{
                return auctionContract.address;
            }).cach((error:any)=>{
                return error;
            })
        } catch (error) {
            return error;
        }
    }

    async updateContract(){
        if(this.connected){
            try {
                if(!this.provider)await this.connectWeb3();
                let signer = await this.provider.getSigner()
                let factoryAuction = new ContractFactory(contractAuction.abi, contractAuction.bytecode, signer);
                let addressMyToken = await this.contract.getAddressContract();
                let auctionContract = await factoryAuction.deploy(addressMyToken);
                return this.adminContract.updateContract(this.contract.address,auctionContract.address).then((result:any)=>{
                    return result;
                }).cach((error:any)=>{
                    return error;
                })
            } catch (error) {
                return error;
            }
        }else{
            return "Not connected to smart contract"
        }
    }


    async createSmartContract(name:string,symbol:string,typeContract:string){
        if(typeContract=="ERC20"){
            return this.contract.createSmartContractERC20(name,symbol).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else if(typeContract=="ERC721"){
            return this.contract.createSmartContractERC721(name,symbol).then((result:any)=>{
                return result;
            }).cach((error:any)=>{
                return error;
            })
        }else{
            return "type is not acceptable"
        }
    }



}

export default App ;