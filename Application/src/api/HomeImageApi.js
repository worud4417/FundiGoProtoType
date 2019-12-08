const url = require("./IpAddress");

export function fetchGetHomeImageList(){
    let uri = url.url+"/homeImage/ImageList";

    return fetch(uri,{
        method:"GET"
    }).then((response)=>response.json())
    .then((responseJson)=>{
        return responseJson;
    }).catch((error)=>{
        if(error.message == "Network request failed"){
            alert("네트워크 오류");
        }
        return {error:false};
    })
}

export async function GetHomeMainImage(target){
    let uri = url.url + "/homeImage/homeMainImage/" + target;
    return uri;
}

export default {fetchGetHomeImageList,GetHomeMainImage};