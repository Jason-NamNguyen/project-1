import axios from "../Utils/axiosCustomize"
const postCreateNewUser = (email, password, username, role, image) => {
    //Submit Data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}
const getAllUser = () => {
    return axios.get('api/v1/participant/all');
}
const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id)
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}
const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password, delay: 1000 });
}

const postRegister = (username, email, password) => {
    return axios.post(`api/v1/register`, { username, email, password });
}

const getQuizbyUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getDetailQuiz = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`)
}

export {
    postCreateNewUser, getAllUser, putUpdateUser, deleteUser, getUserWithPaginate, postLogin, postRegister, getQuizbyUser, getDetailQuiz
} 