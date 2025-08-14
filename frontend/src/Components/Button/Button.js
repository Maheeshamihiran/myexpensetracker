import React from 'react'
import styled from 'styled-components'

 function Button({name ,icon ,onClick,bg,bpad,color,bRad,hcolor}) {
  return (
    <ButtonStyled style ={{
        backgroundColor: bg,
        padding: bpad,
        color: color,
        borderRadius: bRad
        
    }} onClick={onClick}>

        {icon}
        {name}
      
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
    display: flex;
    align-items: center;
    outline: none;
    gap: 0.5rem;
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease-in-out;

    &:hover {
        opacity: 0.8;
    }
`;

export default Button;