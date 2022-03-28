import { ethers } from 'ethers';
declare let window: any;

export interface ObjectProps {
    callback: Function;
    abi: Array<string>;
    contractAddress: string;
    method: string;
    label?: string;
    value?: string;
    style?: React.CSSProperties;
}

function App(props: ObjectProps) {

    const Method = async (props: ObjectProps) => {
        try{
            const {ethereum} = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const nftContract = new ethers.Contract(props.contractAddress,props.abi,signer);
                if(props.value){
                    nftContract[props.method]({value: props.value}).then(()=>{
                        if(props.callback) props.callback(nftContract)
                    })
                }else{
                    nftContract[props.method]().then(()=>{
                        if(props.callback) props.callback(nftContract)
                    })
                }
                
            }
        } catch(err) {
            if(props.callback) props.callback(err)
        }
    }

    return (
        <div>
            <button style={props.style} onClick={()=>Method(props)}>{props.label?props.label:props.method}</button>
        </div>
    )

}

export default App ;