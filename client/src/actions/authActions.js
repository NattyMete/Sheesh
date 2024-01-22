import { loginUser as apiLoginUser, registerUser as apiRegisterUser } from "../services/api";


export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}
export const loginFail = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error,
    };
}

