import { ErsteAPIKey, RequestError } from './global';

type Authorization = {
    readonly sandbox: false
    readonly apiKey: ErsteAPIKey;
} | {
    readonly sandbox: true
    readonly apiKey?: ErsteAPIKey;
};

/** 
 * INPUTS
*/
export type CsasExchangeRatesV2_ListAllRates_Input = {
    fromDate?: string
    toDate?: string
    curr?: string
    lang?: string
} & Authorization

export type CsasExchangeRatesV2_Exchange_Input = {
    from: string
    to: string
    type: string
    amount: number
    buy?: boolean
} & Authorization

export type CsasExchangeRatesV2_ListAllCurrencies_Input = {
    lang?: 'en' | 'cs'
} & Authorization

export type CsasExchangeRatesV2_ListExchangeRatesCross_Input = {
    fromDate: string
    toDate: string
    currency1: string
    currency2: string
} & Authorization

/** 
 * RESPONSES
*/
export type CsasExchangeRatesV2_ListAllRates_Response = Promise<RequestError | {
    status: "200"
    list: {
        country: string
        name: string
        shortName: string
        amount: number
        validFrom: string
        valBuy: number
        valSell: number
        valMid: number
        currBuy: number
        currSell: number
        currMid: number
        move: number
        cnbMid: number
        version: number
    }[]
}>

export type CsasExchangeRatesV2_Exchange_Response = Promise<RequestError | {
    status: "200"
    exchange: {
        from: string
        to: string
        amount: number
        type: 'CASH' | 'NONCASH'
        result: number
        validFrom: string
        buy: boolean
    }
}>

export type CsasExchangeRatesV2_ListAllCurrencies_Response = Promise<RequestError | {
    status: "200"
    list: {
        country: string
        name: string
        shortName: string
        longName: string
    }[]
}>

export type CsasExchangeRatesV2_ListExchangeRatesCross_Response = Promise<RequestError | {
    status: "200"
    list: {
        currencies?: string
        currencyAmount?: number
        validFrom?: string
        valBuy?: number
        valSell?: number
        valMid?: number
        currBuy?: number
        currSell?: number
        currMid?: number
        move?: number
        cnbMid?: number
        version?: number
    }[]
}>

export type CsasExchangeRatesV2 = {
    listAllRates: (params: CsasExchangeRatesV2_ListAllRates_Input) => CsasExchangeRatesV2_ListAllRates_Response
    convert: (params: CsasExchangeRatesV2_Exchange_Input) => CsasExchangeRatesV2_Exchange_Response
    listAllCurrencies: (params: CsasExchangeRatesV2_ListAllCurrencies_Input) => CsasExchangeRatesV2_ListAllCurrencies_Response
    listExchangeRatesCross: (params: CsasExchangeRatesV2_ListExchangeRatesCross_Input) => CsasExchangeRatesV2_ListExchangeRatesCross_Response
}