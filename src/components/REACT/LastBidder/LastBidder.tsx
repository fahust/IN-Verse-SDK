import React, { useState } from "react";

export interface ObjectProps {
    callback: Function;
    label?: string;
    styleContainer?: React.CSSProperties;
    styleLabel?: React.CSSProperties;
    styleButton?: React.CSSProperties;
    listId:number;
    SDK:any;
}

function App(props: ObjectProps) {

    let list = props.SDK.getList(props.listId)

    return (
        <div style={props.styleContainer}>
            <div style={props.styleLabel} >{props.label?props.label:"Last Bidder"}</div>
            <div style={props.styleLabel} >{list.lastBidder.bid}</div>
        </div>
    )

}

export default App ;