import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'

function Login({ onLogin, switchToSignup }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        onLogin(data.user)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <LoginStyled>
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-control">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-control">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            name="Login"
            bpad=".8rem 1.6rem"
            bRad="30px"
            bg="var(--color-accent)"
            color="#fff"
          />
        </form>
        <p className="switch-auth">
          Don't have an account? 
          <span onClick={switchToSignup}> Sign Up</span>
        </p>
      </div>
    </LoginStyled>
  )
}

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .auth-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
    border: 3px solid rgba(255, 255, 255, 0.5);
    width: 100%;
    max-width: 400px;

    h2 {
      text-align: center;
      color: #222260;
      margin-bottom: 2rem;
    }

    .error {
      color: red;
      text-align: center;
      margin-bottom: 1rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .input-control {
        input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 1rem;
          
          &:focus {
            outline: none;
            border-color: var(--color-accent);
          }
        }
      }
    }

    .switch-auth {
      text-align: center;
      margin-top: 1rem;
      color: #666;

      span {
        color: var(--color-accent);
        cursor: pointer;
        font-weight: 600;
      }
    }
  }
`

export default Login