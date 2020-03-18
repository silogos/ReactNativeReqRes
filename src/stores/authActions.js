import store from './authStore';
import * as Api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const SESSION_KEY = 'reqres:session';

export async function loadSession() {
  const data = await AsyncStorage.getItem(SESSION_KEY);
  if (data) {
    const item = JSON.parse(data);
    store.setToken(item.token)
    return item;
  }
  return null;
}

export async function login(username, password) {
  const response = await Api.login(username, password);
  AsyncStorage.setItem(SESSION_KEY, JSON.stringify(response.data));
  
  return response;
}
