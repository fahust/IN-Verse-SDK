import {  Button, Card, Container, Row , Col  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";


export interface ObjectProps {
    callback: Function;
    label?: string;
    style?: React.CSSProperties;
    SDK:any;
    addressCollection:string;
    token_id:number;
    width:string;
}

function App(props: ObjectProps) {

    let token = props.SDK.getNFTMetada(props.addressCollection,props.token_id)

    return ( 
        <div>
            <Card style={{ width: props.width?props.width:'18rem' }}>
                <Card.Img variant="top" src={token.uri} />
                <Card.Body>
                    <Card.Title>{token.title}</Card.Title>
                    <Card.Text>
                    {token.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )

}

export default App ;