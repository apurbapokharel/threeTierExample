const adminReducer = (state = false, action ) => {
    switch(action.type){
      case "ADMIN":
        return action.payload;
      default:
        return state;
    }
};
  
export default adminReducer;