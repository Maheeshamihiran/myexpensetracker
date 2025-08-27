import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'

function Signup({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const BASE_URL =  process.env.REACT_APP_BASE_URL;
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSuccess('Account created successfully! Please login.')
        setError('')
        setTimeout(() => switchToLogin(), 2000)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Signup failed')
    }
  }

  return (
    <SignupStyled>
      <div className="auth-container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-control">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="input-control">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            name="Sign Up"
            bpad=".8rem 1.6rem"
            bRad="30px"
            bg="var(--color-accent)"
            color="#fff"
            hoverBg={"var(--color-grey)"}
          />
        </form>
        <p className="switch-auth">
          Already have an account? 
          <span onClick={switchToLogin}> Login</span>
        </p>
      </div>
    </SignupStyled>
  )
}

const SignupStyled = styled.div`
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

    .success {
      color: green;
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

export default Signup