import { loginUser as apiLoginUser, registerUser as apiRegisterUser } from "../services/api";


export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";

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
export const updateProfileSuccess = (user) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: user,
    };
}

