import React, { useEffect, useState } from 'react';
import {useDispatch,  useSelector} from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../state';
import { ActionType } from '../state/action-types';
import { warningMessage } from '../utils/helpers';
import { formatAmount } from '../utils/helpers';
import { styled } from 'styled-components'

const AccountDashboard = () => {

  const dispatch = useDispatch();
  const {depositMoney,withdrawMoney,bankrupt } = bindActionCreators(actionCreators, dispatch)
  const bankData = useSelector((state:State)=> state.bank)
  const [inputAmount, setInputAmount] = useState<string>('')

  useEffect(()=>{
    localStorage.setItem('bank_data', JSON.stringify(bankData))
  },[bankData])
 
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    e.preventDefault()
     const amount = e.target.value;
     const numericValue = amount.replace(/\D/g, ''); // Remove non-numeric 
       setInputAmount(numericValue.replace(/^0+/, '') || '0')
  };

  const handleInputFocus = () :void => {
    if (inputAmount === '0') {
      setInputAmount('');
    }
  };

  const btnSubmit = (action:string) =>{
    switch (action) {
      case ActionType.DEPOSIT:
        if(inputAmount !== ''){
          depositMoney(parseFloat(inputAmount)) 
          setInputAmount('')
         }
         else {
          warningMessage()
        }
        return null

      case ActionType.WITHDRAW:
        if(inputAmount !== ''){
          withdrawMoney(parseFloat(inputAmount))
          setInputAmount('')
        }
        else {
          warningMessage()
        }
        return null
    }
  }

  return (
    <Wrapper>
      <div className="dashboard-container">
        <div className="balance">
        <h1>Current balance</h1>
        <span>{formatAmount(bankData.currentBalance)}</span>
        </div>

        <input type="number" pattern="[0-9]*" name="amount" id="amount" 
          onFocus={handleInputFocus}
          value={inputAmount === null ? '' : inputAmount}
          onChange={handleInputChange} 
          placeholder='Please enter an amount'/>

        <div className="btn-container">
          <button type="button" className='deposit' onClick={()=>btnSubmit(ActionType.DEPOSIT)}>Deposit</button>
          <button type="button" className='withdraw' onClick={()=>btnSubmit(ActionType.WITHDRAW)}>Withdraw</button>
          <button type="button" className='bankrupt' onClick={bankrupt}>Bankrupt</button>
        </div>
      </div>
   </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100vw;
  display: block;
  height: 22rem;
  background: #6fc5fa;
  box-shadow: inset 0px -13px 19px 0px rgba(0, 0, 0, 0.1);

  .dashboard-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .balance {
      text-align: center;
      padding: 2rem 0;
      h1{
        padding-bottom: 1rem;
      }
      span {
        font-size: 2rem;
      }
    }

    input {
      font-size: 16px;
      padding: 10px 12px;
      /* border: 1px solid #ccc; */
      border: transparent;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s ease-in-out;
    }
  }

  .btn-container {
    padding: 2rem 0;
    display: flex;
    column-gap: 5px;
    button {
      font-size: 16px;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #ffffff;
      outline: none;
      transition: background-color 0.2s ease-in-out;
    }

    .deposit,.withdraw {
      background-color: #007bff;
      &:hover {
        background-color: #0056b3;
      }
      &:active {
        background-color: #003974;
      }
    }

    .bankrupt {
      background-color: #eb5656;
      &:hover {
        background-color: #a00101;
      }
      &:active {
        background-color: #900202;
      }
    }

  }
`

export default AccountDashboard