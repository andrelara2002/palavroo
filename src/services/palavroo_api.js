import axios from "axios";

const app = axios.create({
    baseURL: 'https://palavroo-api.herokuapp.com'
})

export function getAllWords() {
    return app.get('/words');
}

export function getRandomWord() {
    return app.get('/random');
}

export function getRandomWithSize(size) {
    return app.get(`/randomsize/${size}`);
}