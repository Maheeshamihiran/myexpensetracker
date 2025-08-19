
import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import bg from './img/bg.jpg';
import { MainLayout } from './styles/Layouts';
import Obs from './Components/Obs/Obs';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import ViewTransactions from './Components/ViewTransactions/ViewTransactions';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import { useGlobalContext } from './context/globalContext';
function App() {
  const [active, setActive] = React.useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const global = useGlobalContext();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);
  
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };
const displayData =( ) => {
  switch (active) {
    case 1:
      return <Dashboard />;
    case 2:
      return <ViewTransactions />;
    case 3:
       return <Income />;
    case 4:
      return <Expenses />;
    default:
        return <Dashboard />;
  }
}

const orbMemo = useMemo(() => {
  return <Obs />;
}, []);

  if (loading) {
    return (
      <AppStyled bg={bg} className="App">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', fontSize: '1.5rem'}}>
          Loading...
        </div>
      </AppStyled>
    );
  }

  if (!isAuthenticated) {
    return (
      <AppStyled bg={bg} className="App">
        {showSignup ? (
          <Signup switchToLogin={() => setShowSignup(false)} />
        ) : (
          <Login 
            onLogin={handleLogin} 
            switchToSignup={() => setShowSignup(true)} 
          />
        )}
      </AppStyled>
    );
  }

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}   
      <MainLayout>
        <Navigation 
          active={active} 
          setActive={setActive} 
          user={user}
          onLogout={handleLogout}
        />
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