import React ,{ useState } from 'react'
import styled from 'styled-components'
import Datepicker  from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../utilis/icon'

function  Form() {
    const {addIncome,updateIncome,getIncomes,error,setError,editingItem,setEditingItem}=useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
        description: '',
    })
    
    React.useEffect(() => {
        if (editingItem) {
            setInputState({
                title: editingItem.title || '',
                amount: editingItem.amount || '',
                category: editingItem.category || '',
                date: editingItem.date ? new Date(editingItem.date) : '',
                description: editingItem.description || '',
            });
        }
    }, [editingItem]);
    const {title, amount, category, date, description} = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form submitted. editingItem:', editingItem);
            console.log('inputState:', inputState);
            if (editingItem) {
                console.log('Updating income with ID:', editingItem._id);
                await updateIncome(editingItem._id, inputState);
                setEditingItem(null);
            } else {
                console.log('Adding new income');
                await addIncome(inputState);
            }
            setInputState({
                title: '',
                amount: '',
                category: '',
                date: '',
                description: '',
            });
        } catch (err) {
            console.error('Form submission error:', err);
            setError(err.message || 'An error occurred');
        }
    }
    return (
  <FormStyled onSubmit={handleSubmit}>
    {error && <p className='error'>{error}</p>}
    {editingItem && <p className='info'>Editing: {editingItem.title}</p>}
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
      name={editingItem ? 'Update Income' : 'Add Income'}
      icon={plus}
      bpad={'.8rem 1.6rem'}
      bRad={'30px'}
      bg={'var(--color-accent)'}
      color={'#fff'}
      hoverBg={'var(--color-green)'}
     />
     {editingItem && (
       <Button
         name={'Cancel'}
         bpad={'.8rem 1.6rem'}
         bRad={'30px'}
         bg={'#ccc'}
         color={'#333'}
         onClick={() => {
           setEditingItem(null);
           setInputState({
             title: '',
             amount: '',
             category: '',
             date: '',
             description: '',
           });
         }}
       />
     )}
    </div>
    </FormStyled>   
)
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .error {
    color: red;
    background: #ffe6e6;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid red;
  }
  
  .info {
    color: blue;
    background: #e6f3ff;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid blue;
  }
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
    width: 100%;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        border: 2px solid #42ad00;
    }
}

.react-datepicker-wrapper {
    width: 100%;
}

.react-datepicker__input-container input {
    width: 100%;
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
        display: flex;
        gap: 1rem;
        
        button {
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            flex: 1;

            &:hover {
                background:var(--color-green);
            }
        }
    }
    
    /* Desktop (1200px+) */
    @media (min-width: 1200px) {
        gap: 1rem;
    }
    
    /* Laptop (992px - 1199px) */
    @media (max-width: 1199px) and (min-width: 992px) {
        gap: 0.8rem;
    }
    
    /* Tablet (768px - 991px) */
    @media (max-width: 991px) and (min-width: 768px) {
        gap: 0.8rem;
        
        .submit-btn {
            flex-direction: column;
            
            button {
                width: 100%;
            }
        }
    }
    
    /* Mobile (767px and below) */
    @media (max-width: 767px) {
        gap: 0.5rem;
        
        input, select, textarea {
            padding: 0.75rem;
            font-size: 0.9rem;
        }
        
        .submit-btn {
            flex-direction: column;
            gap: 0.5rem;
            
            button {
                width: 100%;
                padding: 0.75rem 1rem;
            }
        }
    }
`;
export default Form;
