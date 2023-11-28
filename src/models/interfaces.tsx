export interface IAuth {
    username: string
    password: string
}

export interface IRow {
    id?: number
    name: string
    email: string
    birthday_date: string
    phone_number: string
    address: string
}

export interface ITable {
    count: number
    next: string
    previous: string
    results: IRow[]
}

export interface ILoginResult {
    data?: object
    error?: object
}
