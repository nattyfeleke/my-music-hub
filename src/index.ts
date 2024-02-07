import express, { Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db';


dotenv.config();

import musicRoute from './routes/music' 
import dashboardRoute from './routes/dashboard' 
import path from 'path';


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

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
} 
 app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });