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
        --color-green :#42AD00;
        --color-grey:#aaa;
        --color-accent:#F56692;
        --color-delete:#ff0000;
       }
    body {
          font-family  :'nunito', sans-serif;
          font-size:clamp(1rem, 2vw, 1.2rem);
          overflow: hidden;
          color:rgba(34,34,96,0.6);
   }
`;