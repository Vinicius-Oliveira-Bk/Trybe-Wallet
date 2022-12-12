// Coloque aqui suas actions

export const ADD_USER_INFO = 'ADD_USER_INFO';

export const addUser = (userInfo) => {
  console.log('testando action user');
  return {
    type: ADD_USER_INFO,
    payload: userInfo,
  };
};
