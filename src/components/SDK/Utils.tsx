
import contractMarketPlace from "../ABI/MarketPlaceAbi.json";
import contractToken from "../ABI/INERC721Abi.json";
import Analytics from './Analytics';

const providerOptions = {
    /* See Provider Options Section */
};

interface Creators {
    address:string,
    share:number
}

interface Collection {
    collectionName:string,
    collectionFamily:String
}

interface Trait {
    trait_type:string,
    value:string
}

class Utils extends Analytics {

    constructor(){
        super();
    }

    setAddressContract(_address:string){
        this.addressContract = _address;
    }

    getAbiMarketPlace(){
        return contractMarketPlace;
    }

    getAbiToken(){
        return contractToken;
    }

    async getMySignedAddress(){
        if(this.connectedWeb3){
            return this.signer.getAddress()
        }else{
            return "Not connected to smart contract"
        }
    }

}

export default Utils ;