import { AUTH, LOGIN  } from "../constants/actionTypes";

import * as api from "../api/index";

export const loginUser = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({
        type: AUTH,
         data, ///data where we store data
      });
    navigate("/posts");
  } catch (error) {
    console.log(error);
  }
};

export const signupUser = (formData, navigate) => async (dispatch) => {

  try {
    const { data } = await api.signup(formData);
    dispatch({
        type: AUTH,
        data, ///data where we store data
      });
    navigate("/posts");
  } catch (error) {
    console.log(error);
  }
};
