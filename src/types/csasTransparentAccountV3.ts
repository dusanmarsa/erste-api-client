import { ErsteAccount, ErsteAPIKey, VariableSymbol } from './global';

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
  readonly accountNumber: string;
  readonly bankCode: string;
  readonly transparencyFrom: string;
  readonly transparencyTo: string;
  readonly publicationTo: string;
  readonly actualizationDate: string;
  readonly balance: number;
  readonly currency: string;
  readonly name: string;
  readonly description: string;
  readonly note: string;
  readonly iban: string;
};

export type AccountsList = {
  readonly pageNumber: number;
  readonly pageCount: number;
  readonly pageSize: number;
  readonly recordCount: number;
  readonly nextPage: number;
  readonly accounts: readonly AccountDetail[];
};

type Authorization = {
  readonly apiKey: ErsteAPIKey;
};

type CsasTransparentAccountV3_Accounts = {
  readonly page?: number;
  readonly size?: number;
  readonly filter?: string;
} & Authorization;

type CsasTransparentAccountV3_Account = {
  readonly apiKey: ErsteAPIKey;
  readonly accountId: ErsteAccount;
} & Authorization;

type CsasTransparentAccountV3_Transactions = {
  readonly apiKey: ErsteAPIKey;
  readonly accountId: ErsteAccount;
  readonly page?: number;
  readonly size?: number;
  readonly sort?: 'processingDate' | 'amount' | 'sender';
  readonly order?: 'asc' | 'desc';
  readonly dateFrom?: string;
  readonly dateTo?: string;
  readonly filter?: string;
} & Authorization;

type CsasTransparentAccountV3_HealthCheck = Authorization;

export type CsasTransparentAccountV3 = {
  readonly accounts: (
    params: CsasTransparentAccountV3_Accounts
  ) => Promise<AccountsList>;
  readonly account: (params: CsasTransparentAccountV3_Account) => Promise<AccountDetail>;
  readonly transactions: (
    params: CsasTransparentAccountV3_Transactions
  ) => Promise<ListOfTransactions>;
  readonly healthCheck: (
    params: CsasTransparentAccountV3_HealthCheck
  ) => Promise<number>;
};