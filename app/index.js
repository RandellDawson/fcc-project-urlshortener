import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import shortUrlRoutes from './routes/short-url.js';

const app = express();

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/app/public`));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/app/views/index.html');
});

app.use('/api', shortUrlRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const listener = app.listen(process.env.PORT, () => {
  console.log('App is listening on port ' + listener.address().port);
});
