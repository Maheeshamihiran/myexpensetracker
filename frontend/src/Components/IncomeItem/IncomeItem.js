import React from 'react'
import {takeaway, clothing,book,food, medical,tv,calender, dollar ,comment,money, freelance,bitcoin,accounts,piggy,stocks,card, settings } from '../../utilis/icon';
import Button from '../Button/Button';
import { trash } from '../../utilis/icon';
import styled from 'styled-components';
import { dateFormat } from '../../utilis/dateFormat';

 function IncomeItem({
    id,
    title, 
    amount,
    date,
    category,
    description,
    deleteItem,
    editItem,
    indicatorColor,
    type}) {
    

  
  
  const  categoryIcon = () => {
    switch (category){
      case 'salary':
        return money;
      case 'freelancing':
        return freelance;
      case 'investment':
        return bitcoin;
      case 'donate':
        return piggy;
      case 'stocks':
        return stocks ;
      case 'bank':
        return card;
      case 'classpees':
        return  money; 
      case 'mahapola':
        return accounts;  
        case 'other':
          return piggy;
      default:
        return dollar;
    } 
  }
  const expenseCatIcon = () => {
    switch (category){
      case 'education':
        return book;
      case 'groceries':
        return food;
      case 'health':
        return medical;
      case 'subscriptions':
        return tv;
      case 'takeaways':
        return takeaway;
      case 'clothing':
        return clothing;
      case 'travelling':
        return freelance;
      case 'entertainment':
        return tv;
      case 'maintenance':
        return settings;
      case 'other':
        return dollar;
      default:
        return dollar;
    }
  }
  
  return (
    <IncomeItemStyled $indicatorColor={indicatorColor} $type={type}>
       <div className="icon">
        {type === 'expense' ?   expenseCatIcon():categoryIcon()}
       </div>
       <div className="content">
           <h5>{title}</h5>
           <div className='inner-content'>
              <div className='text'>
                <p>{dollar} {amount}</p>
                <p>{calender} {dateFormat(date)}</p>
                <p>{comment} {description}</p>
                    
                    
                       

              </div>
              <div className ='btn-con'>
                <Button
                    icon={<i className="fa-solid fa-edit"></i>}
                    bpad={'0.5rem'}
                    bRad={'50%'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                    hoverBg={'var(--color-green)'}
                    onClick={() => editItem && editItem({_id: id, title, amount, date, category, description})}
                />
                <Button
                    icon={trash}
                    bpad={'0.5rem'}
                    bRad={'50%'}
                    bg={'var(--primary-color)'}
                    color={'#222260'}
                    hoverBg={'var(--color-green)'}
                    onClick={() => deleteItem(id) }
                />
              </div>
       </div>
</div>
    </IncomeItemStyled> 
  )
}
 const IncomeItemStyled = styled.div`
  // Add your styles here
   background :#FCF6F9;
   border: 2px solid #FFFFFF;
   box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon {
        width: 70px;
        height: 70px;
        border-radius: 20px;
        background-color: #222260;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
           font-size: 2.6rem;
           color: #fff;
        }
    }
        .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        h5 {
            font-size: 1.2rem;
            padding-left: 1rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                background-color: ${props => props.$indicatorColor || '#ccc'};
            }
        }
        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                display: flex;
                
                gap: 0.2rem;
            }
            p {
                font-size: 0.9rem;
                color: #222260;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .btn-con {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
        }
    }
    
    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        
        .icon {
            width: 50px;
            height: 50px;
            i {
                font-size: 2rem;
            }
        }
        
        .content {
            .inner-content {
                flex-direction: column;
                gap: 1rem;
                
                .btn-con {
                    justify-content: center;
                }
            }
        }
    }
`;
export default IncomeItem;