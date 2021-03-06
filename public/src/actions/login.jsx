import axios from 'axios';
import { CLEAR_AUTH, SET_AUTH_JWT_FULFILLED, LOGOUT_USER } from '../reducers/login';

export function setUserAuthCredentials(user) {
  return {
    type: SET_AUTH_JWT_FULFILLED,
    payload: user
  };
}

export function clearAuthCredentials() {
  return {
    type: CLEAR_AUTH
  };
}

export function logout() {
  return {
    type: LOGOUT_USER
  };
}

export function loginUser(loginInfo, history) {
  const { email, password } = loginInfo;

  return dispatch => axios.post('/auth/login', {
    email,
    password
  })
  .then((res) => {
    const { token, id, is_admin } = res.data;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_id', id);
    localStorage.setItem('permissions', is_admin);
    dispatch(setUserAuthCredentials({ id, is_admin }));
    history.push('/admin');
  })
  .catch((err) => {
    const customError = {
      message: `error fetching user info in account_info action fetchUserInfo: ${err}`,
      name: 'user info post request from account_info component'
    };
    throw customError;
  });
}

export function logoutUser(history) {
  return dispatch => axios.get('/logout')
  .then(() => {
    history.push('/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('permissions');
    dispatch(logout());
    dispatch(clearAuthCredentials());
  })
  .catch((err) => {
    const customError = {
      message: `error with user logout: ${err}`,
      name: 'logoutUser function error'
    };
    throw customError;
  });
}
