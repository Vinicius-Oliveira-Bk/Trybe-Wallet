import { REQUEST_WALLET_SUCCESS, ADD_EXPENSES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
  totalValue: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_WALLET_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((key) => key !== 'USDT'),
    };
  case ADD_EXPENSES:
    return { ...state,
      expenses: [...state.expenses, action.payload],
      totalValue: +(
        state.totalValue + (+action.value * +action.exchange)
      ).toFixed(2) };
  default:
    return state;
  }
};

export default walletReducer;
