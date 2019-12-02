import React from 'react';
import Axios from "axios";

const baseURL = 'http://dev.entrevista.dicasmei.com.br/api/';

const cred = {
    username: 'api_user',
    password: 'api_entrevista'
};

let currentToken = {
    token: null,
    expiresIn: null
};

function verifyToken() {
    if (currentToken.expiresIn) {
        const currentTime = new Date();
        return currentTime.getTime() > currentToken.expiresIn
    }
    return false
}

const axios = Axios.create({
    baseURL
});

async function getToken() {
    await axios.post(
        'login_check',
        {...cred}
    ).then((res) => {
        currentToken = res.data
    });
}

export default {
    getBills: async (cnpj, year = '2019', validateUser = 'S') => {
        const validToken = verifyToken();
        if (!validToken) await getToken();
        const config = {
            headers: { 'Authorization': "bearer " + currentToken.token}
        };
        return await axios.get(
            `boleto/extrato/${cnpj}/${year}/${validateUser}`,
            config
        ).then((res) => res.data).catch((err) => err)
    }
};