const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER';
const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}
export { doLogin, FETCH_USER_LOGIN_SUCCESS }