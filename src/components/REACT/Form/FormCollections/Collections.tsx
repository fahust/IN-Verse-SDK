import {  Button, Form, Row , Col, Card  } from 'react-bootstrap';
import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';
import Collection from "../../../SDK/Interface/Collection";

export interface ObjectProps {
    callback: Function;
    label?: string;
    style?: React.CSSProperties;
    SDK:any;
    collection?:Collection;
    
}

function App(props: ObjectProps) {
    const [Blockchain, setBlockchain] = useState(props.collection?.Blockchain);
    const [Datas, setDatas] = useState(props.collection?.Datas);
    const [Name, setName] = useState(props.collection?.Name);
    const [Symbole, setSymbole] = useState(props.collection?.Symbole);
    const [Amount, setAmount] = useState(props.collection?.Amount);
    const [Minter, setMinter] = useState(props.collection?.Minter);
    const [Pauser, setPauser] = useState(props.collection?.Pauser);
    const [Burner, setBurner] = useState(props.collection?.Burner);
    const [Description, setDescription] = useState(props.collection?.Description);
    const [Lazy, setLazy] = useState(props.collection?.Lazy);
    const [Image, setImage] = useState(props.collection?.Image);
    
    const [External_link, setExternalLink] = useState(props.collection?.External_link);
    const [Seller_fee_basis_points, setSellerFeeBasisPoints] = useState(props.collection?.Seller_fee_basis_points);
    const [Fee_recipient, setRecipient] = useState(props.collection?.Fee_recipient);

    
    const [images, setImages] = React.useState([]);
    const onChange = (imageList:any, addUpdateIndex:any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const createCollection = async (props: ObjectProps) => {
        try {
            //send image to our server, retrieve uri of image and send into two next function
            let metadataPlatform = props.SDK.platformGenerator(Name,Description,Image,External_link,Seller_fee_basis_points,Fee_recipient);
            let collectionDatas:Collection;
            collectionDatas={
                Blockchain:Blockchain,
                Datas:Datas,
                Name:Name,
                Symbole:Symbole,
                Amount:Amount,
                Minter:Minter,
                Pauser:Pauser,
                Burner:Burner,
                Description:Description,
                Lazy:Lazy,
                Image:Image,
                External_link:External_link,
                Seller_fee_basis_points:Seller_fee_basis_points,
                Fee_recipient:Fee_recipient
            }
            props.callback(props.SDK.createERC721A(Name,Symbole,"",Lazy,Amount,metadataPlatform,collectionDatas));
        } catch (error) {
            props.callback(error)
        }
        
    }

    return (
            <Form>
                <h1>Complete informations</h1>
                <p>Specify the main characteristics of your collection. These datas will help to construct your NFT smart contract and define the high-level characteristics of your collection</p>

                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={1}
                    dataURLKey="data_url"
                >
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    }) => (
                    // write your building UI
                    <Card style={{ width:'200px',height:'200px' }}  onClick={() => onImageUpdate(0)}>
                        {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img onClick={() => onImageUpdate(0)} src={image['data_url']} alt="" width="200" />
                            <div className="image-item__btn-wrapper">
                            </div>
                        </div>
                        ))}
                    </Card>
                    )}
                </ImageUploading>


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
                        <Form.Group controlId="formName">
                            <Form.Label >Name of the collection *</Form.Label>
                            <Form.Control required placeholder="Cool cats" value={Name} onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formSymbol">
                            <Form.Label>Symbol of the collection *</Form.Label>
                            <Form.Control required placeholder="Symbol" value={Symbole} onChange={e => setSymbole(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formAmount">
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
                        <Form.Group controlId="formPauser">
                            <Form.Label>Pauser</Form.Label>
                            <Form.Control placeholder="0x0..." value={Pauser} onChange={e => setPauser(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBurner">
                            <Form.Label>Burner</Form.Label>
                            <Form.Control placeholder="0x0..." value={Burner} onChange={e => setBurner(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>

                
                <Row style={{marginTop:20}}>
                    <Col>
                        <Form.Group controlId="formLink">
                            <Form.Label>External Link</Form.Label>
                            <Form.Control  placeholder="https://openseacreatures.io" value={External_link} onChange={e => setExternalLink(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formSeller">
                            <Form.Label>Seller fee basis points</Form.Label>
                            <Form.Control placeholder="100, # Indicates a 1% seller fee" value={Seller_fee_basis_points} onChange={e => setSellerFeeBasisPoints(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formRecipient">
                            <Form.Label>Recipient</Form.Label>
                            <Form.Control placeholder="0x0..." value={Fee_recipient} onChange={e => setRecipient(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row style={{marginTop:20}}>
                    <Col sm={8}>
                        <Form.Group controlId="formDesctiption">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" style={{ height: '150px' }} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..." value={Description} required onChange={e => setDescription(e.target.value)}/>
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
            </Form>
    )

}

export default App ;