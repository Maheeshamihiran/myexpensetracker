import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../incomeItem/incomeItem'; 
function Income() {
  const{addIncome,incomes,getIncomes} = useGlobalContext();
  
  React.useEffect(() => {
    getIncomes();
   },[]) // Fetch incomes when the component mounts
   
   console.log('Incomes data:', incomes);
  
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>
        <div className="income-content">
        <div className="form-container">
          <Form/>
        </div>
        <div className="incomes">
           
           
              { incomes.map((income) => {
                 const {_id, title, amount, category, description, date} = income;
                 console.log('Rendering income:', income);
                 return <IncomeItem
                   key={_id}
                   id={_id}
                   title={title}
                   amount={amount}
                   date={date}
                   category={category}
                   description={description}
                   indicatorColor="var(--color-green)"
                   type="income"
                 />
               })}
             
        </div>

        </div>
      </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: hidden;
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;

    }   

`;

export default Income;