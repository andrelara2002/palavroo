import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.dicionario-aberto.net'
})

export async function getWordMeaning(word) {
    return await api.get(`/word/${word}`);
}