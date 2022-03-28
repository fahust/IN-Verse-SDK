import {  Button, Form, Container, Row , Col, Card  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';
import List from "../../../SDK/Interface/List";

export interface ObjectProps {
    callback: Function;
    label?: string;
    style?: React.CSSProperties;
    SDK:any;
    list?:List;
    address_market:string
}

function App(props: ObjectProps) {

    /**
     * Nécessite le serveur pour faire des tests
     * Listes des tokens contract de l'user
     * Clique sur un tokens contrat récupère l'addresse, les tokens
     * on récupère le token type
     * On choisit les tokens que l'ont veux et on leur met un base price, on peut quand même les changer un par un
     * on rajoute des bénéficiaires (royalties)
     */
    const [AddressContractToken, setAddressContractToken] = useState(props.list?.addressContractToken);
    const [AddressMinter, setAddressMinter] = useState(props.list?.addressMinter);
    const [RoyaltiesAddr, setRoyaltiesAddr] = useState(props.list?._royaltiesAddr);
    const [RoyaltiesPercent, setRoyaltiesPercent] = useState(props.list?._royaltiesPercent);
    const [TokenInAuction, setTokenInAuction] = useState(props.list?._tokenInAuction);
    const [PriceToken, setPriceToken] = useState(props.list?._priceToken);
    const [ListingId, setListingId] = useState(props.list?.listingId);
    const [MinBid, setMinBid] = useState(props.list?.minBid);
    const [StartDate, setStartDate] = useState(props.list?.startDate);
    const [TimeAuction, setTimeAuction] = useState(props.list?.timeAuction);
    const [Direct, setDirect] = useState(props.list?.direct);
    const [TokenType, setTokenType] = useState(props.list?.tokenType);

    
    const [images, setImages] = React.useState([]);
    const onChange = (imageList:any, addUpdateIndex:any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const createList = async (props: ObjectProps) => {
        try {
            //send image to our server, retrieve uri of image and send into two next function
            let listDatas:List;
            listDatas={
                lastBidder: {addressBidder:AddressContractToken!,bid:0},
                addressContractToken: AddressContractToken!,//instanceToken.address,
                addressMinter: AddressMinter!,
                paused: false,
                _royaltiesAddr: RoyaltiesAddr!,
                _royaltiesPercent: RoyaltiesPercent!,
                _tokenInAuction: TokenInAuction!,
                _priceToken: PriceToken!,
                listingId: ListingId!,
                minBid: MinBid!,
                startDate: StartDate!,
                timeAuction: TimeAuction!,
                direct: Direct!,
                tokenType: TokenType!
            }
            props.callback(props.SDK.createList(listDatas,props.address_market));
        } catch (error) {
            props.callback(error)
        }
        
    }

    const setContractToken = async (value:string) =>{
        setAddressContractToken(value);
    }

    return (
        <div>
            
            <Container>
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
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label >Address Contract Token *</Form.Label>
                            <Form.Control required placeholder="Cool cats" value={AddressContractToken} onChange={e => setContractToken(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Address Minter *</Form.Label>
                        <Form.Select required value={AddressMinter} onChange={e => setAddressMinter(e.target.value)}>
                            <option>-- Select --</option>
                            <option value="1">IPFS</option>
                        </Form.Select>
                    </Col>
                    <Col>
                    </Col>
                </Row>

                <Button onClick={()=>createList(props)} style={{marginTop:20}} variant="primary" type="submit">
                    Submit
                </Button>
            </Container>
        </div>
    )

}

export default App ;