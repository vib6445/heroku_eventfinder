"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRoute = () => {
    const router = (0, express_1.Router)();
    // router.post('/users', createUser);
    // router.get('/users', extractJWT, getAllUsers);
    // router.patch('/users/:id', extractJWT, updateUser);
    // router.delete('/users/:id', extractJWT, deleteUser);
    // router.get('/validateToken', extractJWT, validateToken);
    // router.get('/users/:id', getUserById);
    router.post('/register', user_controller_1.register);
    router.post('/login', user_controller_1.login);
    router.post('/saveEvent', user_controller_1.saveEvent);
    // router.post('/login/google', loginGoogle);
    return router;
};
exports.userRoute = userRoute;