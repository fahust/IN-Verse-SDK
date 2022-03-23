
import Factory from "./Factory";
import { ethers } from 'ethers';
declare let window: any;


class InVerseSdk extends Factory {


    constructor(){
        super();
    }



    /**
     * DYNAMIC METHOD
     */

    async method(address_market:string,method:string,value?:string,argument?:Array<string|BigInteger|Number|Object>){
        try{
            if(this.connectedWeb3 == true){
                let contract = new ethers.Contract(address_market,this.getAbiMarketPlace().abi,this.walletWithProvider?this.walletWithProvider:this.signer);
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
                    return await contract[method](...arg)
                    
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

    async listenContracts(){
        var filter = window.ethereum.filter({fromBlock:0, toBlock:'latest', address: "0x.."});
        filter.get(function (err:any, transactions:any) {
            transactions.forEach(function (tx:any) {
                var txInfo = window.ethereum.getTransaction(tx.transactionHash);
                /* Here you have
                txInfo.gas;
                txInfo.from;
                txInfo.input;
                */
            });
        });
    }

    /*async updateContract(){
        if(this.connected){
            try {
                if(!this.provider) await this.connectWeb3();
                let signer = await this.provider.getSigner()
                let factoryAuction = new ContractFactory(contractMarketPlace.abi, contractMarketPlace.bytecode, signer);
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
    }*/



}

export default InVerseSdk ;