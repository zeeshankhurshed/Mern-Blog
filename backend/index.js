import express from 'express';
import { connectDB } from './config/config.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.js';
import blogRouter from './routes/blog.js';
import commentRouter from './routes/comment.js';
import cookieParser from 'cookie-parser';
import { errorMiddleWare } from './middleware/errorMiddleware.js';


dotenv.config();
connectDB(); // Connect to the database

const app = express();
// Middleware
app.use(cookieParser());

//middlewares
app.use(express.json({limit:'10mb',extended:true}));
app.use(express.urlencoded({limit:'10mb',extended:true}));
app.use(cors({credentials:true,origin: 'http://localhost:5173'}));
app.use('/user',userRouter);
app.use('/blog',blogRouter);
app.use('/comment', commentRouter);


app.use(errorMiddleWare);
// Start the server and listen on the specified port
const PORT = process.env.SERVER_PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
