import express from 'express'

import { findAllUsers, findUserById, saveUser, updateById } from '../controller/UserController';

export default(router: express.Router) => {
    router.post("/user/", saveUser);
    router.get("/user/", findAllUsers);
    router.get("/user/:id", findUserById);
    router.patch("/user/:id", updateById);
}