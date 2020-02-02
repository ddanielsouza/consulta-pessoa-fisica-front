import axios from 'axios';
const baseURL = 'http://127.0.0.1:8003/api';

export default {
    getScore(id){
        return new Promise(async (resolve, reject) =>{
            try{
                const {data} = await axios.get(`${baseURL}/client-additional-infos/client/${id}/score`);
                resolve((data || {}).data);
            }catch(e){
                reject(e);
            }
        })
    }
}