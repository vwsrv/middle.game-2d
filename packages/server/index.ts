import cors = require('cors');
import dotenv = require('dotenv');
import express = require('express');

dotenv.config();

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
