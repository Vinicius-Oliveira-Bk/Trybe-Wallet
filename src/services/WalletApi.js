const WALLET_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrentWallet = async () => {
  const response = await fetch(WALLET_BASE_API);
  const json = await response.json();

  return response.status === '404'
    ? Promise.reject(json) : Promise.resolve(json);
};

export default getCurrentWallet;
