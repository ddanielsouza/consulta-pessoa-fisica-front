import axios from 'axios';
const baseURL = 'http://127.0.0.1:8001/api';

export default {
    getClients(params){
        return new Promise(async (resolve, reject) =>{
            try{
                const {data} = await axios.get(`${baseURL}/clients`, {params});
                resolve((data || {}).data);
            }catch(e){
                reject(e);
            }
        })
    }
}