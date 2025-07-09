const userReducer = (state, { type, isAuthenticated, user }) => {
  switch (type) {
    case "SET_USER":
    case "set_user":
      return {
        ...state,
        isAuthenticated,
        user,
      };
    default:
      console.error("invalid type");
      return state;
  }
};

export default userReducer;
