import React, { useState } from 'react'
import styled from 'styled-components';
import { menuItems } from '../../utilis/menuItems';
import { signout } from '../../utilis/icon';
import avatar from '../../img/avatar.jpg'; // Assuming you have an avatar image

function  Navigation(active, setActive) {
   
  return (
    <NavStyled>
      
        <div className="user-con">
            <img src={avatar} alt="User Avatar" />
           .<div className="text">
            <h2>Hi, MIHIRAN</h2>
            <p>Welcome Back</p>
           </div>

       </div>

       <ul className="menu-items">
        {menuItems.map((item)=>{
            return(
                <li 
                key={item.id}
                onClick={() => setActive(item.id)}
                className={active === item.id ? 'active' : ''}
                >
                  {item.icon}
                    
                    <span>{item.title}</span>
                </li>
            )
       })}

        
       </ul>
       <div className ="bottom-nav">
        <li> {signout} Sign Out  </li>
        </div>

      </NavStyled>
  )
}

const NavStyled = styled.nav`
   padding: 2rem 1.5rem;
   width:374px;
   height: 100% 
   border: 3px solid #FFFFFF;
   backdrop-filter: blur(1.5px);
   border-radius:32px;
   display:flex;
   flex-direction: column;
   justify-content: space-between;
   gap:2rem;
   background-color: rgba(255, 255, 255, 0.8);
   .user-con {
    display: flex;
    height: 100px;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border : 3px solid #0f7808ff;
      padding: 0.2rem;
      box-shadow: 0px 3px 17px rgba(0, 0, 0, 0.2);
    }

    h2 {
    color :rgba(34,34,96,1);
 
    } 
    p{
     color: rgba(34,34,96,0.7);
     }
  }
     .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: 0.5rem 0;
            font-weight: 500;
            color: rgba(34,34,96,1);
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            padding-left : 1rem;
            position: relative;
            }
            i{
                font-size: 1.5rem;
                color: rgba(34,34,96,0.7);
                transition: all 0.3s ease-in-out;

            }
            
        
    }
    .active {
        color: rgba(34,34,96,1);
        i {
            color: rgba(34,34,96, 1);
        }

        &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                
                border-radius: 0 10px 10px 0;
            }
    }

`;
export default Navigation;
