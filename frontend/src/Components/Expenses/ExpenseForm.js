import React ,{ useState } from 'react'
import styled from 'styled-components'
import Datepicker  from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../utilis/icon'

function  ExpenseForm() {
    const {addExpense,updateExpense,getExpense,error,setError,editingItem,setEditingItem}=useGlobalContext()
    
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
        setError()
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (editingItem) {
            updateExpense(editingItem._id, inputState);
            setEditingItem(null);
        } else {
            addExpense(inputState);
        }
        setInputState({
            title: '',
            amount: '',
            category: '',
            date: '',
            description: '',
        });
    }
    return (
  <ExpenseFormStyled onSubmit={handleSubmit}>
   {error && <p className='error'>{error}</p>}
    <div className="input-control">
        <input type="text"
        value={title}
        name={'title'}
        placeholder='Expense Title'
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
    <option value="education">Education</option>
    <option value="maintains">Vehicle Maintains</option>
    <option value="groceries">Grocerie</option>
    <option value="health">Health</option>
    <option value="subscriptions">Subscriptions</option>
    <option value="takeaways">Takeaways</option>
    <option value="clothing">Clothing</option>
    <option value="travelling">Travelling</option>
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
      name={editingItem ? 'Update Expense' : 'Add Expense'}
      icon={plus}
      bpad={'.8rem 1.6rem'}
      bRad={'30px'}
      bg={'var(--color-accent)'}
      color={'#fff'}
      hoverBg={'var(--color-red)'}
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
    </ExpenseFormStyled>   
)
}

const ExpenseFormStyled = styled.form`
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
    width: 100%;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        border: 2px solid #7ed9faff;
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
            color: #7ed9faff;
            &:focus, &:active {
                color: #7ed9faff;
            }
        }
    }
    .submit-btn {
        button {
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

            &:hover {
                background:var(--color-red);
            }
        }
    }



`;
export default ExpenseForm;
