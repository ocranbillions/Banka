// import helpers from '../helpers/helpers';
import TransactionServices from '../services/transactionServices';

const TransactionController = {

  async getAllTransactions(req, res) {
    const transactions = await TransactionServices.getAllTransactions();
    return res.json({
      data: transactions,
      status: 200,
    });
  },

  async getTransactionById(req, res) {
    const result = await TransactionServices.getTransactionById(req.params.id);

    if (result.rows < 1) {
      return res.status(404).json({
        errorMessage: 'Transaction not found',
        status: 404,
      });
    }
    // Return retrived account
    const transactions = result.rows;
    return res.json({
      data: transactions,
      status: 200,
    });
  },

  async makeTransaction(req, res) {
    const result = await TransactionServices.makeTransaction(req.params.accountNumber, req.body);

    // Wrong account number
    if (result === false) {
      return res.status(404).json({
        errorMessage: 'The account with the given number was not found',
        status: 404,
      });
    }

    if (result === 'Insufficient funds') {
      return res.status(200).json({
        errorMessage: 'Sorry, you do not have enough funds for this request',
        status: 200,
      });
    }

    // Return newly created transaction
    const transaction = result;
    return res.status(201).json({
      data: transaction,
      status: 201,
    });
  },
};

export default TransactionController;

