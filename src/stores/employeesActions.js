import store from './employeesStore';

import * as Api from '../services/api';

export async function fetchEmployees() {
  const response = await Api.getEmployees()
  let data = response.data.data
      data = Object.keys(data).map((key) => data[key])
  store.setEmployees(data)
  
  return data;
}

export async function fetchEmployee(userId) {
  const response = await Api.getEmployee(userId)
  return response.data;
}

export async function createEmployee(formData) {
  let { name, salary, age } = formData
  const response = await Api.createEmployee(name, salary, age)
  return response.data;
}

export async function updateEmployee(userId, formData) {
  let { name, salary, age } = formData
  const response = await Api.updateEmployee(userId, name, salary, age)
  return response.data;
}

export async function deleteEmployee(userId) {
  const response = await Api.deleteEmployee(userId)
  return response.data;
}

// export async function fetchProfile(userId) {
//   if (!userId) userId = authStore.getUserId();
//   const response = await Api.getEmployees()
//   return response.data;
// }

// export async function fetchProfile(userId) {
//   if (!userId) userId = authStore.getUserId();
//   const response = await Api.getEmployees()
//   return response.data;
// }

// export async function fetchProfile(userId) {
//   if (!userId) userId = authStore.getUserId();
//   const response = await Api.getEmployees()
//   return response.data;
// }
