import express from 'express';
import { deleteUsers, getAllUsers, login, logout, register, updateUser } from '../controllers/user.js';

const router =express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.get('/getAll',getAllUsers)
router.delete('/delete/:id',deleteUsers)
router.patch('/update/:id',updateUser)

export default router;