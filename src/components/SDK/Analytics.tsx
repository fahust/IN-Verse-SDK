import { ethers } from 'ethers';

class Analytics{

    provider: ethers.providers.Web3Provider;
    signer: ethers.providers.JsonRpcSigner;
    addressContract: string;
    contract:ethers.Contract;
    contractLogger:ethers.Contract;
    connected:boolean;
    connectedWeb3:boolean;

    providerNode: ethers.providers.BaseProvider
    walletWithProvider:ethers.Wallet;
    userId:number;

    addressLogger:string;

    constructor(){
        this.contract;
        this.contractLogger;
        this.provider;
        this.signer;
        this.connected = false;

        this.connectedWeb3 = false;

        this.providerNode;
        this.walletWithProvider;
        this.userId;
        this.addressLogger = "0x5544C8c946dD7157adE750A4E3F3115a4975ec5a";
    }
}

export default Analytics ;