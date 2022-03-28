/**
 * 
 * @param endpoint exemple : "getMyAddress" "addTokenAddress"
 * @param method exemple : "POST" "GET" "PUT"
 * @param body exemple : JSON.stringify({myAddress:this.getMySignedAddress()})
 * @returns 
 */
const  Fetch = async (endpoint:string,method:string,body:any,JWT:string) => {
    return fetch(`http://localhost:8080/${endpoint}`, {
    method: method, //ou POST, PUT, DELETE, etc.
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
    },
    body: body, 
    }).then((res:any)=>{
        return res;
    }).catch((err:any)=>{
        return err
    });
}

export default Fetch;