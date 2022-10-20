import AsyncStorage from '@react-native-async-storage/async-storage';
export const NODE = {
  mainnet: 'https://cardano-mainnet.blockfrost.io/api/v0',
  testnet: 'https://cardano-testnet.blockfrost.io/api/v0',
};

export const NETWORK_ID = {
  mainnet: 'mainnet',
  testnet: 'testnet',
};
export const getStorage = key => AsyncStorage.getItem(key);
export const setStorage = (key, value) => AsyncStorage.setItem(key, value);
export const clearStorage = async () => {
  await AsyncStorage.clear();
};

const Constants = {
  STORAGE: {
    encryptedKey: 'encryptedKey',
    network: 'network',
    currency: 'currency',
    accounts: 'accounts',
    currentAccount: 'currentAccount',
    onboardingViewed: 'onboardingViewed',
    access_token: 'access_token',
    connectedAuthServer: 'connectedAuthServer',
    firstDownload: 'firstDownload',
  },
  network: {
    mainnet: 1,
    testnet: 0,
  },
  apiKey: {
    mainnet: 'mainnetUxZ1oGgRnSRbrsR0DUuyNY2hCL5tGqBy',
    testnet: 'testnetJe6W7FM1Jwkh0PxNMZt9OzNND3T1mS1T',
  },
  SCREENS: {
    register: 'Register',
    login: 'Login',
    main: 'Main',
    home: 'Home',
    friend: 'Friend',
    chat: 'Chat',
    notification: 'Notification',
    live: 'Live',
    setting: 'Setting',
    messager: 'Messager',
  },
  getStorage,
  setStorage,
  isManager: role => role === 3,
  baseServer: 'http://10.0.2.2:8888',
  server: 'http://10.0.2.2:8888/api/v1/',
};
export default Constants;
