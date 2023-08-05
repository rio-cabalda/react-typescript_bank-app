import React from 'react'
import { styled } from 'styled-components'
import SingleHistory from './SingleHistory'
import { useSelector} from 'react-redux'
import {State } from '../state';
import { HistoryItemType } from '../state/action';
const History = () => {

  const {history} = useSelector((state:State)=> state.bank)

  console.log(history);
  
  return (
    <Wrapper>
      <div className='history-data'>
        <div className="header">
            <div>Transaction</div>
            <div>Date</div>
            <div>Amount</div>
        </div>
        <div className='history-item'>
        {history.length < 1 ? 
        <span>No data available</span>  
        : <>
              {history.map((item:HistoryItemType)=>{
                  return (
                  <div className='data-container' key={item.date}>
                    <SingleHistory {...item}/>
                   
                  </div>)
                  
                })}
        </>
              }
       </div>
          
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section` 
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 2rem 3rem;
  width: 100%;
  font-size: 1.2rem;

  .history-data {
  width: 100%;
  border-radius: 15px 15px 0 0;
  border: 2px;
  overflow: hidden;
  border: 2px solid #efe9ef;
  }
  .history-item{
    max-height: calc(87vh - 23rem) ; 
    overflow: auto;
    span {
      display: block;
      margin: 2rem 0;
      text-align: center;
    }
    & .data-container:not(:last-child) {
      border-bottom: 2px solid #efe9ef;
    }
    
  } 
 

  .header {
        display: grid;
        grid-template-columns: repeat(3, minmax(min-content, 1fr));
        grid-gap: 3px;
        padding: 1.5rem 0; 
        background: #efe9ef;
        font-size: 1.5rem;
        font-weight: 500;
        div {
        text-align: center;
        height: min-content;
        }
  }
`

export default History