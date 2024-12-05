import actionTypes from "./actionTypes";
import { apiLogin, apiRegister } from "../../services/auth";

export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    if (response?.data?.response.err === 0) {
      // localStorage.setItem("token", response.data?.response.token);
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data?.response.err === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

export const logout = () => {
  return (dispatch) => {
    // Dispatch action để xóa trạng thái trong Redux
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };
};
