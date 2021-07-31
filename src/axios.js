import axios from "axios";

export default async function(url){
    try{
        let response = await axios(url);
        return response.data;
    } catch(error){
        console.log(error);
    }
}