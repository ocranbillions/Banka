/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
// import db from './jsdb/db';

// routes
import accountRoutes from './routes/accountRoutes';


const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Welcome to mobileBank');
});

// server.use('/api/v1/', (req, res) => {
//   const { accounts } = db;
//   res.json({
//     data: accounts,
//     status: 'success',
//   });
// });

// Handles all account routes
server.use('/api/v1/accounts', accountRoutes);


const port = process.env.PORT || 1000;
server.listen(port, () => {
  console.log(`server is listening on port ${port}!`);
});

// Export for testing
export default server;
