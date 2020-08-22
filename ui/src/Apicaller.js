import axios from 'axios';
import bodyparser from 'body-parser';

const url  = "http://localhost:3000"

export const postReq = (data) => {
    console.log(data);
    try {
        data.map(async(val, key) => {
            const res = await axios.post(`${url}/post`, val);
            if(res.data){
                console.log(res.data);
                return true;
            }
        });
    } catch (error) {
        console.log(error);
        // return error;
        return false;
  }
};

export const getReq = async (searchItem) => {
    console.log("aoi", searchItem);
    var changeableUrl = `${url}/get`;
    if(searchItem){
        changeableUrl = `${changeableUrl}/${searchItem}`;
    }
    try {
        const res = await axios.get(changeableUrl);
        console.log(res.data);
        console.log(res);
        console.log(res.data.length);
        if(res.data.length){
            return(res.data);
        }
        else{
            return([res.data]);
        }   
    } catch (error) {
        console.log(error);
        return error;
  }
};

export const deleteReq = async (id) => {
    console.log(id);
    var changeableUrl = `${url}/delete/${id}`;
    try {
        const res = await axios.delete(changeableUrl);
        console.log(res.data);
        return(res.data);

    } catch (error) {
        console.log(error);
        return error;
  }
} 