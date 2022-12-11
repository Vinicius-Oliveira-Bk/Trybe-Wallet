// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INITIAL_STATE:
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default userReducer;
