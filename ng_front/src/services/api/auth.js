import axios from "axios";
import URL from "./api.js";

export function signUp(userSignUp) {
  return axios.post(`${URL}/sign-up`, userSignUp);
}

export function signIn(userSignin) {
  return axios.post(`${URL}/sign-in`, userSignin);
}

const requestAuthApi = {
  signUp,
  signIn,
};

export default requestAuthApi;
