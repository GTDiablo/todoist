import * as express from 'express';
import usersRouter from './app/users';
import mongoose from 'mongoose';

const mongoDB = 'mongodb://localhost/todoist';
mongoose.connect(mongoDB, {});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

app.get('/api', (req, res) => {
  res.send('Hello world');
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
