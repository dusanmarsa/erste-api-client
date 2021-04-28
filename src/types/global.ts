export type ErsteAPIKey = string;
export type ErsteAccount = string;
export type VariableSymbol = string;

export type RequestError = {
    status: number
    errors: {
        error: string,
        scope?: string,
        parameters?: object
    }[]
}