require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html', {
    message: ''
  });
});

app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;
  console.log(url);
  res.json({
    original_url: url,
    short_url: Math.round((Math.random() + 1) * 1000000000000)
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log('App is listening on port ' + listener.address().port);
});
