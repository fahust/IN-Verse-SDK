import { ethers } from 'ethers';
declare let window: any;

export interface ObjectProps {
    callback: Function;
    abi: Array<string>;
    contractAddress: string;
    label?: string;
    style?: React.CSSProperties;
}

function App(props: ObjectProps) {

    const CheckWalletIsConnected = async (props: ObjectProps) => {
        
        const {ethereum} = window;

        if(!ethereum){
            console.log("ethereum not installed")
        }
        
        const accounts = await ethereum.request({method:'eth_requestAccounts'});
        if(accounts.length !== 0){
            const account = accounts[0]
        }
        try{
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const { chainId,name } = await provider.getNetwork()
                if(name != 'rinkeby') window.alert('You are not on the right network, switch to rinkeby');
                const signer = provider.getSigner();
                const nftContract = await new ethers.Contract(props.contractAddress,props.abi,signer);
                if(props.callback) props.callback(nftContract)
            }
        } catch(err) {
            if(props.callback) props.callback(err)
        }
    }

    return (
        <div>
            <button style={props.style} onClick={()=>CheckWalletIsConnected(props)}>{props.label?props.label:"Connect"}</button>
        </div>
    )

}

export default App ;