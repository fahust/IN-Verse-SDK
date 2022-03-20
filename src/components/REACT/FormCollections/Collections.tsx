import {  Button, Form, Container, Row , Col  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";

export interface ObjectProps {
    callback: Function;
    label?: string;
    style?: React.CSSProperties;
    SDK:any;

    Blockchain:string;
    Datas:string;
    Name:string;
    Symbole:string;
    Amount:number;
    Minter:string;
    Pauser:string;
    Burner:string;
    Description:string;
    Lazy:boolean;
}

function App(props: ObjectProps) {
    const [Blockchain, setBlockchain] = useState(props.Blockchain);
    const [Datas, setDatas] = useState(props.Datas);
    const [Name, setName] = useState(props.Name);
    const [Symbole, setSymbole] = useState(props.Symbole);
    const [Amount, setAmount] = useState(props.Amount);
    const [Minter, setMinter] = useState(props.Minter);
    const [Pauser, setPauser] = useState(props.Pauser);
    const [Burner, setBurner] = useState(props.Burner);
    const [Description, setDescription] = useState(props.Description);
    const [Lazy, setLazy] = useState(props.Lazy);

    const createCollection = async (props: ObjectProps) => {
        try {
            props.callback(props.SDK.createERC721A(Name,Symbole,"",Lazy));
        } catch (error) {
            props.callback(error)
        }
        
    }

    return (
        <div>
            
            <Container>
                <h1>Complete informations</h1>
                <p>Specify the main characteristics of your collection. These datas will help to construct your NFT smart contract and define the high-level characteristics of your collection</p>
                <Row>
                    <Col>
                        <Form.Label>Blockchain *</Form.Label>
                        <Form.Select required value={Blockchain} onChange={e => setBlockchain(e.target.value)}>
                            <option>-- Select --</option>
                            <option value="1">Ethereum</option>
                            <option value="2">Rinkeby</option>
                            <option value="3">Polygon</option>
                            <option value="3">Mumbai</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Save my data on *</Form.Label>
                        <Form.Select required value={Datas} onChange={e => setDatas(e.target.value)}>
                            <option>-- Select --</option>
                            <option value="1">IPFS</option>
                        </Form.Select>
                    </Col>
                    <Col>
                    </Col>
                </Row>

                
                <Row style={{marginTop:20}}>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label >Name of the collection *</Form.Label>
                            <Form.Control required placeholder="Cool cats" value={Name} onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Symbol of the collection *</Form.Label>
                            <Form.Control required placeholder="Symbol" value={Symbole} onChange={e => setSymbole(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Amount of NFTs in the collection *</Form.Label>
                            <Form.Control required type="number" placeholder="30" value={Amount} onChange={e => setAmount(parseInt(e.target.value))}/>
                        </Form.Group>
                    </Col>
                </Row>

                
                <Row style={{marginTop:20}}>
                    <Col>
                        <Form.Group controlId="formMinter">
                            <Form.Label>Minter</Form.Label>
                            <Form.Control  placeholder="0x0..." value={Minter} onChange={e => setMinter(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMinter">
                            <Form.Label>Pauser</Form.Label>
                            <Form.Control placeholder="0x0..." value={Pauser} onChange={e => setPauser(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMinter">
                            <Form.Label>Burner</Form.Label>
                            <Form.Control placeholder="0x0..." value={Burner} onChange={e => setBurner(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row style={{marginTop:20}}>
                    <Col sm={8}>
                        <Form.Group controlId="formMinter">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" style={{ height: '150px' }} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..." value={Description} onChange={e => setDescription(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Label>Lazy mint</Form.Label>
                        <Form.Check 
                            checked={Lazy}
                            onChange={e => setLazy(e.target.checked)}
                            type="switch"
                            id="custom-switch"
                            label=""
                        />
                    </Col>
                </Row>
                <Button onClick={()=>createCollection(props)} style={{marginTop:20}} variant="primary" type="submit">
                    Submit
                </Button>
            </Container>
        </div>
    )

}

export default App ;