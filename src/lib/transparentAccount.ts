import fetch from'node-fetch'

import { ErsteAPIKey, ErsteAccount, ErsteResponse } from '../types/transparent-account'

const apiURL = 'https://www.csas.cz/webapi/api/v3/'

export const transparentAccount = async (apiKey: ErsteAPIKey, account: ErsteAccount) => ({
    getTransactions: async (): Promise<ErsteResponse> => {
        const response: ErsteResponse = await (
            await fetch(
                `${apiURL}/${account}/transactions`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'WEB-API-key': apiKey,
                    },
                }
            )
        ).json()

        return response
    }
})