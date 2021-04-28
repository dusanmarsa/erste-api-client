import fetch from 'node-fetch';
import queryString from 'query-string';

import { CsasTransparentAccountV3 } from '../types/csasTransparentAccountV3';

const productionURL = 'https://www.csas.cz/webapi/api/v3/transparentAccounts'
const sandboxURL = 'https://private-anon-089a392ab3-eahtransparentaccountsv3prod.apiary-mock.com/webapi/api/v3/transparentAccounts';

const apiURL = isProd => isProd ? productionURL : sandboxURL

export const csasTransparentAccountV3: CsasTransparentAccountV3 = {
  accounts: async ({ apiKey, page, size, filter }) => {
    const builtUrl = queryString.stringifyUrl(
      {
        url: apiURL(true),
        query: {
          page,
          size,
          filter,
        },
      },
      { skipNull: true }
    );

    const response = await fetch(builtUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'WEB-API-key': apiKey,
      },
    })

    const jsonResponse = await response.json()

    if(jsonResponse.status !== 200 || jsonResponse.status !== 200) return jsonResponse

    return {
      status: response.status,
      ...jsonResponse
    };
  },
  account: async ({ apiKey, accountId }) => {
    const response = await fetch(`${apiURL(true)}/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'WEB-API-key': apiKey,
      },
    })

    const jsonResponse = await response.json()

    if(jsonResponse.status !== 200 || jsonResponse.status !== 200) return jsonResponse

    return {
      status: response.status,
      ...jsonResponse
    };
  },
  transactions: async ({
    accountId,
    apiKey,
    filter,
    order,
    size,
    page,
    dateFrom,
    dateTo,
    sort,
  }) => {
    const builtUrl = queryString.stringifyUrl(
      {
        url: `${apiURL(true)}/${accountId}/transactions`,
        query: {
          page,
          size,
          filter,
          order,
          dateFrom,
          dateTo,
          sort,
        },
      },
      { skipNull: true }
    );

    const response = await fetch(builtUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'WEB-API-key': apiKey,
      },
    })

    const jsonResponse = await response.json()

    if(jsonResponse.status !== 200 || jsonResponse.status !== 200) return jsonResponse

    return {
      status: response.status,
      ...jsonResponse
    };
  },
  healthCheck: async ({ apiKey }) => {
    const response = await fetch(`${apiURL(true)}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'WEB-API-key': apiKey,
      },
    })

    return response.status;
  },
};