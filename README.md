# Banka
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money.
[https://ocranbillions.github.io/banka/ui/](https://ocranbillions.github.io/banka/ui/)

[![Build Status](https://travis-ci.org/ocranbillions/banka.svg?branch=develop)](https://travis-ci.org/ocranbillions/banka) [![Coverage Status](https://coveralls.io/repos/github/ocranbillions/banka/badge.svg?branch=develop)](https://coveralls.io/github/ocranbillions/banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/7ff9e7a0df839ca0e882/maintainability)](https://codeclimate.com/github/ocranbillions/banka/maintainability)
## Getting Started
### Prerequisites
The tools listed below are needed to run this application:
* Node v10.15.0 or above
* Npm v6.4 or above
* 
### Installation
`git clone https://github.com/ocranbillions/banka.git`
- Pull the develop branch off this repository
- Run `npm install` to install all dependencies
- Run npm start to start the app
- Access endpoints on **localhost:3000**

### How it works
- Customer sign's up
- creates a bank account(s) with some initial deposit
- Every transaction starts from the client's end.
- Client fills the teller and submits it. At this stage the teller status is 'pending'
- Cashier can view all tellers submitted by all customers
- To initiate a transaction, the cashier copies the information on a given teller (accNum, amount, transactionType, tellerNum)
- The cashier then makes the transaction based on the information from the teller. If its a credit transaction with valid account number, the cashier post the transaction to the client's account. Then updates the teller status to 'processed'
- The client can then see his/account updated

NOTE: Without the client submitting a teller, a transaction can't take place. So to test the the credit/debit trasactions endpoints, a teller has to be submited first.


### Endpoints
| Method      | Description    | Endpoints    | Role   | 
| :------------- | :----------: | -----------: | -----------: |
|  POST | Create user   | /api/v1/auth/signup    | *   |
| POST   | signin user | /api/v1/auth/signin | * |
|  POST | create new bank account   | /api/v1/accounts/    | client   |
| GET  |fetch all accounts | /api/v1/accounts/ | cashier + admin |
| GET  |get details of an account | /api/v1/accounts/:number | * |
| DELETE  |Delete a bank account | /api/v1/accounts/:number | admin |
| PATCH  |change bank account status | /api/v1/accounts/:number | admin |
| POST |submit a teller to cashier | /api/v1/teller | client |
| GET  |get all tellers submited by clients | /api/v1/teller | cashier |
| POST |Credit an account | /api/v1/transactions/:number/credit | cashier |
| POST |Debit an account | /api/v1/transactions/:number/debit | cashier |
| GET|Get account history| /api/v1/transactions/:number | cashier + client |
| GET|Get all users| /api/v1/users | admin + cashier |
| GET|Get single user| /api/v1/users/id | admin + cashier |
| POST|create new staff account| /api/v1/users/ | admin |
| DELETE|Delete staff| /api/v1/users/id | admin |

### Postman documentation
https://documenter.getpostman.com/view/6617895/S1ENzz72
### Running the tests
Run `npm test` in the root folder.


### Author
[**Samuel Ocran**](https://twitter.com/ocranbillions)

### Acknowledgments
[**Andela Nigeria**](https://andela.com/)