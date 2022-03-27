import {  Button, Card, Container, Row , Col  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";


export interface ObjectProps {
    callback: Function;
    label?: string;
    style?: React.CSSProperties;
    SDK:any;
    addressCollection:string;
    width:string;
}

function App(props: ObjectProps) {

    let collection = props.SDK.getCollection(props.addressCollection)

    return ( 
        <div>
            <Card style={{ width: props.width?props.width:'18rem' }}>
                <Card.Img variant="top" src={collection.uri} />
                <Card.Body>
                    <Card.Title>{collection.title}</Card.Title>
                    <Card.Text>
                    {collection.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )

}

export default App ;