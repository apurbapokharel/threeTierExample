

//reducer how actiom transform action to next state. based on action it chages state vvalue
const tokenReducer = (state = " ", action ) => {
  switch(action.type){
    case "ASSIGNMENT":
      return action.payload;
    case "DISMISSION":
      return action.payload;
    default:
      return state;
  };
};

export default tokenReducer;


//store i.e global state



// store.subscribe(() => console.log(store.getState()));

// // dispatch execute action to reducer.
// store.dispatch(assignToken());
