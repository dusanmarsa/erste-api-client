import { csasExchangeRatesV2 } from './src/lib/csasExchangeRates'

(async() => {
    const t = await csasExchangeRatesV2.listExchangeRatesCross({
        sandbox: true,
        apiKey: '5894d274-1ea8-494c-bb17-fb249df204d2',
        currency1: 'USD',
        currency2: 'CZK',
        fromDate: '2017-07-14',
        toDate: '2017-07-14'
    })

    console.log(t)
})()