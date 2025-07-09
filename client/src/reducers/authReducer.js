const authReducer = (state, action) => {
  switch (action.type) {
    case "register":
      return {
        ...state,
        [action.target]: action.value,
      };
    case "login":
      return state;
    default:
      console.log("invalid actione type");
      return state;
  }
};

export default authReducer;
