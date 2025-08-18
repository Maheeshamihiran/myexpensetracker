import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import Chart from '../Charts/Charts'
import { useGlobalContext } from '../../context/globalContext'
import History from '../History/History'
function Dashboard() {
  const{totalExpense,incomes,expenses,totalIncome,getIncomes,getExpenses}= useGlobalContext()

  useEffect(()=>{
    getExpenses()
    getIncomes()

  },[])
  return (
    < DashboardStyled>
    <InnerLayout>
        <h1>All Transaction</h1>
        <div className="stats-con">
            <div className="chart-con">
             <Chart/>
             <div className='amount-con'>
              <div className='income'>
                <h2>Total Income</h2>
                <p>Rs{totalIncome()}</p>
              </div>
              <div className='expense'>
                <h2>Total Expense</h2>
                <p>Rs{totalExpense()}</p>
              </div>

              <div className='balance'>
                <h2>Total Balance</h2>
                <p>Rs{totalIncome()-totalExpense()}</p>
              </div>
             </div>
            </div>
            <div className="history-con">
                <History/>
                <h2 className='salary-title'>Min<span>Salary</span>Max</h2>
                 <div className='salary-item'>
                   <p>
                        {Math.min(...incomes.map((income)=>income.amount))}
                    </p>
                    <p>
                        {Math.max(...incomes.map((income)=>income.amount))}
                    </p>
                 
                </div>

                <h2 className='salary-title'>Min<span>Expense</span>Max</h2>
                 <div className='salary-item'>
                   <p>
                        {Math.min(...expenses.map((expense)=>expense.amount))}
                    </p>
                    <p>
                        {Math.max(...expenses.map((expense)=>expense.amount))}
                    </p>

                </div>
            </div>
        </div>


    </InnerLayout>
    </ DashboardStyled>
  )
}

const DashboardStyled = styled.div`
h1{
    color: rgba(34, 34, 96, 1);
    font-weight: 700;
    

}
    h2{
    color:rgba(34, 34, 96, 1);
    font-weight: 700;
    font-size: 1.5rem;
    }

.stats-con{
       padding: 2rem 0;
       display: grid;
       grid-template-columns:repeat(5,1fr);
       gap: 2rem;
       .chart-con{
        grid-column: 1/4;
        height: 400px;
        .amount-con{
           display:grid;
           grid-template-columns:repeat(4,1fr);
           margin-top: 2rem;
           gap: 1rem;
           .income,.expense{
             grid-column: span 2;
               }

           
               

           .income,.expense,.balance{
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
            border-radius: 20px;
            padding: 1rem;

            p{
               font-size: 2rem;
               font-weight: 500;
              ;


               }

           }

           .balance{
           grid-column:2/4;
           display:grid;
           flax-direction:column;
           justify-content:center;
           align-items:center;
             p{
                   color:var(--color-green);
                   opacity:0.7;
                   font-size: 2.5rem;
                   font-weight: 700;
           
             }
           }
        
        }
       }
      .history-con{
          grid-column:4 / -1;
          h2 {
             margin: 1rem 0;
             display:flex;
             align-items:center;
             justify-content:space-between;

          
          
           }
             .salary-title{
                font-size:1.2rem;
                span{
                font-size:1.6rem
                }
             }
             .salary-item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #FCF6F9;
                border: 1px solid #FFFFFF;
                box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
                border-radius: 10px;
                padding: 1rem;
               p {
                font-size: 1rem;
                font-weight: 500;
                
                }
               
               
             }
           

        }
        
    }
`;

export default Dashboard;
