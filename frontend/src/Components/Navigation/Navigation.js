import React from 'react'
import styled from 'styled-components';
import { menuItems } from '../../utilis/menuItems';
import { signout } from '../../utilis/icon';
import avatar from '../../img/avatar.jpg';

function  Navigation({active, setActive, user, onLogout}) {
   
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
        <li onClick={onLogout} style={{cursor: 'pointer'}}> {signout} Sign Out  </li>
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
   border-radius:20px;
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
    
    /* Desktop (1200px+) */
    @media (min-width: 1200px) {
      width: 374px;
      padding: 2rem 1.5rem;
    }
    
    /* Laptop (992px - 1199px) */
    @media (max-width: 1199px) and (min-width: 992px) {
      width: 300px;
      padding: 1.5rem 1rem;
    }
    
    /* Tablet and small laptop (1024px and below) */
    @media (max-width: 1024px) {
      width: 100%;
      height: auto;
      flex-direction: row;
      padding: 1rem;
      border-radius: 20px;
      
      .user-con {
        flex: 0 0 auto;
      }
      
      .menu-items {
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
        
        li {
          grid-template-columns: auto;
          text-align: center;
          
          span {
            display: none;
          }
        }
      }
    }
    
    /* Tablet (768px - 991px) */
    @media (max-width: 991px) and (min-width: 768px) {
      width: 100%;
      height: auto;
      flex-direction: row;
      padding: 1rem;
      border-radius: 20px;
    }
    
    /* Mobile (767px and below) */
    @media (max-width: 767px) {
      width: 100%;
      height: auto;
      flex-direction: column;
      padding: 0.5rem;
      border-radius: 15px;
      gap: 1rem;
      
      .user-con {
        height: auto;
        
        img {
          width: 50px;
          height: 50px;
        }
        
        h2 {
          font-size: 1rem;
        }
        
        p {
          font-size: 0.8rem;
        }
      }
      
      .menu-items {
        flex-direction: row;
        justify-content: space-around;
        gap: 0.5rem;
        
        li {
          grid-template-columns: auto;
          text-align: center;
          padding: 0.5rem;
          
          span {
            display: none;
          }
          
          i {
            font-size: 1.2rem;
          }
        }
      }
    }

`;
export default Navigation;
