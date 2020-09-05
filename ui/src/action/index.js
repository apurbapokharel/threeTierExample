// action what to do

export const assignToken = (value) => {
  return {
    type: "ASSIGNMENT",
    payload: value,
  };
};

export const clearToken = () => {
  const value = " "
  return {
    type: "DISMISSION",
    payload: value,

  };
};

export const toggleStatus = () => {
    return {
      type: "SIGN_IN",  
    };
  };

export const adminStatus = (value) => {
  return {
    type: "ADMIN",
    payload: value,  
  };
};

export const changeRenderer = () => {
  return {
    type: "CHANGE",
  };
};
