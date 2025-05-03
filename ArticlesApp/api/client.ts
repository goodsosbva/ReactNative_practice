import axios from 'axios';

const baseURL = __DEV__
    ? 'http://localhost:1337'
    : 'http://articles.example.com';

const client = axios.create({
    baseURL,
})

export function applyToken(token: string) {
    client.defaults.headers.Authorization = `Bearer ${token}`;
}

export function clearToken() {
    delete client.defaults.headers.common.Authorization;
}

export default client;
