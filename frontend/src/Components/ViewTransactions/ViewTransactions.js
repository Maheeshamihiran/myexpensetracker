import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'

function ViewTransactions() {
  const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext()
  const [activeTab, setActiveTab] = useState('income')

  useEffect(() => {
    getIncomes()
    getExpenses()
  }, [])

  const getCategoryTotals = (data) => {
    const categoryTotals = {}
    data.forEach(item => {
      if (categoryTotals[item.category]) {
        categoryTotals[item.category] += item.amount
      } else {
        categoryTotals[item.category] = item.amount
      }
    })
    return categoryTotals
  }

  const incomeCategoryTotals = getCategoryTotals(incomes)
  const expenseCategoryTotals = getCategoryTotals(expenses)

  return (
    <ViewTransactionsStyled>
      <InnerLayout>
        <h1>View Transactions</h1>
        
        <div className="tab-buttons">
          <Button
            name="Income"
            bpad=".8rem 1.6rem"
            bRad="30px"
            bg={activeTab === 'income' ? 'var(--color-green)' : '#ccc'}
            color="#fff"
            onClick={() => setActiveTab('income')}
          />
          <Button
            name="Expense"
            bpad=".8rem 1.6rem"
            bRad="30px"
            bg={activeTab === 'expense' ? 'var(--color-red)' : '#ccc'}
            color="#fff"
            onClick={() => setActiveTab('expense')}
          />
        </div>

        <div className="category-totals">
          {activeTab === 'income' ? (
            <div>
              <h2>Income by Category</h2>
              {Object.entries(incomeCategoryTotals).map(([category, total]) => (
                <div key={category} className="category-item">
                  <span className="category-name">{category}</span>
                  <span className="category-total income-total">Rs.{total}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2>Expenses by Category</h2>
              {Object.entries(expenseCategoryTotals).map(([category, total]) => (
                <div key={category} className="category-item">
                  <span className="category-name">{category}</span>
                  <span className="category-total expense-total">Rs.{total}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </InnerLayout>
    </ViewTransactionsStyled>
  )
}

const ViewTransactionsStyled = styled.div`
  h1 {
    color: rgba(34, 34, 96, 1);
    text-align: center;
    margin-bottom: 2rem;
  }

  .tab-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .category-totals {
    h2 {
      color: rgba(34, 34, 96, 1);
      margin-bottom: 1rem;
      text-align: center;
    }

    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem 0;

      .category-name {
        font-weight: 600;
        color: #222260;
        text-transform: capitalize;
      }

      .category-total {
        font-weight: 700;
        font-size: 1.2rem;
      }

      .income-total {
        color: var(--color-green);
      }

      .expense-total {
        color: var(--color-red);
      }
    }
  }

  @media (max-width: 768px) {
    .tab-buttons {
      flex-direction: column;
      align-items: center;
    }

    .category-item {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
`

export default ViewTransactions