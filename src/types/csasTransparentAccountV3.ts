import { ErsteAccount, ErsteAPIKey, VariableSymbol, RequestError } from './global';

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
type CsasTransparentAccountV3_Accounts_Input = {
  readonly page?: number;
  readonly size?: number;
  readonly filter?: string;
} & Authorization;

type CsasTransparentAccountV3_Account_Input = {
  readonly accountId: ErsteAccount;
} & Authorization;

type CsasTransparentAccountV3_Transactions_Input = {
  readonly accountId: ErsteAccount;
  readonly page?: number;
  readonly size?: number;
  readonly sort?: 'processingDate' | 'amount' | 'sender';
  readonly order?: 'asc' | 'desc';
  readonly dateFrom?: string;
  readonly dateTo?: string;
  readonly filter?: string;
} & Authorization;

/** 
 * RESPONSES
*/
type CsasTransparentAccountV3_HealthCheck_Input = Authorization;

type CsasTransparentAccountV3_Accounts_Response = Promise<RequestError | {
  readonly status: "200";
  readonly pageNumber: number;
  readonly pageCount: number;
  readonly pageSize: number;
  readonly recordCount: number;
  readonly nextPage: number;
  readonly accounts: readonly AccountDetail[];
}>

type CsasTransparentAccountV3_Account_Response = Promise<RequestError | (AccountDetail & {
  readonly status: "200";
})>

type CsasTransparentAccountV3_Transactions_Response = Promise<RequestError | {
  readonly status: "200";
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly pageCount: number;
  readonly recordCount: number;
  readonly transactions: readonly ErsteTransaction[];
}>

type CsasTransparentAccountV3_HealthCheck_Response = Promise<number>


export type CsasTransparentAccountV3 = {
  readonly accounts: (params: CsasTransparentAccountV3_Accounts_Input) => CsasTransparentAccountV3_Accounts_Response;
  readonly account: (params: CsasTransparentAccountV3_Account_Input) => CsasTransparentAccountV3_Account_Response;
  readonly transactions: (params: CsasTransparentAccountV3_Transactions_Input) => CsasTransparentAccountV3_Transactions_Response;
  readonly healthCheck: (params: CsasTransparentAccountV3_HealthCheck_Input) => CsasTransparentAccountV3_HealthCheck_Response;
};
