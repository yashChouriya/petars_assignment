import axios from "axios";

const token = localStorage.getItem('token');

const AuthApiClient = axios?.create({
    baseURL: 'http://127.0.0.1:8000/',

});

export default AuthApiClient;