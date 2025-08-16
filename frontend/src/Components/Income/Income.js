import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem'; // Assuming you have a Form component for adding income 
function Income() {
  const{addIncome,incomes,getIncomes} = useGlobalContext();
  
  React.useEffect(() => {
    getIncomes();
   },[incomes]) // Fetch incomes when the component mounts
  
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>
        <div className="income-content">
        <div className="form-container">
          <Form/>
        </div>
        <div className="incomes">
             {incomes.map((income) => {
              const {_id, title, amount, category, description, date} = income;
              return<IncomeItem
                 key={_id}
                 id={_id}
                 title={title}
                 amount={amount} date={date}
                 category={category}
                 description={description}
                 indicatorColor="var(--color-green)"

                />
                
           
                
              
             })}
        </div>

        </div>
      </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`

`;

export default Income;