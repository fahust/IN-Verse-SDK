const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');


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

class MetaDatas {
    arrayOfMetadatas:Array<Token>;
    
    constructor(){
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