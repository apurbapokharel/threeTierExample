import axios from 'axios';
import bodyparser from 'body-parser';

const url  = "http://localhost:3000"

export const postReq = (data) => {
    console.log(data);
    let changeableUrl = `${url}/post`;
return new Promise((resolve, reject) => {
    data.map(async(val, key) => {
        const res = await axios.post(changeableUrl, val);
        if(!res.data.message){
            resolve();
        }else{
            reject( 'Cannot perform post requset');
        }
    })
});
};

export const getReq = async (searchItem) => {
    console.log("aoi", searchItem);
    var changeableUrl = `${url}/get`;
    if(searchItem){
        changeableUrl = `${changeableUrl}/${searchItem}`;
    }
//     try {
//         const res = await axios.get(changeableUrl);
//         console.log("res data", res.data);
//         console.log("res", res);
//         console.log("length", res.data.length);
//         if(res.data.length){
//             return(res.data);
//         }
//         else{
//             return([res.data]);
//         }   
//     } catch (error) {
//         console.log(error);
//         return error;
//   }
    return new Promise(async (resolve, reject) => {
        const res = await axios.get(changeableUrl);
        console.log(res);
        if(res.data){
            if(res.data.length){
                resolve(res.data);
            }else{
                resolve([res.data]);
            }
            
        }else{
            reject( 'Cannot perform post requset');
        }
    });
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
};

export const patchReq = async (id, body) =>{
    var changeableUrl = `${url}/patch/${id}`;
    try {
        const res = await axios.patch(changeableUrl, body);
        console.log(res.data);
        return(res.data);

    } catch (error) {
        console.log(error);
        return error;
  }
};
