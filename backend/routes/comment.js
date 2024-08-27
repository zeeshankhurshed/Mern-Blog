import express from 'express';
import { allCommnets, postComment } from '../controllers/comment.js';

const router = express.Router();

// Create a comment
router.post('/create', postComment);
router.get('/getAll', allCommnets);

export default router;
