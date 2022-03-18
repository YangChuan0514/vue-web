import axios from "axios";
export async function upLoadServer(){
    let data = {};
    await axios.get('/api/upLoad').then(res => {
        data = res;
    })
    return data
}