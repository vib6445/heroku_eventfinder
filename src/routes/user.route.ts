import { Router } from 'express';
import { register, login, saveEvent, getUserById, getUsers, recommendEvent } from '../controllers/user.controller';
import extractJWT from '../middleware/extractjwt';

const userRoute = () => {
    const router = Router();
  
    // router.post('/users', createUser);
  
    // router.get('/users', extractJWT, getAllUsers);
  
    // router.patch('/users/:id', extractJWT, updateUser);
  
    // router.delete('/users/:id', extractJWT, deleteUser);
  
    // router.get('/validateToken', extractJWT, validateToken);
  
    // router.get('/users/:id', getUserById);
  
    router.post('/register', register);
  
    router.post('/login', login);
  
    router.post('/saveEvent',  saveEvent);

    router.post('/getUserById', getUserById);
    
    router.get('/getAllUsers', getUsers)

    router.post('/recommendEvent', recommendEvent)
    // router.post('/login/google', loginGoogle);
  
    return router;
  };
  
  export { userRoute };

