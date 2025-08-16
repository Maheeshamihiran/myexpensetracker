import React from 'react'
import { calender, dollar ,comment} from '../../utilis/icon';
import Button from '../Button/Button';
import { trash } from '../../utilis/icon';
import styled from 'styled-components';

 function IncomeItem({
    id,
    title, 
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type}) {
  return (
    <IncomeItemStyled indicatorColor={indicatorColor} type={type}>
       <div className="icon">

       </div>
       <div className="content">
           <h5>{title}</h5>
           <div className='inner-content'>
              <div className='text'>
                <p>{dollar} {amount}</p>
                <p>{calender} {date}</p>
                <p>{comment} {description}</p>
                    
                    
                       

              </div>
              <div className ='btn-con'>
                <Button
                    icon={trash}
                    bpad={'0.5rem'}
                    bRad={'50%'}
                    bg={'var(--primary-color)'}
                    color={'#fff'}
                    hoverBg={'var(--color-green)'}
                    
                 

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
        background-color: ${props => props.indicatorColor || '#ccc'};
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
           font-size: 2.6rem;
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
            background-color: ${props => props.indicatorColor || '#ccc'};
            }
            .ineer-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-size: 0.9rem;
                    color: #222260;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
            }
        }

    `;
export default IncomeItem;