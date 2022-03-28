import { getContractAddress } from "ethers/lib/utils";
import React, { useState } from "react";

export interface ObjectProps {
    callback: Function;
    label?: string;
    styleContainer?: React.CSSProperties;
    styleInput?: React.CSSProperties;
    styleButton?: React.CSSProperties;
    listId:number;
    contractAddress: string;
    SDK:any;
}

function App(props: ObjectProps) {

    const CancelList = async (props: ObjectProps) => {
        try {
            props.callback(props.SDK.cancelList(props.listId,props.contractAddress));
        } catch (error) {
            props.callback(error)
        }
    }

    return (
        <div style={props.styleContainer}>
            <button style={props.styleButton} onClick={()=>CancelList(props)}>{props.label?props.label:"Cancel list"}</button>
        </div>
    )

}

export default App ;