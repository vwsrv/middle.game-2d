import cors = require('cors');
import dotenv = require('dotenv');
import express = require('express');
import { authMiddleware } from './middleware/auth';
import { initializeDatabase } from '@/shared/lib';
import apiRoutes from '@/pages/api';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use(apiRoutes);

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

const port = Number(process.env.SERVER_PORT) || 3002;

const startServer = async () => {
  await initializeDatabase();

  app.listen(port, () => {
    console.log(`➜ 🎸 Server is listening on port: ${port}`);
  });
};

startServer().catch(console.error);
