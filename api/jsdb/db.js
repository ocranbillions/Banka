export default {
  accounts: [
    {
      id: 1,
      accountNumber: 5623541235,
      createdOn: '22-02-2019 10:53:58',
      firstName: 'Babajide',
      lastName: 'Bayo',
      email: 'doubleB@yahoo.com',
      type: 'savings',
      balance: 25000.01,
      status: 'active',
    },
    {
      id: 2,
      accountNumber: 1221125232,
      createdOn: '22-02-2019 10:53:58',
      firstName: 'Stephen',
      lastName: 'Smith',
      type: 'savings',
      balance: 8000.00,
      status: 'active',
    },
    {
      id: 3,
      accountNumber: 7785412532,
      createdOn: '22-02-2019 10:53:58',
      firstName: 'Joyce',
      lastName: 'Akpan',
      type: 'current',
      balance: 54200.00,
      status: 'active',
    },
  ],

  transactions: [
    {
      transactionId: 1,
      createdOn: '12-02-2019 14:53:02',
      type: 'credit',
      accountNumber: 5522446523,
      owner: 22,
      amount: 8500.00,
      cashier: 5,
      oldBalance: 8000.00,
      newBalance: 16500.00,
      status: 'completed',
    },
    {
      transactionId: 2,
      createdOn: '12-02-2019 14:53:02',
      type: 'credit',
      accountNumber: 3325223654,
      owner: 13,
      amount: 5000.00,
      cashier: 2,
      oldBalance: 54200.00,
      newBalance: 59200.00,
      status: 'completed',
    },
    {
      transactionId: 1,
      createdOn: '12-02-2019 14:53:02',
      type: 'debit',
      accountNumber: 1124523214,
      owner: 34,
      amount: 10000.00,
      cashier: 5,
      oldBalance: 25000.00,
      newBalance: 35000.00,
      status: 'completed',
    },
  ],

  users: [
    {
      id: 1,
      email: 'sammiestt@gmail.com',
      firstName: 'Samuel',
      lastName: 'Ocran',
      password: 'secret',
      type: 'client',
      isAdmin: 0,
    },
    {
      id: 2,
      email: 'davido@yahoo.com',
      firstName: 'David',
      lastName: 'Osaro',
      password: 'secret',
      type: 'staff',
      isAdmin: 1,
    },
    {
      id: 3,
      email: 'theophilus@yahoo.com',
      firstName: 'Theophilus',
      lastName: 'Akor',
      password: 'secret',
      type: 'client',
      isAdmin: 0,
    },
  ],
};
