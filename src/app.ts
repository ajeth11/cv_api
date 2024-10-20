import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import router from './router/index'
import cors from 'cors';
import middleware from './middleware/middleware'


const app = express();

dotenv.config();

connectDB();

app.use(cors());

// middlewares
app.use([express.json(), express.urlencoded({ extended: true }), middleware.contentTypeCheckMiddleware, middleware.sanitizeHtmlMiddleware]);

// app.use("/api", router);

//Health API
app.get("/health", (req, res) => { res.send(`server is alive!`) })

// Routes integration
app.use("/api", router);

// app.get('/', (req: any, res: any) => {
//   res.send('Hello World');
// });

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
