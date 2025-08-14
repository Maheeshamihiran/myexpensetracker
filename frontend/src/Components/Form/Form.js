import React ,{ useState } from 'react'
import styled from 'styled-components'
import Datepicker  from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../utilis/icon'

function  Form() {
    const {addIncome}=useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
        description: '',
    })
    const {title, amount, category, date, description} = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        addIncome(inputState);
       
    }
    return (
  <FormStyled onSubmit={handleSubmit}>

    <div className="input-control">
        <input type="text"
        value={title}
        name={'title'}
        placeholder='Salary Title'
        onChange={handleInput('title')}/>
    </div>

    <div className="input-control">
        <input type="text"
        value={amount}
        name={'amount'}
        id={'amount'}
        placeholder='Amount'
        onChange={handleInput('amount')}/>
        </div>
    <div className="input-control">
        <Datepicker
         id='date'
         placeholderText='Enter A Date'
            selected={date}
            dateFormat={"dd/MM/yyyy"}
            onChange={(date) => setInputState({...inputState, date})}
            />
            </div>
    <div className="selects input-control">
    <select required value={category} name="category" id="category" onChange={handleInput('category')}>
    <option value="" disabled >Select Option</option>
    <option value="salary">Salary</option>
    <option value="freelancing">Freelancing</option>
    <option value="investiments">Investiments</option>
    <option value="stocks">Stocks</option>
    <option value="donate">Donate</option>
    <option value="bank">Bank Transfer</option>
    <option value="classpees">Classpees</option>
    <option value="mahapola">Mahapola</option>
    <option value="other">Other</option>
   </select>
  </div>
  <div className ="input-control">
    <textarea name="description"
    value={description}
    placeholder='Add A Reference'
     id = "description"
     cols="30"
     rows="4"
     onChange={handleInput('description')}>
    </textarea>
    </div>
    
  <div className='submit-btn'>
    <Button
    
      name={'Add Income'}
      icon={plus}
      bpad={'.8rem 1.6rem'}
      bRad={'30px'}
      bg={'var(--color-accent'}
      color={'#fff'}
      
     />
    </div>
    </FormStyled>   
)
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
input, select, textarea {
    font-family: inherit;
    font-size:  1rem;
    outline: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: transparent;
    resize: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: border 0.3s ease;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        border: 2px solid #42ad00;
    }
}

.input-control {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
  
.selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: #42ad00;
            &:focus, &:active {
                color: #42ad00;
            }
        }
    }
    .submit-btn {
        button {
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

            &:hover {
                background:var(--color-green);
            }
        }
    }



`;
export default Form;
