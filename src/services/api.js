import http from '../utils/http';

let API_URL = 'https://reqres.in/api';
let API_URL_2 = 'http://dummy.restapiexample.com/api/v1';
// ------- Auth ----------------------

export const login = (username, password) => {
  return http.post(`${API_URL}/login`, {
    username,
    password,
  });
};


// ------- Employee ----------------------

export const getEmployees = () => {
  return http.get(`${API_URL_2}/employees`);
};

export const getEmployee = (id) => {
  return http.get(`${API_URL_2}/employee/${id}`);
};

export const createEmployee = (name, salary, age) => {
  return http.post(`${API_URL_2}/create`, {
    name,
    salary,
    age
  });
};

export const updateEmployee = (id, name, salary, age) => {
  return http.put(`${API_URL_2}/update/${id}`, {
    name,
    salary,
    age
  });
};

export const deleteEmployee = (id) => {
  return http.delete(`${API_URL_2}/delete/${id}`);
};
