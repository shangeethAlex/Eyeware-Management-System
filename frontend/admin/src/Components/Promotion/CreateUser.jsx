import React, { useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import './form.css';
import './index.css'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


function CreateUser() {
    const formArray = [1, 2, 3,4];
    const [formNo, setFormNo] = useState(formArray[0])
    const [code,setCode] = useState()
    const [name,setName] = useState()
    const [description,setDescription] = useState()
    const [value,setValue] = useState()
    const [couponQuantity,setQuantity] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const [dateError, setDateError] = useState();
   
    const navigate = useNavigate()

    const handleCodeChange = (e) => {
      const inputCode = e.target.value;
      const codeErrorTextElement = document.getElementById('codeErrorText'); // Replace with the actual ID of your error message element
  
      if (inputCode.length === 10) {
        setCode(inputCode);
        codeErrorTextElement.textContent = 'correct!!'; // Clear any existing error message
        e.target.disabled = true; // Disable the input field after entering 10 characters
      } else {
        setCode('');
        codeErrorTextElement.textContent = 'Coupon code must be exactly 10 characters.';
      }
    }



    const handleNameChange = (e) => {
      const inputName = e.target.value;
      const errorTextElement = document.getElementById('nameErrorText'); // Replace with the actual ID of your error message element
  
      if (inputName.length < 20) {
        setName(inputName);
        errorTextElement.textContent = 'Coupon name must not exceed 20 characters.'; // Clear any existing error message
        
      } else {
        setName(inputName.substring(0, 20)); 
        errorTextElement.textContent = 'done';
      }
    }

    const handleDescriptionChange = (e) => {
      const inputDescription = e.target.value;
      const errorTextElement = document.getElementById('descriptionErrorText'); // Replace with the actual ID of your error message element
  
      if (inputDescription.length <= 30) {
        setDescription(inputDescription);
        errorTextElement.textContent = 'Coupon description must not exceed 50 characters.'; // Clear any existing error message
      } else {
        setDescription('');
        errorTextElement.textContent = 'Done!';
      }
    }

  const handleStartDateChange = (e) => {
    const inputStartDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];

    if (inputStartDate >= today) {
      setStartDate(inputStartDate);
   
    } else {
      
      toast.error('Starting date must be today or a future date.', {
        autoClose: 300, // Set the duration in milliseconds (e.g., 3000ms or 3 seconds)
      });
      setStartDate('');
    }
  };
  

  const handleEndDateChange = (e) => {
    const inputEndDate = e.target.value;
    setEndDate(inputEndDate);
    validateDates(startDate, inputEndDate);
  }

  const validateDates = (start, end) => {
    if (start && end && new Date(start) > new Date(end)) {
      toast.error('Starting date cannot be later than the ending date..', {
        autoClose: 300, // Set the duration in milliseconds (e.g., 3000ms or 3 seconds)
      });
    }else if(start && end && new Date(start) === new Date(end)){
      
      toast.error('Starting date and ending date cannot be same.', {
        autoClose: 300, // Set the duration in milliseconds (e.g., 3000ms or 3 seconds)
      });
    }else {
      setDateError('');
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue <= 100) {
      setValue(inputValue);
    } else {
      alert('Coupon value should be less than 100');
    }
  };

  const next = () => {
    if (formNo === 1 && code && name && description ) {
      setFormNo(formNo + 1)
    }
    else if (formNo === 2 && value &&  startDate && endDate) {
    }else {
      toast.error('Please fillup all input field')
    }
  }
  const pre = () => {
    setFormNo(formNo - 1)
  }
  const finalSubmit = () => {
    if (value &&  startDate && endDate  ) {
      toast.success('form submit success')
    } else {
      toast.error('Please fillup all input field')
    }
  }

  const Submit = (e) => {
            e.preventDefault();
            axios.post("http://localhost:8070/promotion/createUser",{code,name,value,description,couponQuantity,startDate,endDate})
            .then(result => {
                
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Coupon has been successfully created',
                  showConfirmButton: false,
                  timer: 1500
                })
                console.log(result)
                navigate('/coupon')
            })
            .catch(err => console.log(err))
    }
  return (
    <div>
      <ToastContainer />
      {
        formNo === 1 && <div>
        <div className="container">
        
        <form >
          <header>Coupon Creation</header><br></br>
        <div className="form first">
                    <div className="fields">
                        <div className="input-field">
                            <label>Coupon Code  : </label>
                            <input type="text"   onChange={handleCodeChange} required/>
                            <span id="codeErrorText" className="error-text"></span> {/* Error message element */}
                        </div>
                        <div className="input-field">
                            <label>Coupon Name</label>
                            <input type="text" onChange={handleNameChange}   maxlength="20" required/>
                            <span id="nameErrorText" className="error-text"></span> {/* Error message element */}
                        </div>
                       
                        <div className='input-field'>
                          <label for="couponTextarea" class="form-label">Coupon Description</label>
                          <textarea class="form-control " id="couponTextarea"  onChange={handleDescriptionChange} maxlength="30" required></textarea>
                          <div class="invalid-feedback">
                            Please enter a description in the textarea.
                          </div>
                          <span id="descriptionErrorText" className="error-text"></span> {/* Error message element */}
                        </div>   
                    </div> 

                    <div className="text-center">
                      <button class="btn btn-custom" id="btnSave" onClick={next}>Next</button>
                      <button class="btn btn-custom" id="btnSave" type="reset">Reset</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        }

        {
          formNo === 2 && <div>
            <div className="container">
         <header>General</header><br></br>
         <form  onSubmit={Submit}>
         <div className="form first">
         <div className="input-field">
                <div className="details personal">
                     <div className="fields">
                         <div className="input-field">
                             <label>Coupon value(%)</label>
                             <input type="number"  onChange={handleInputChange} max={100} required/>
                         </div>
                         <div className="input-field">
                            <label>Starting Date</label>
                             <input type="date" placeholder="Enter starting date" onChange={handleStartDateChange} required/>
                         </div>
                         <div className="input-field">
                             <label>Expiry Date</label>
                            <input type="date" placeholder="Enter ending date" onChange={handleEndDateChange} required/>
                         </div>
                     </div> 
                     <div className="text-center">
                         <button className="backBtn btn btn-primary" id="btnSave" onClick={pre}>back</button>
                         <button className="btn btn-primary" id="btnSave" onClick={finalSubmit}>create coupon</button> 
                         <button className="btn btn-primary" id="btnSave" type="reset">Reset</button>
                     </div>
                    </div>
                  </div>
                </div>
                {dateError && <p className="error-message">{dateError}</p>}
              </form>
            </div>   
          </div>
        }
      </div>
    );
}

export default CreateUser;