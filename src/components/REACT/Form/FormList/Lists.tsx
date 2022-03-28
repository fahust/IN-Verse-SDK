export interface ObjectProps {
    callback: Function;
    label?: string;
    style?: React.CSSProperties;
    SDK:any;
}

function App(props: ObjectProps) {

    const CheckWalletIsConnected = async (props: ObjectProps) => {
        try {
            props.callback(props.SDK.connectWeb3());
        } catch (error) {
            props.callback(error)
        }
        
    }

    return ( 
        <div>
            <button style={props.style} onClick={()=>CheckWalletIsConnected(props)}>{props.label?props.label:"Connect"}</button>
        </div>
    )

}

export default App ;