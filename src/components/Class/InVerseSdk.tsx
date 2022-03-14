
import Factory from "./Factory";
declare let window: any;


class App extends Factory {


    constructor(){
        super();
    }


    /**
     * DYNAMIC METHOD
     */

    async method(method:string,value?:string,argument?:Array<string|BigInteger|Number|Object>){
        try{
            if(this.connected && this.contract != null){
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

export default App ;