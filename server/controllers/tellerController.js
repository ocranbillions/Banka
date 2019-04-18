import db from '../jsdb/db';
import helpers from '../helpers/helpers';
import Teller from '../models/TellerModel';

const { tellers } = db;

const tellerController = {

  getTellers() {
    return tellers;
  },

  submitTeller(reqBody) {
    const result = helpers.validateNewTeller(reqBody);
    if (result.error) return result;

    const newTeller = new Teller(reqBody);

    newTeller.tellerNumber = tellers.length + 1;
    tellers.push(newTeller);

    return tellers[tellers.length - 1];
  },
};

export default tellerController;
