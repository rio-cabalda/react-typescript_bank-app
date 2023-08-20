import {ActionType} from '../action-types'

const getLocalStorage = () => {
    let bankData = localStorage.getItem('bank_data')
    if(bankData){
        return JSON.parse(bankData)
    }
    else{
        return {
            currentBalance: 0,
            history: []
        }
    }
}

export interface HistoryItemType {
    transaction: string;
    date:string
    amount: number;
}

export type StateType = {
    currentBalance:number;
    history: HistoryItemType[]
}

export const initialState: StateType =  getLocalStorage()


interface DepositAction {
    type: ActionType.DEPOSIT
    payload: number
}
interface WithdrawAction {
    type: ActionType.WITHDRAW
    payload: number
}
interface BankruptAction {
    type: ActionType.BANKRUPT
}


export type Action = DepositAction | WithdrawAction | BankruptAction