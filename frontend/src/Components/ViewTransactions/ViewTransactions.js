import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import IncomeItem from '../incomeItem/incomeItem'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function ViewTransactions() {
  const { incomes, expenses, getIncomes, getExpenses, deleteIncome, deleteExpense, setEditingItem } = useGlobalContext()
  const [activeTab, setActiveTab] = useState('income')
  const [selectedCategory, setSelectedCategory] = useState(null)

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
  }

  const getFilteredItems = () => {
    if (activeTab === 'income') {
      return incomes.filter(item => item.category === selectedCategory)
    } else {
      return expenses.filter(item => item.category === selectedCategory)
    }
  }

  const getPieChartData = (categoryTotals, type) => {
    const colors = type === 'income' 
      ? ['#42ad00', '#00d4aa', '#0099cc', '#6666ff', '#9933cc', '#ff6600', '#ff3366', '#ffcc00']
      : ['#ff4757', '#ff6b81', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84']
    
    return {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: colors.slice(0, Object.keys(categoryTotals).length),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    }
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ''
            const value = context.parsed || 0
            return `${label}: Rs.${value}`
          }
        }
      }
    }
  }

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

        {selectedCategory ? (
          <div className="category-details">
            <div className="back-button">
              <Button
                name="← Back to Categories"
                bpad=".5rem 1rem"
                bRad="20px"
                bg="#ccc"
                color="#333"
                onClick={handleBackToCategories}
              />
            </div>
            <h2>{selectedCategory} - {activeTab === 'income' ? 'Income' : 'Expenses'}</h2>
            <div className="items-list">
              {getFilteredItems().map((item) => {
                const { _id, title, amount, category, description, date } = item
                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    amount={amount}
                    date={date}
                    category={category}
                    description={description}
                    indicatorColor={activeTab === 'income' ? 'var(--color-green)' : 'var(--color-red)'}
                    type={activeTab === 'income' ? 'income' : 'expense'}
                    deleteItem={activeTab === 'income' ? deleteIncome : deleteExpense}
                    editItem={handleEditItem}
                  />
                )
              })}
            </div>
          </div>
        ) : (
          <div className="category-totals">
            {activeTab === 'income' ? (
              <div>
                <h2>Income by Category</h2>
                <div className="chart-container">
                  <Pie data={getPieChartData(incomeCategoryTotals, 'income')} options={chartOptions} />
                </div>
                <div className="category-list">
                  {Object.entries(incomeCategoryTotals).map(([category, total]) => (
                    <div key={category} className="category-item" onClick={() => handleCategoryClick(category)}>
                      <span className="category-name">{category}</span>
                      <span className="category-total income-total">Rs.{total}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2>Expenses by Category</h2>
                <div className="chart-container">
                  <Pie data={getPieChartData(expenseCategoryTotals, 'expense')} options={chartOptions} />
                </div>
                <div className="category-list">
                  {Object.entries(expenseCategoryTotals).map(([category, total]) => (
                    <div key={category} className="category-item" onClick={() => handleCategoryClick(category)}>
                      <span className="category-name">{category}</span>
                      <span className="category-total expense-total">Rs.{total}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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

    .chart-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
      border-radius: 20px;
    }

    .category-list {
      margin-top: 2rem;
    }

    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
      border-radius: 10px;
      padding: 1rem;
      margin: 1rem 0;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
      }

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

  .category-details {
    .back-button {
      margin-bottom: 1rem;
    }

    h2 {
      color: rgba(34, 34, 96, 1);
      margin-bottom: 1rem;
      text-align: center;
      text-transform: capitalize;
    }

    .items-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
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