
import React , {useState}from 'react';
import styled from 'styled-components';
import bg from './img/bg.jpg';
import { MainLayout } from './styles/Layouts';
import Obs from './Components/Obs/Obs';
import Navigation from './Components/Navigation/Navigation';

function App() {

const [active ,setActive] = React.useState(1);



  return (
    <AppStyled bg={bg} className="App">
     <Obs/>   
    <MainLayout>
     <Navigation  active={active}  setActive={setActive} />
   
    </MainLayout>
    </AppStyled>
  );

}
const AppStyled = styled.div`
 height: 100vh;
 background-image: url(${props => props.bg});
 background-size: cover;
 background-position: center;
 background-repeat: no-repeat;
 position: relative;
`;


export default App;