import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../incomeItem/incomeItem'; 
function Income() {
  const{addIncome,incomes,getIncomes,deleteIncome,totalIncome,setEditingItem} = useGlobalContext();
  
  const handleEditItem = (item) => {
    setEditingItem(item);
  };
  
  React.useEffect(() => {
    getIncomes();
   },[])  // Fetch incomes when the component mounts
   
   console.log('Incomes data:', incomes);
  
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>
        <h2 className='total-income'>Total Income:<span>Rs.{totalIncome()}</span> </h2>

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
                   deleteItem={deleteIncome}
                   editItem={handleEditItem}
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

  h1 {
    color: rgba(34, 34, 96, 1);
  }

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    color: rgba(34, 34, 96, 1);
    span {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  
  .income-content {
    padding: 2rem;
    display: flex;
    gap: 1rem;
    .incomes {
      flex: 1;
    }   
  }
  
  /* Tablet and small laptop (1024px and below) */
  @media (max-width: 1024px) {
    .income-content {
      padding: 1rem;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-container {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .incomes {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .total-income {
      font-size: 1.5rem;
      padding: 0.5rem;
      margin: 0.5rem 0;
      
      span {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Income;