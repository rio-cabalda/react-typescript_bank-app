import { warningMessage,successMessage ,zerobalanceMessage,bankruptMessage} from '../../utils/helpers';
import {Action, initialState, StateType, HistoryItemType} from '../action'
import {ActionType} from '../action-types'


const reducer = (state:StateType = initialState, action:Action) =>{
    const getDate = new Date();
    let updateBalance: number;
    let updateHistory: HistoryItemType;
    
    switch (action.type){ 
        case ActionType.DEPOSIT:
            if(action.payload<1){
                warningMessage()
                return state
            }
            updateBalance = state.currentBalance + action.payload
             updateHistory = {
                transaction: ActionType.DEPOSIT,
                date: getDate.toUTCString(),
                amount: action.payload
            }
            successMessage(action.payload,ActionType.DEPOSIT)
            return {...state, currentBalance: updateBalance, history: [...state.history, updateHistory]}
        
        case ActionType.WITHDRAW:
            if(action.payload<1 || action.payload > state.currentBalance){
                if(state.currentBalance === 0){
                    zerobalanceMessage()
                }else{
                    warningMessage()
                }
                    return state
            }
            
            updateBalance = state.currentBalance - action.payload
            updateHistory = {
                transaction: ActionType.WITHDRAW,
                date: getDate.toUTCString(),
                amount: action.payload
            }
            successMessage(action.payload,ActionType.WITHDRAW)
            return {...state, currentBalance: updateBalance, history: [...state.history, updateHistory]}
        
        case ActionType.BANKRUPT:
            if(state.currentBalance === 0){
                zerobalanceMessage()
                return state
            }
            updateHistory = {
                transaction: ActionType.BANKRUPT,
                date: getDate.toUTCString(),
                amount: 0
            }
            bankruptMessage()
            return {...state, currentBalance: 0,history: [...state.history, updateHistory]}
        default:

            return state
    }
    
}

export default reducer