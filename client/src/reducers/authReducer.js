const authReducer = (state, { type, target, value }) => {
  switch (type) {
    case "register":
      return {
        ...state,
        [target]: value,
      };
    case "login":
      return {
        ...state,
        [target]: value,
      };
    case "forgotPassword":
      return {
        ...state,
        [target]: value,
      };
    default:
      console.log("invalid actione type");
      return state;
  }
};

export default authReducer;
