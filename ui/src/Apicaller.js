import axios from 'axios';

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
    return new Promise(async (resolve, reject) => {
        const res = await axios.get(changeableUrl);
        // console.log(res);
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
        // console.log(res.data);
        return(res.data);

    } catch (error) {
        console.log(error);
        return error;
  }
};

export const patchReq = async (id, body) => {
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

export const loginReq = (data) => {
    console.log(data);
    var changeableUrl = `${url}/login`;
    return new Promise(async (resolve, reject) => {
        const res = await axios.post(changeableUrl, data);
        // console.log(res);
        if(res.data == true){
            // console.log('success');
            resolve({token: res.headers.token});
            
        }else{
            // console.log("reject");
            reject( 'Cannot perform post requset');
        }
    });
};

export const registerReq = (data) => {
    console.log(data);
    var changeableUrl = `${url}/register`;
    return new Promise(async (resolve, reject) => {
        const res = await axios.post(changeableUrl, data);
        console.log(res);
        if(res.data == true){
            // console.log('success');
            resolve( 'Success');
            
        }else{
            // console.log("reject");
            reject( 'Cannot perform post requset');
        }
    });
};

export const validateToken = (token) => {
    // console.log(token);  
    var changeableUrl = `${url}/checkValidation`
    return new Promise(async (resolve, reject) => {
        const res = await axios.post(changeableUrl, token);
        console.log(res);
        if(res.data == "Invalid or Expired Token"){
            reject("Invalid or Expired Token");
        }
        else if(res.data == "Access Denied"){
            reject("Access Denied");
        }else{
            resolve({isadmin: res.data.isAdmin});
        }
    });
};

export const checkAdmin = (token) => {
    var changeableUrl = `${url}/checkValidation`
    return new Promise(async (resolve, reject) => {
        const res = await axios.post(changeableUrl, token);
        console.log(res);
        if(res.data == "Invalid or Expired Token"){
            reject("Invalid or Expired Token");
        }
        else if(res.data == "Access Denied"){
            reject("Access Denied");
        }else{
            resolve(res.data.isAdmin);
        }
    });
}

export const makeAdmin = (data) => {
    console.log(data, data.username, data.isAdmin);
    var changeableUrl = `${url}/makeAdmin`
    return new Promise(async (resolve, reject) => {
        const res = await axios.patch(changeableUrl, data);
        console.log(res);
        if(res.data == "No need to update user"){
            resolve("Success");
        }
        else if(res.data == "Username invalid"){
            reject("Username Invalid");
        }else{ 
            resolve("Success");
        }
        
    });
}