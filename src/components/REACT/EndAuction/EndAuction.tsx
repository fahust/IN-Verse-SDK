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

    const EndAuction = async (props: ObjectProps) => {
        try {
            props.callback(props.SDK.endAuction(props.listId,props.contractAddress));
        } catch (error) {
            props.callback(error)
        }
    }

    return (
        <div style={props.styleContainer}>
            <button style={props.styleButton} onClick={()=>EndAuction(props)}>{props.label?props.label:"End Auction"}</button>
        </div>
    )

}

export default App ;