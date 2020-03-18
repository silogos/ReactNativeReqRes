import * as remx from 'remx';

const initialState = {
  token: null
};

const state = remx.state(initialState);

const setters = remx.setters({
  setToken(token) {
    state.token = token;
  }
});

const getters = remx.getters({
  getToken() {
    return state.token;
  }
});

export default {
  ...getters,
  ...setters,
};
