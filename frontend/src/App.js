
import React, { useMemo } from 'react';
import styled from 'styled-components';
import bg from './img/bg.jpg';
import { MainLayout } from './styles/Layouts';
import Obs from './Components/Obs/Obs';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
function App() {

const [active, setActive] = React.useState(1);

 const global = useGlobalContext ()
const displayData =( ) => {
  switch (active) {
    case 1:
      return <Dashboard />;
    case 2:
      return<Dashboard />;
    case 3:
       return <Income />;
    case 4:
      return <Expenses />;
    default:
        return <Dashboard />;

    //   return <h1>Reports</h1>;
    // case 4:
    //   return <h1>Settings</h1>;
    // default:
    //   return <h1>Dashboard</h1>;
  }
}

const orbMemo = useMemo(() => {
  return <Obs />;
}, []);

  return (
    <AppStyled bg={bg} className="App">
    {orbMemo}   
    <MainLayout>
     <Navigation  active={active}  setActive={setActive} />
     <main>
      {displayData()}
    
     </main>
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

 main {
 flex: 1;
 background-color: rgba(255, 255, 255, 0.8);
 border-radius: 32px;
 backdrop-filter: blur(4.5px);
 border: 3px solid #FFFFFF;
 overflow: auto;
 overflow-x: hidden;
 &::-webkit-scrollbar {
  width: 8px;
  padding: 2rem;
}
 }
`;


export default App;