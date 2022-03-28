
import Creators from "./Creators";

interface MetaTokens {
    Quantity:string,
    Format:string,
    Name:string,
    Symbole:string,
    Category:string,
    Edition:string,
    Family:string,
    Description:string,
    Creator:Array<Creators>,
    Traits:any,
    
}

export default MetaTokens ;