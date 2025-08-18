import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {  
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none; 
    font-family: 'Poppins', sans-serif;
   }

 : root{
        --primary-color: #222260;
        --primary-color: 'color:rgba(34,34,96,0.6)';
        --primary-color: 'color:rgba(34,34,96,0.4)'; 
        --color-green :rgba(113, 211, 33, 1);
        --color-grey:#aaa;
        --color-red:#cf3119;
        --color-accent:#F56692;
        --color-delete:#ff0000;
       }
    body {
          font-family  :'nunito', sans-serif;
          font-size:clamp(1rem, 2vw, 1.2rem);
          overflow: hidden;
          color:rgba(34,34,96,0.6);
   }
          h2,h1,h3,h5,h6{

          color: var(--primary-color);
          
          }

          .error{
           color:red;
           animation: shake 0.5s ease-in-out;
           @keyframes shake{
                  0%{      
           
                     transform: translatex(0);
                   } 
                  25%{
                      transform: translateX(10px);
                      }
                  50%{
                      transform: translatex(-10px);
                     }
                  75%{
                       transform: translatex(10px);
                    } 
                  100%{
                       transform: translatex(0);
                    } 
           
           
                       }

          }
`;