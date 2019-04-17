/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';

// routes
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import tellerRoutes from './routes/tellerRoutes';

const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Welcome to Banka!');
});

// Handles auth routes
server.use('/api/v1/auth', authRoutes);

// Handles user routes
server.use('/api/v1/users', userRoutes);

// Handles all account routes
server.use('/api/v1/accounts', accountRoutes);

// Handles all transactions routes
server.use('/api/v1/transactions', transactionRoutes);

// Handles all teller routes
server.use('/api/v1/tellers', tellerRoutes);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server is listening on port ${port}!`);
});

// Export for testing
export default server;