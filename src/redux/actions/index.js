// Coloque aqui suas actions
import getCurrentWallet from '../../services/WalletApi';

// action types
export const ADD_USER_INFO = 'ADD_USER_INFO';

export const REQUEST_WALLET = 'REQUEST_WALLET';
export const REQUEST_WALLET_SUCCESS = 'REQUEST_WALLET_SUCCESS';
export const REQUEST_WALLET_ERROR = 'REQUEST_WALLET_ERROR';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const MODIFY_ITEM = 'MODIFY_ITEM';

export const addUser = (userInfo) => ({
  type: ADD_USER_INFO,
  payload: userInfo,
});

// action creators
const requestWallet = () => ({
  type: REQUEST_WALLET,
});

const responseWalletSuccess = (walletReturn) => ({
  type: REQUEST_WALLET_SUCCESS,
  payload: walletReturn,
});

const responseWalletError = (error) => ({
  type: REQUEST_WALLET_ERROR,
  payload: {
    error,
  },
});

const addExpense = (expenses) => {
  const { currency, exchangeRates } = expenses;
  return {
    type: ADD_EXPENSES,
    payload: expenses,
    value: expenses.value,
    exchange: exchangeRates[currency].ask,
  };
};

export const fetchWallet = () => {
  console.log('fetchWallet');
  return async (dispatch) => {
    // fetch começou
    dispatch(requestWallet);
    // request
    try {
      const response = await getCurrentWallet();

      // response / error
      dispatch(responseWalletSuccess(response));
    } catch (error) {
      dispatch(responseWalletError(error));
    }
  };
};

export const requestActualCurrency = (expenses) => async (dispatch) => {
  try {
    const response = await getCurrentWallet();

    dispatch(addExpense({ ...expenses, exchangeRates: response }));
  } catch (error) {
    dispatch(responseWalletError(error));
  }
};

export const deleteExpense = (expenses, decrease) => ({
  type: DELETE_EXPENSE,
  payload: expenses,
  decrease,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const modifyItem = (data) => ({
  type: MODIFY_ITEM,
  payload: data,
});
