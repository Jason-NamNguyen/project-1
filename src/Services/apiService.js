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

const postSubmitQuiz = (data) => {
    console.log('>>>check copy data: ', { ...data })
    return axios.post(`/api/v1/quiz-submit`, { ...data });
}

const getQuizbyUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getDetailQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const getAllQuizByAdmin = () => {
    return axios.get('api/v1/quiz/all')
}

const postCreateNewQuiz = (description, name, type, image) => {
    //Submit Data
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', type);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data);
}

const putUpdateQuiz = (id, description, name, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image)
    return axios.put('api/v1/quiz', data)
}
const deleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`, { data: { id: quizId } });
}
export {
    postCreateNewUser, getAllUser, putUpdateUser, deleteUser, getUserWithPaginate,
    postLogin, postRegister, getQuizbyUser, getDetailQuiz, postSubmitQuiz,
    postCreateNewQuiz, getAllQuizByAdmin, putUpdateQuiz, deleteQuiz
} 