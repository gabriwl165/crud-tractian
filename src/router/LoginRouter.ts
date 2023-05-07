import express from 'express'

import { login } from '../controller/LoginController';

export default(router: express.Router) => {
    router.post("/login/", login);
}