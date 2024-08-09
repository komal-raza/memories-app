import { LOGIN, SIGNUP, AUTH, LOGOUT } from "../constants/actionTypes";

export const auth = (state = [], action) => {
  switch (action.type) {
     case LOGIN:

      // console.log(action?.data);
      localStorage.setItem("LocalUser", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
      
    

    case AUTH:
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};
