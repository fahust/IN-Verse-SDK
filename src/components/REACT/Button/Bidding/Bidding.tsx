import React, { useState } from "react";

export interface ObjectProps {
    callback: Function;
    label?: string;
    styleContainer?: React.CSSProperties;
    styleInput?: React.CSSProperties;
    styleButton?: React.CSSProperties;
    value:string;
    listId:string;
    contractAddress: string;
    SDK:any;
}

function App(props: ObjectProps) {

    const [Value, setValue] = useState(props.value);

    const Bidding = async (props: ObjectProps) => {
        try {
            props.callback(props.SDK.bidding(props.listId,Value,props.contractAddress));
        } catch (error) {
            props.callback(error)
        }
    }

    return (
        <div style={props.styleContainer}>
            <input style={props.styleInput} type="number" value={Value} onChange={(e)=>setValue(e.target.value)} />
            <button style={props.styleButton} onClick={()=>Bidding(props)}>{props.label?props.label:"Bidding"}</button>
        </div>
    )

}

export default App ;