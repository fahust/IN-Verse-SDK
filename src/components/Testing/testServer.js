var ethers = require('ethers');
//var ethers = require('web3');
var {InVerseSdk} = require('@fahust/test-inverse-react-lib');
test();
async function test(){
    var sdk = new InVerseSdk();

    let addressContract = "0xd821689a26475d343f4c43A5269bbB30f9CA3975";
    let privateKey = "02dc5cfbbfca205e80e8db52db21a497af7be8c4034c83539c3075260e5d1359";
    //let wallet = new ethers.Wallet(privateKey);

    // Connect a wallet to mainnet
    //let walletWithProvider = sdk.connectWeb3WithNode(privateKey);
    //console.log(sdk.getAbiMarketPlace())

    
    //let contract = new ethers.Contract(addressContract,sdk.getAbiMarketPlace().abi,walletWithProvider);
    //console.log(contract)
    const firstList = {
        lastBidder: {addressBidder:"0x8F0765EdF7db57b5eB0E704dC45Bbbadd9859099",bid:111},
        addressContractToken: "0x4a9C121080f6D9250Fc0143f41B595fD172E31bf",//instanceToken.address,
        addressMinter: "0x8F0765EdF7db57b5eB0E704dC45Bbbadd9859099",
        paused: false,
        _royaltiesAddr: ["0x8F0765EdF7db57b5eB0E704dC45Bbbadd9859099"],
        _royaltiesPercent: [100],
        _tokenInAuction: [0,1,2,3,4,5],
        _priceToken: [10,100,10,1000,10,10],
        listingId: 0,
        minBid: 10,
        startDate: 0,
        timeAuction: 0,
        direct: false,
        tokenType: 2
    };



    
    let providerNode = ethers.getDefaultProvider();
    
    providerNode = ethers.providers.JsonRpcProvider("http://localhost:8545", ethers.networks.unspecified);

    let walletWithProvider = new ethers.Wallet(privateKey, providerNode);
    let contract = new ethers.Contract(addressContract,sdk.getAbiMarketPlace().abi,walletWithProvider);
    const estimation = await contract.estimateGas.createList(firstList);

    let logCreateList = await contract.createList(firstList,{gasPrice:0,gasLimit:estimation})
    //console.log('sdk create list',logCreateList)

    //await contract.LISTER_ROLE()
    /*console.log(estimation)
    console.log("cost",ethers.utils.formatEther(estimation))*/

    /*let walletWithProvider2 = await sdk.connectWeb3WithNode(privateKey);
    console.log(await sdk.connectMarketPlace(addressContract));

    console.log(await sdk.contract.estimateGas.createList(firstList))*/


    //const estimation = await contract.estimateGas.createList(firstList);
    //console.log(estimation)
    //console.log("cost",ethers.utils.formatEther(estimation))

    //let logCreateMarketPlace = await sdk.createMarketPlaceContract()
    //console.log('sdk create marketPlace',logCreateMarketPlace)

    //sdk.connectMarketPlace(logCreateMarketPlace.address);
    //console.log(await sdk.connectMarketPlace(addressContract));
    
    /*let logCreateToken = await sdk.createTokenContract("test","TST","uri",false);
    console.log('sdk create token',logCreateToken)*/

    //const LISTER_ROLE = await sdk.contract.LISTER_ROLE();
    //let balance = await sdk.contract.grantRole(LISTER_ROLE,"0x8F0765EdF7db57b5eB0E704dC45Bbbadd9859099")

    //let estimation = await sdk.contract.estimateGas.createList(firstList);
    //await sdk.contract.createList(firstList,{gasPrice: 0, gasLimit:estimation})
    
    /*let logCreateList = await sdk.createList(firstList)
    console.log('sdk create list',logCreateList)*/





    /*var sendPromise = contract.createList(firstList,{gasPrice: 0, gasLimit:estimation}
    ).then((result)=>{
        console.log('result : ',result)
    }).catch((err)=>{
        console.log('err : ',err)
    });*/
}

/*


let transaction = {
    nonce: 0,
    gasLimit: 21000,
    gasPrice: utils.bigNumberify("20000000000"),

    to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",
    // ... or supports ENS names
    // to: "ricmoo.firefly.eth",

    value: utils.parseEther("0.001"),

    // This ensures the transaction cannot be replayed on different networks
    chainId: ethers.utils.getNetwork('homestead').chainId
}

let signPromise = wallet.sign(transaction)*/