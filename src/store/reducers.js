const initialState = {
    user: {
      email: '',
      password: '',
      authToken: null,
    }
};
  
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { 
        ...state, 
        user: action.user,
      };
    
    case 'LOGOUT':
      return {
        user: action.user,
      }
    default:
      return state;
  }
};
  
  export default authReducer;
  