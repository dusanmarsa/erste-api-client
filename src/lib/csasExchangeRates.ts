import fetch from 'node-fetch';
import queryString from 'query-string';

import { CsasExchangeRatesV2 } from '../types/csasExchangeRates';

const productionURL = 'https://www.csas.cz/webapi/api/v2/rates'
const sandboxURL = 'https://webapi.developers.erstegroup.com/api/csas/public/sandbox/v2/rates';

const apiURL = (isProd: boolean) => isProd ? productionURL : sandboxURL

export const csasExchangeRatesV2: CsasExchangeRatesV2 = {
    listAllRates: async ({ sandbox, apiKey, curr, fromDate, lang, toDate }) => {
        const builtUrl = queryString.stringifyUrl({
            url: `${apiURL(!sandbox)}/exchangerates`,
            query: {
                curr,
                lang,
                fromDate,
                toDate
            },
        }, { skipNull: true });

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
            list: jsonResponse
        };
    },
    convert: async ({ apiKey, amount, from, sandbox, to, type, buy }) => {
        const response = await fetch(`${apiURL(!sandbox)}/exchangerates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'WEB-API-key': apiKey,
            },
            body: JSON.stringify({
                amount,
                from,
                to,
                type,
                buy
            })
        })

        const jsonResponse = await response.json()

        if(jsonResponse.status !== 200 || jsonResponse.status !== 200) return jsonResponse

        return {
            status: response.status,
            exchange: jsonResponse
        };
    },
    listAllCurrencies: async ({ lang, sandbox, apiKey }) => {
        const builtUrl = queryString.stringifyUrl({
            url: `${apiURL(!sandbox)}/exchangerates/currencies`,
            query: {
                lang
            },
        }, { skipNull: true });

        const response = await fetch(builtUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'WEB-API-key': apiKey,
            }
        })

        const jsonResponse = await response.json()

        if(jsonResponse.status !== 200 || jsonResponse.status !== 200) return jsonResponse

        return {
            status: response.status,
            list: jsonResponse
        };
    },
    listExchangeRatesCross: async ({ sandbox, apiKey, fromDate, toDate, currency1, currency2 }) => {
        const builtUrl = queryString.stringifyUrl({
            url: `${apiURL(!sandbox)}/exchangerates/cross`,
            query: {
                fromDate,
                toDate,
                currency1,
                currency2
            },
        }, { skipNull: true });

        const response = await fetch(builtUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'WEB-API-key': apiKey,
            }
        })

        const jsonResponse = await response.json()

        if(jsonResponse.status !== 200 || jsonResponse.status !== 200) return jsonResponse

        return {
            status: response.status,
            list: jsonResponse
        };
    }
}