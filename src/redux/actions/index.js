// Coloque aqui suas actions
import getCurrentWallet from '../../services/WalletApi';

export const ADD_USER_INFO = 'ADD_USER_INFO';

// action types
export const REQUEST_WALLET = 'REQUEST_WALLET';
export const REQUEST_WALLET_SUCCESS = 'REQUEST_WALLET_SUCCESS';
export const REQUEST_WALLET_ERROR = 'REQUEST_WALLET_ERROR';

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
