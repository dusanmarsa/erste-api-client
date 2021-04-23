import { ErsteAccount, ErsteAPIKey, VariableSymbol } from './global'

export type ErsteTransaction = {
    readonly amount: {
        readonly value: number;
        readonly precision: number;
        readonly currency: string;
    };
    readonly type: number;
    readonly dueDate: Date;
    readonly processingDate: Date;
    readonly sender: {
        readonly accountNumber: string;
        readonly bankCode: string;
        readonly iban: string;
        readonly specificSymbol: string;
        readonly specificSymbolParty: string;
        readonly variableSymbol: VariableSymbol;
        readonly constantSymbol: string;
        readonly name: string;
        readonly description: string;
    };
    readonly receiver: {
        readonly accountNumber: string;
        readonly bankCode: string;
        readonly iban: string;
    };
    readonly typeDescription: string;
};

export type ListOfTransactions = {
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly pageCount: number;
    readonly recordCount: number;
    readonly transactions: readonly ErsteTransaction[];
};

export type AccountDetail = {
    accountNumber: string
    bankCode: string
    transparencyFrom: string
    transparencyTo: string
    publicationTo: string
    actualizationDate: string
    balance: number
    currency: string
    name: string
    description: string
    note: string
    iban: string
}

export type AccountsList = {
    pageNumber: number
    pageCount: number
    pageSize: number
    recordCount: number
    nextPage: number
    accounts: AccountDetail[]
}

type Authorization = {
    apiKey: ErsteAPIKey
}

type CsasTransparentAccountV3_Accounts = {
    page?: number,
    size?: number,
    filter?: string
} & Authorization

type CsasTransparentAccountV3_Account = {
    apiKey: ErsteAPIKey,
    accountId: ErsteAccount
} & Authorization

type CsasTransparentAccountV3_Transactions = {
    apiKey: ErsteAPIKey,
    accountId: ErsteAccount
    page?: number,
    size?: number,
    sort?: 'processingDate' | 'amount' | 'sender',
    order?: 'asc' | 'desc',
    dateFrom?: string,
    dateTo?: string,
    filter?: string
} & Authorization

type CsasTransparentAccountV3_HealthCheck = Authorization

export type CsasTransparentAccountV3 = {
    accounts: (params: CsasTransparentAccountV3_Accounts) => Promise<AccountsList>
    account: (params: CsasTransparentAccountV3_Account) => Promise<AccountDetail>
    transactions: (params: CsasTransparentAccountV3_Transactions) => Promise<ListOfTransactions>
    healthCheck: (params: CsasTransparentAccountV3_HealthCheck) => Promise<number>
}