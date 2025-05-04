import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js'; // Import the database connection
import userRoutes from './routes/user.routes.js'; // Import the user routes
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


connect();

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie parser middleware
app.use(cors());

app.use('/users', userRoutes); // Use the user routes
app.use('/projects',projectRoutes);
app.use('/ai', aiRoutes); // Use the AI routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;