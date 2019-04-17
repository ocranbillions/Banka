import moment from 'moment';

const date = moment(new Date());

const seedTables = `
  INSERT INTO
    users
      VALUES 
      ( default, 'mikejones@gmail.com', 'Mike', 'Jones', 'client', ${false}),
      ( default, 'samo@gmail.com', 'Samuel', 'Ocran', 'staff', ${true}),
      ( default, 'davidjackson@gmail.com', 'David', 'Jackons', 'client', ${false});
  INSERT INTO
    accounts
      VALUES 
      ( default, 4194194410, '${date}', 2, 'current', 50000.10, 'active'),
      ( default, 2154523214, '${date}', 3, 'savings', 2541.22, 'active'),
      ( default, 5421214520, '${date}', 6, 'savings', 45000.50, 'active');
  INSERT INTO
    tellers
      VALUES 
      ( default, 10000, 1024232153, 2, 'credit', '${date}', 'pending'),
      ( default, 5000, 5412365210, 3, 'debit', '${date}', 'processed'),
      ( default, 8000, 1220310201, 1, 'debit', '${date}', 'processed');
  INSERT INTO
    transactions
      VALUES 
      ( default, '${date}', 'credit', 7541253210, 25410.00, 2, 214410.20, 2111.20),
      ( default, '${date}', 'credit', 9852136521, 12000.20, 2, 1252.20, 2000.20),
      ( default, '${date}', 'credit', 1245211123, 15000.20, 2, 10200.20, 12000.20); 
`;


export default seedTables;
