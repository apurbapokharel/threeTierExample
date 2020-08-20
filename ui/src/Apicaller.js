import axios from 'axios';
import bodyparser from 'body-parser';

const url  = "http://localhost:3000"

export const postReq = (data) => {
    
    try {
        data.map(async(val, key) => {
            const res = await axios.post(`${url}/post`, val);
            console.log(res.data);
        });
    } catch (error) {
        return error;
  }
}