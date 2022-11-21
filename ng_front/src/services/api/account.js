import axios from "axios";

import URL from "./api.js";

function config(token) {
  return { headers: { authorization: `Bearer ${token}` } };
}

function getBalance(token) {
  return axios.get(`${URL}/balance`, config(token));
}

function postTransaction(token, username, value) {
  return axios.post(`${URL}/transaction/${username}`, { ammount: Number(value) }, config(token));
}

function getTransactions(token, type, date) {
  let queryString = [];
  if (type) {
    queryString.push(`type=${type}`);
  }
  if (date) {
    queryString.push(`date=${new Date(date).toLocaleDateString("pt-br")}`);
  }

  if (queryString.length === 0) return axios.get(`${URL}/transaction`, config(token));
  else return axios.get(`${URL}/transaction?${queryString.join("&")}`, config(token));
}

const requestAccountApi = {
  getBalance,
  getTransactions,
  postTransaction,
};

export default requestAccountApi;
