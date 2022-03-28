import {  Button, Form, Container, Row , Col, Card , Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';
import Creators from "../../../SDK/Interface/Creators";
import Metadatas from "../../../SDK/Interface/MetaTokens";

export interface ObjectProps {
    callback: Function;
    label?: string;
    style?: React.CSSProperties;
    SDK:any;
    Metadatas?:Metadatas;
    
}

let newCreator:Creators;

function App(props: ObjectProps) {
    const [Quantity, setQuantity] = useState(props.Metadatas?.Quantity);
    const [Format, setFormat] = useState(props.Metadatas?.Format);
    const [Name, setName] = useState(props.Metadatas?.Name);
    const [Symbole, setSymbole] = useState(props.Metadatas?.Symbole);
    const [Category, setCategory] = useState(props.Metadatas?.Category);
    const [Edition, setEdition] = useState(props.Metadatas?.Edition);
    const [Family, setFamily] = useState(props.Metadatas?.Family);
    const [Description, setDescription] = useState(props.Metadatas?.Description);
    
    const [ArrayCreator, setArrayCreator] = useState(props.Metadatas?.Creator);
    
    const [TraitName, setTraitName] = useState("");
    const [ArrayTrait, setArrayTrait] = useState(props.Metadatas?.Traits);
    const [TraitValue, setTraitValue] = useState("");
    const [TraitPercent, setTraitPercent] = useState(0);
    
    
    const setCreatorAddress = (value:any,key:any) =>{
        const newFeatures = [...ArrayCreator!];
        newFeatures[ key ].address = value
        setArrayCreator(newFeatures);
    }
    
    const setCreatorShare = (value:any,key:any) =>{
        const newFeatures = [...ArrayCreator!];
        newFeatures[ key ].share = value
        setArrayCreator(newFeatures);
    }

    const deleteCreator = (key:any) =>{
        const newFeatures = [...ArrayCreator!];
        newFeatures.splice(key,1);
        setArrayCreator(newFeatures);
    }

    const newTrait = () => {
        const NewTrait = Object.assign({}, ArrayTrait);
        NewTrait[TraitName] = {};
        setArrayTrait(NewTrait);
    }
    
    const newTraitValue = (traitType:string) => {
        const NewTrait = Object.assign({}, ArrayTrait);
        NewTrait[traitType][TraitValue] = TraitPercent;
        setArrayTrait(NewTrait);
    }

    const deleteTraitType = (traitType:string) => {
        const NewTrait = Object.assign({}, ArrayTrait);
        delete NewTrait[traitType];
        setArrayTrait(NewTrait);
    }

    const deleteTraitValue = (traitType:string,TraitValue:string) => {
        const NewTrait = Object.assign({}, ArrayTrait);
        delete NewTrait[traitType][TraitValue];
        setArrayTrait(NewTrait);
    }

    const createCollection = async (props: ObjectProps) => {
        try {
            console.log(ArrayCreator)
            console.log(ArrayTrait)
            //send image to our server, retrieve uri of image and send into two next function

            props.callback(props.SDK.tokenGenerator(Quantity,Format,Format,Category,Name,Description,Edition,{collectionName:Name,collectionFamily:Family},Symbol,ArrayCreator,ArrayTrait));
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
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Quantity *</Form.Label>
                            <Form.Control required placeholder="Quantity" value={Quantity} onChange={e => setQuantity(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Format file *</Form.Label>
                        <Form.Select required value={Format} onChange={e => setFormat(e.target.value)}>
                            <option>-- Select --</option>
                            <option value="1">PNG</option>
                            <option value="2">JPEG</option>
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
                            <Form.Label>Symbol *</Form.Label>
                            <Form.Control required placeholder="Symbol" value={Symbole} onChange={e => setSymbole(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                    </Col>
                </Row>

                
                <Row style={{marginTop:20}}>
                    <Col>
                        <Form.Group controlId="formMinter">
                            <Form.Label>Category</Form.Label>
                            <Form.Control  placeholder="0x0..." value={Category} onChange={e => setCategory(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMinter">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control placeholder="0x0..." value={Edition} onChange={e => setEdition(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMinter">
                            <Form.Label>Family</Form.Label>
                            <Form.Control placeholder="0x0..." value={Family} onChange={e => setFamily(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>

                

                <button onClick={()=>setArrayCreator([ ...ArrayCreator!,newCreator ])} style={{marginTop:30,marginBottom:30}}>Add creator</button>

                {
                    ArrayCreator!.map((creator,key)=>{
                        return <Row key={key} style={{marginTop:20}}>
                        <Col>
                            <Form.Group controlId="formMinter">
                                <Form.Label>Address</Form.Label>
                                <Form.Control  placeholder="https://openseacreatures.io" value={creator.address} onChange={e => setCreatorAddress(e.target.value,key)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formMinter">
                                <Form.Label>Share</Form.Label>
                                <Form.Control placeholder="100, # Indicates a 1% seller fee" value={creator.share} onChange={e => setCreatorShare(e.target.value,key)}/>
                            </Form.Group>
                        </Col>
                        <Col><Badge onClick={()=>{deleteCreator(key)}} bg="danger">Delete</Badge>
                        </Col>
                    </Row>
                    })
                }

                <Row>
                    <Col>
                        <Form.Group controlId="formMinter">
                            <Form.Label>New Trait</Form.Label>
                            <Form.Control  placeholder="face/body/arms" value={TraitName} onChange={e => setTraitName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <button onClick={newTrait} style={{marginTop:30,marginBottom:30}}>Add trait type</button>
                    </Col>
                </Row>

                {
                    Object.keys(ArrayTrait).map((traitType,key)=>{
                        return <div key={traitType} style={{border: '1px solid rgba(0, 0, 0, 0.3)', padding:10, margin:10 }}>
                            Type : {traitType}
                            <Badge onClick={()=>{deleteTraitType(traitType)}} bg="danger">Delete {traitType}</Badge>
                            <Row>
                            <Col>
                                <Form.Label>New Trait value</Form.Label>
                                <Form.Control  placeholder="Common/rare/exceptionnel" value={TraitValue} onChange={e => setTraitValue(e.target.value)}/>
                            </Col>
                            <Col>
                                <Form.Label>New Trait lucky drop</Form.Label>
                                <Form.Control type="number" placeholder="10%/60%/80%" value={TraitPercent} onChange={e => setTraitPercent(parseInt(e.target.value))}/>
                            </Col>
                                
                            <Col>
                                <button onClick={()=>newTraitValue(traitType)} style={{marginTop:30,marginBottom:30}}>Add trait type</button>
                            </Col>
                            </Row>
                            
                            <div style={{border: '1px solid rgba(50, 50, 50, 0.3)', padding:10 }}>
                                {Object.keys(ArrayTrait[traitType]).map((traitValue,keyValue)=>{
                                    return <Row key={traitType+traitValue} style={{marginTop:20}}>
                                    <Col>
                                        {traitValue}
                                    </Col>
                                    <Col>
                                        {ArrayTrait[traitType][traitValue]}
                                    </Col>
                                    <Col><Badge onClick={()=>{deleteTraitValue(traitType,traitValue)}} bg="danger">Delete</Badge>
                                    </Col>
                                </Row>
                                })}
                            </div>
                        </div>
                    })
                }
                

                <Row style={{marginTop:20}}>
                    <Col sm={8}>
                        <Form.Group controlId="formMinter">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" style={{ height: '150px' }} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..." value={Description} onChange={e => setDescription(e.target.value)}/>
                        </Form.Group>
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