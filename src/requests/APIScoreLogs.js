import axios from 'axios';
const baseURL = 'http://127.0.0.1:8004/api';

export default {
    saveLog(log){
        return new Promise(async (resolve, reject) =>{
            try{
                const {data} = await axios.post(`${baseURL}/log-consultation-scores`, log);
                resolve((data || {}).data);
            }catch(e){
                reject(e);
            }
        })
    }
}