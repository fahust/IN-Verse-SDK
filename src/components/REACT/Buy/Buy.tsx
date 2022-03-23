import React, { useState } from "react";

export interface ObjectProps {
    callback: Function;
    label?: string;
    styleContainer?: React.CSSProperties;
    styleInput?: React.CSSProperties;
    styleButton?: React.CSSProperties;
    value:string;
    listId:number;
    array_number:number;
    token_id:number;
    contractAddress: string;
    SDK:any;
}

function App(props: ObjectProps) {

    const [Value, setValue] = useState(props.value);

    const Buy = async (props: ObjectProps) => {
        try {
            props.callback(props.SDK.buy(props.listId,props.array_number,props.token_id,Value,props.contractAddress));
        } catch (error) {
            props.callback(error)
        }
    }

    return (
        <div style={props.styleContainer}>
            <input style={props.styleInput} type="number" value={Value} onChange={(e)=>setValue(e.target.value)} />
            <button style={props.styleButton} onClick={()=>Buy(props)}>{props.label?props.label:"Buy"}</button>
        </div>
    )

}

export default App ;