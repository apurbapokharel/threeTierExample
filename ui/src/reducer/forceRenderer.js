const forceRenderer = (state = false, action ) => {
    switch(action.type){
      case "CHANGE":
        return !state;
      default:
        return state;
    }
};
  
export default forceRenderer;
