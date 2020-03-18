import * as remx from 'remx';

const initialState = {
  employees: {
    data: [],
    shouldRefresh: false,
  }
};

const state = remx.state(initialState);

const setters = remx.setters({
  setEmployees(data) {
    state.employees.data = data;
  }
});

const getters = remx.getters({
  getEmployees() {
    return state.employees.data;
  }
});

export default {
  ...getters,
  ...setters,
};
