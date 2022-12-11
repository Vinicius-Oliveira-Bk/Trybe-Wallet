// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  email: '',
  password: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INITIAL_STATE:
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
