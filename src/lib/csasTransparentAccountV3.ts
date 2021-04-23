import fetch from 'node-fetch';

import { CsasTransparentAccountV3 } from '../types/csasTransparentAccountV3';

const apiURL = 'https://www.csas.cz/webapi/api/v3/';

export const csasTransparentAccountV3: CsasTransparentAccountV3 = {
  getTransactions: async ({ apiKey, account }) => {
    const response = await (
      await fetch(`${apiURL}/${account}/transactions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'WEB-API-key': apiKey,
        },
      })
    ).json();

    return response;
  },
  moneySum: async ({
    apiKey,
    account,
    filter
  }) => {
    const response = await (
      await fetch(`${apiURL}/${account}/transactions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'WEB-API-key': apiKey,
        },
      })
    ).json();


    if (!response?.recordCount && !response.transactions.length) {
      return 0
    }

    let filteredTransactions = response.transactions

    if(!!filter.variableSymbol) {
      filteredTransactions = filteredTransactions
        .filter(transation => transation.sender.variableSymbol === filter.variableSymbol)
    }

    const sumResult = filteredTransactions
      .reduce((sum: number, transaction) => sum + transaction.amount.value, 0)

    return sumResult
  }
};
