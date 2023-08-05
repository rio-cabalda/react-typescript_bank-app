import { toast } from 'react-toastify';
import { ActionType } from '../state/action-types';

export const formatAmount = (amount:number) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      }).format(amount).toString();
    };

export const successMessage = (amount:number, type:ActionType) =>{
  toast.success(`${formatAmount(amount)} successfully ${type} to your account.`)
}    

export const warningMessage = () =>{
  toast.warning('Please enter a valid amount.')
}   
export const zerobalanceMessage = () =>{
  toast.warning('You have 0 balance in your account, please deposit to continue the transaction.')
} 

export const bankruptMessage = () =>{
  toast.error('Your account has been declared bankrupt.')
} 
  
