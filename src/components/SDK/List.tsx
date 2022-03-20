
/*class List {


    lastBidder: {
        addressBidder:string,
        bid:number
    };
    addressContractToken: string;
    addressMinter: string;
    paused: boolean;
    _royaltiesAddr: Array<string>;
    _royaltiesPercent: Array<number>;
    _tokenInAuction: Array<number>;
    _priceToken: Array<number>;
    listingId: number;
    minBid: number;
    startDate: number;
    timeAuction: number;
    direct: boolean;
    tokenType: number;

    constructor(addressContractToken:string,addressMinter:string,_royaltiesAddr:Array<string>,_royaltiesPercent:Array<number>,_tokenInAuction:Array<number>,_priceToken:Array<number>,minBid:number,startDate:number,timeAuction:number,direct:boolean,tokenType:number){
        this.lastBidder = {addressBidder:"",bid:0};
        this.addressContractToken = addressContractToken;
        this.addressMinter;
        this.paused = false;
        this._royaltiesAddr = _royaltiesAddr;
        this._royaltiesPercent = _royaltiesPercent;
        this._tokenInAuction = _tokenInAuction;
        this._priceToken = _priceToken;
        this.listingId = 0;
        this.minBid = minBid;
        this.startDate = startDate;
        this.timeAuction = timeAuction;
        this.direct = direct;
        this.tokenType = tokenType;
    }

}*/



interface List {
    lastBidder: {
        addressBidder:string,
        bid:number
    };
    addressContractToken: string;
    addressMinter: string;
    paused: boolean;
    _royaltiesAddr: Array<string>;
    _royaltiesPercent: Array<number>;
    _tokenInAuction: Array<number>;
    _priceToken: Array<number>;
    listingId: number;
    minBid: number;
    startDate: number;
    timeAuction: number;
    direct: boolean;
    tokenType: number;
}

export default List ;