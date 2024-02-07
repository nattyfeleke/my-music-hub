import express, { Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db';


dotenv.config();

import musicRoute from './routes/music' 
import dashboardRoute from './routes/dashboard' 


const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000;
connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
  });
app.use('/api/music', musicRoute);
app.use('/api/dashboard', dashboardRoute);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });