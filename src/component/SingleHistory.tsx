import React from 'react'
import { styled } from 'styled-components'
import { HistoryItemType } from '../state/action';
import { formatAmount } from '../utils/helpers';


const SingleHistory = (item:HistoryItemType) => {
    const {transaction,  date, amount} = item
    console.log(item);
    
  return (
    <Wrapper className='item'>
        
            <div>{transaction}</div>
            <div>{date}</div>
            <div>{formatAmount(amount)}</div>
       
    </Wrapper>
  )
}

const Wrapper = styled.div`
        display: grid;
        grid-template-columns: repeat(3, minmax(min-content, 1fr));
        grid-template-rows: minmax(min-content, 9rem);
        grid-gap: 3px;
        align-items: center;
        text-align: center;
        border-bottom: none;
    
`

export default SingleHistory