export type ErsteTransaction = {
    amount: {
        value: number
        precision: number
        currency: string
    }
    type: number
    dueDate: Date
    processingDate: Date
    sender: {
        accountNumber: string
        bankCode: string
        iban: string
        specificSymbol: string
        specificSymbolParty: string
        variableSymbol: string
        constantSymbol: string
        name: string
        description: string
    }
    receiver: {
        accountNumber: string
        bankCode: string
        iban: string
    }
    typeDescription: string
}

export type ErsteResponse = {
    pageNumber: number,
    pageSize: number,
    pageCount: number,
    recordCount: number,
    transactions: ErsteTransaction[]
}

export type ErsteAPIKey = string
export type ErsteAccount = string