import fetch from 'node-fetch';
import queryString from 'query-string'

import { CsasTransparentAccountV3 } from '../types/csasTransparentAccountV3';

const apiURL = 'https://www.csas.cz/webapi/api/v3/transparentAccounts';

export const csasTransparentAccountV3: CsasTransparentAccountV3 = {
  accounts: async ({ apiKey, page, size, filter }) => {
    const builtUrl = queryString.stringifyUrl({
      url: apiURL,
      query: {
        page,
        size,
        filter
      }
    }, { skipNull: true })

    const response = await (
      await fetch(builtUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'WEB-API-key': apiKey,
        },
      })
    ).json();

    return response
  },
  account: async ({ apiKey, accountId }) => {
    const response = await (
      await fetch(`${apiURL}/${accountId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'WEB-API-key': apiKey,
        },
      })
    ).json();

    return response
  },
  transactions: async ({ accountId, apiKey, filter, order, size, page, dateFrom, dateTo, sort }) => {
    const builtUrl = queryString.stringifyUrl({
      url: `${apiURL}/${accountId}/transactions`,
      query: {
        page,
        size,
        filter,
        order,
        dateFrom,
        dateTo,
        sort
      }
    }, { skipNull: true })

    const response = await (
      await fetch(builtUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'WEB-API-key': apiKey,
        },
      })
    ).json();

    return response;
  },
  healthCheck: async ({ apiKey }) => {
    const response = await (
      await fetch(`${apiURL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'WEB-API-key': apiKey,
        },
      })
    ).json();

    return response;
  }
};
