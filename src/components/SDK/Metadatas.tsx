const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

import Creators from "./Interface/Creators"
import Trait from "./Interface/Trait"
import MetaTokens from "./Interface/MetaTokens"
import Utils from "./Utils"



interface Collection {
    collectionName:string,
    collectionFamily:String
}

interface Token {
    name:string,
    description:string,
    image:string,
    edition:string,
    collection:Collection,
    symbol:string,
    properties:{
        files:[{
            uri:string,
            type:string
        }]
    },
    category:string,
    creators:Array<Creators>,
    attributes:Array<Trait>
}

class MetaDatas extends Utils {
    arrayOfMetadatas:Array<Token>;
    
    constructor(){
        super();
        this.arrayOfMetadatas;
    }

    /**
     * returns exemple : {"name":"NYXIES #0","description":"Nyxies are mystical and tame creatures that can be reproduced ad infinitum","image":"https://tam.nyxiesnft.com/img/generated/0.png","edition":0,"seller_fee_basis_points":250,"collection":{"name":"NYXIES","family":"EGGS"},"symbol":"NYXS","properties":{"files":[{"uri":"https://tam.nyxiesnft.com/img/generated/0.png","type":"image/png"}],"category":"image","creators":[{"address":"0x0cE1A376d6CC69a6F74f27E7B1D65171fcB69C80","share":100}]},"attributes":[{"trait_type":"egg","value":1},{"trait_type":"ears","value":"Uncommon"},{"trait_type":"horn","value":"Uncommon"},{"trait_type":"mouth","value":"Curiosity"},{"trait_type":"eyes","value":"Rare"}]}
     * @param idToken 
     * @param formatFile 
     * @param typeFile 
     * @param category 
     * @param name 
     * @param description 
     * @param edition 
     * @param collection 
     * @param symbol 
     * @param creators 
     * @param traits 
     */
    tokenUpdate(idToken:number,formatFile:string,typeFile:string,category:string,name:string,description:string,edition:string,collection:Collection,symbol:string,creators:Array<Creators>,traits:Array<Trait>){
        let token:Token = {
            name:name,
            description:description,
            image:idToken+"."+formatFile,
            edition:edition,
            collection:collection,
            symbol:symbol,
            properties:{
                files:[{
                    uri:idToken+"."+formatFile,
                    type:typeFile
                }]
            },
            category:category,
            creators:creators,
            attributes:traits

        }
        return token
    }

    /**
     * 
     * @param quantity 
     * @param formatFile 
     * @param typeFile 
     * @param category 
     * @param name 
     * @param description 
     * @param edition 
     * @param collection 
     * @param symbol 
     * @param creators 
     * @param traits exemple : let traits:any = {
        "body":{
            "Common": 60,
            "Uncommon": 25,
            "Rare": 10,
            "More rare": 4.989, 
            "Legendary": 0.01,
            "Mythical": 0.001
        },
        "face":{
            "Common": 60,
            "Uncommon": 25,
            "Rare": 10,
            "More rare": 4.989,  
            "Legendary": 0.01,
            "Mythical": 0.001
        }
    }
     */
    tokenGenerator(quantity:number,formatFile:string,typeFile:string,category:string,name:string,description:string,edition:string,collection:Collection,symbol:string,creators:Array<Creators>,traits:any){

        let traitsToken!:Array<Trait>;
        let metadatas!:Array<Token>;

        for (let index = 0; index < quantity; index++) {

            Object.keys(traits).forEach(trait => {
                let rnd = Math.random() * 100000;
                let percent = rnd / 1000;
                let result:any = null, acc:number = 0;
                let tempTrait = traits[trait];
                Object.keys(tempTrait).forEach(key => {
                    if (result === null && percent > 100 - tempTrait[key] - acc)
                        result = key;
                    acc += parseFloat(tempTrait[key]);
                    //console.log(percent + " %", result);
                    traitsToken.push({trait_type:trait,value:result})
                });
            })

            metadatas.push(this.tokenUpdate(index,formatFile,typeFile,name,category,description,edition,collection,symbol,creators,traitsToken));

            this.arrayOfMetadatas = metadatas;
        }
    }

    /**
     * 
     * @param name 
     * @param description 
     * @param image 
     * @param external_link 
     * @param seller_fee_basis_points 
     * @param fee_recipient 
     * {
            "name": "OpenSea Creatures",
            "description": "OpenSea Creatures are adorable aquatic beings primarily for demonstrating what can be done using the OpenSea platform. Adopt one today to try out all the OpenSea buying, selling, and bidding feature set.",
            "image": "https://openseacreatures.io/image.png",
            "external_link": "https://openseacreatures.io",
            "seller_fee_basis_points": 100, # Indicates a 1% seller fee.
            "fee_recipient": "0xA97F337c39cccE66adfeCB2BF99C1DdC54C2D721" # Where seller fees will be paid to.
        }
     */
    platformGenerator(name:string,description:string,image:string,external_link:string,seller_fee_basis_points:number,fee_recipient:string){

        let opensea = {
            name:name,
            description:description,
            image:image,
            external_link:external_link,
            seller_fee_basis_points:seller_fee_basis_points,
            fee_recipient:fee_recipient
        }
        return opensea;
    }

    sendMetaTokensToServer(metaTokens:MetaTokens,address_collection:string){
        fetch(this.serverUrl+"setMetaTokens", {
            method: "POST", //ou POST, PUT, DELETE, etc.
            headers: {
            "Content-Type": "text/plain;charset=UTF-8" 
            },
            body: JSON.stringify({metaTokens:metaTokens,myAddress:this.getMySignedAddress(),address_collection:address_collection}), 
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err
        });
    }



    pinFileToIPFS = (pinataApiKey:string, pinataSecretApiKey:string) => {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

        //we gather a local file for this example, but any valid readStream source will work here.
        let data = new FormData();
        data.append('file', fs.createReadStream('./yourfile.png'));

        //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
        //metadata is optional
        const metadata = JSON.stringify({
            name: 'testname',
            keyvalues: {
                exampleKey: 'exampleValue'
            }
        });
        data.append('pinataMetadata', metadata);

        //pinataOptions are optional
        const pinataOptions = JSON.stringify({
            cidVersion: 0,
            customPinPolicy: {
                regions: [
                    {
                        id: 'FRA1',
                        desiredReplicationCount: 1
                    },
                    {
                        id: 'NYC1',
                        desiredReplicationCount: 2
                    }
                ]
            }
        });
        data.append('pinataOptions', pinataOptions);

        return axios
            .post(url, data, {
                maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            })
            .then(function (response:any) {
                //handle response here
            })
            .catch(function (error:any) {
                //handle error here
            });
    };

}

export default MetaDatas ;