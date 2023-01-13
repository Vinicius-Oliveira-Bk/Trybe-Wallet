import { REQUEST_WALLET_SUCCESS,
  ADD_EXPENSES,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  MODIFY_ITEM,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
  totalValue: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const TotalPrice = (state, payload) => {
  let total = 0;
  const { value: valueP, currency: currencyP } = payload;
  state.expenses.forEach((item) => {
    const { value, currency, exchangeRates, id } = item;
    const exchangeValue = +exchangeRates[currency].ask;
    const exchangeValueP = +exchangeRates[currencyP].ask;
    if (id === state.idToEdit) {
      total += (+(valueP) * exchangeValueP);
    } else {
      total += (+(value) * exchangeValue);
    }
  });
  return total;
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
  case EDIT_EXPENSE:
    return { ...state, editor: true, idToEdit: action.payload };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [...action.payload],
      totalValue: +(state.totalValue - action.decrease).toFixed(2) };
  case MODIFY_ITEM:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === state.idToEdit) {
          return { ...item, ...action.payload };
        }
        return item;
      }),
      editor: false,
      totalValue: TotalPrice(state, action.payload),
    };
  default:
    return state;
  }
};

export default walletReducer;
