import { ethers } from 'ethers';
declare let window: any;

export interface ObjectProps {
    callback: Function;
    abi: Array<string>;
    contractAddress: string;
    label?: string;
    value?: string;
    style?: React.CSSProperties;
}

function App(props: ObjectProps) {

    const Mint = async (props: ObjectProps) => {
        
        try{
            const {ethereum} = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const nftContract = new ethers.Contract(props.contractAddress,props.abi,signer);
                nftContract.mintDelegate({value: props.value}).then(()=>{
                    if(props.callback) props.callback(nftContract)
                    //uploadFile(countMint);
                })
            }
        } catch(err) {
            if(props.callback) props.callback(err)
        }
    }

    return (
        <div>
            <button style={props.style} onClick={()=>Mint(props)}>{props.label?props.label:"Mint"}</button>
        </div>
    )

}

export default App ;