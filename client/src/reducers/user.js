const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH" || "set_auth":
      return {
        ...state,
      };
    default:
      console.error("invalid type");
      return state;
  }
};

export default userReducer;
