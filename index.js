import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config();
import { customAlphabet } from 'nanoid';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const nanoid  = customAlphabet('1234567890abcdef', 10);

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;
  const id = nanoid();
  res.json({
    original_url: url,
    short_url: `${process.env.BASE_URL}/api/shorturl/${id}` 
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log('App is listening on port ' + listener.address().port);
});
