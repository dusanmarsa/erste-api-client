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
        readonly variableSymbol: string;
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

export type ErsteResponse = {
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly pageCount: number;
    readonly recordCount: number;
    readonly transactions: readonly ErsteTransaction[];
};

export type TransparentAccountSum = number;

export type CsasTransparentAccountV3 = {
    getTransactions: ({ apiKey: string, account }: {
        apiKey: ErsteAPIKey,
        account: ErsteAccount
    }) => Promise<ErsteResponse>
    moneySum: ({ filter, apiKey, account }: {
        filter?: {
            variableSymbol?: VariableSymbol
        }
        apiKey: ErsteAPIKey
        account: ErsteAccount
    }) => Promise<TransparentAccountSum>
}