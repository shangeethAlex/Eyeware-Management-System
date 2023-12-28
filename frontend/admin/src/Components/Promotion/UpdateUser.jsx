import React,{useState,useEffect} from "react";
import './form.css';
import { useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'

function UpdateUser(){
    const {id} = useParams()
    const formArray = [1, 2, 3,4];
    const [formNo, setFormNo] = useState(formArray[0])
    const [code,setCode] = useState()
    const [name,setName] = useState()
    const [value,setValue] = useState()
    const [couponType,setCouponType] = useState()
    const [description,setDescription] = useState()
    const [minOrder,setMinOrder] = useState()
    const [maxOrder,setMaxOrder] = useState()
    const [status,setStatus] = useState()
    const [restrictEmail,setEmail] = useState()
    const [noItem,setItem] = useState()
    const [usageLimit,setLimit] = useState()
    const [couponQuantity,setQuantity] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const navigate = useNavigate()

    const next = () => {
        if (formNo === 1 && code && name && description && status) {
          setFormNo(formNo + 1)
        }
        else if (formNo === 2 && value && couponType && startDate && endDate) {
          setFormNo(formNo + 1)
        }else if (formNo === 3 && minOrder && maxOrder && restrictEmail && noItem && usageLimit && couponQuantity && usageLimit) {
            setFormNo(formNo + 1)
        }else {
          toast.error('Please fillup all input field')
        }
      }
      const pre = () => {
        setFormNo(formNo - 1)
      }
      const finalSubmit = () => {
        if (minOrder && maxOrder && restrictEmail && noItem && usageLimit && couponQuantity  ) {
          toast.success('form submit success')
        } else {
          toast.error('Please fillup all input field')
        }
      }


    useEffect(()=>{
        axios.get('http://localhost:8070/promotion/getUser/'+id)
        .then(result=> {console.log(result)
            setCode(result.data.code)
            setName(result.data.name)
            setValue(result.data.value)
        })
        .catch(err => console.log(err))
    },[])

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8070/promotion/updateUser/"+id,{code,name,value,description,minOrder,maxOrder,couponType,status,restrictEmail,noItem,usageLimit,couponQuantity,startDate,endDate})
        .then(result => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Coupon has been successfully Updated',
                showConfirmButton: false,
                timer: 1500
              })
              console.log(result)
              navigate('/coupon')
            
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
        <ToastContainer />
        {
        formNo === 1 && <div>
        <div className="container">
        <form >
        <div className="form first">
        <header>Coupon update</header>
                    <div className="fields">
                        <div className="input-field">
                            <label>Coupon Code  : </label>
                            <input type="text"  value={code} onChange={(e) => setCode(e.target.value)}/> 
                        </div>
                        <div className="input-field">
                            <label>Coupon Name</label>
                            <input type="text" value={name}  onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <label>Status</label>
                            <select  value={status} onChange={(e) => setStatus(e.target.value)} >
                                <option disabled selected>Select status</option>
                                <option>Activate</option>
                                <option>DeActivate</option>
                            </select>
                        </div>
                        <div class="mb-1">
                            <label for="couponTextarea" class="form-label">Coupon Description</label>
                            <textarea class="form-control " id="couponTextarea" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                            <div class="invalid-feedback">
                                Please enter a description in the textarea.
                            </div>
                        </div>
                    </div> 
                    <div className="text-center">
                            <button className="nextBtn btn btn-primary" id="btnSave" onClick={next}>Next</button>
                             <button className="btn btn-primary" id="btnSave" type="reset">Reset</button>
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
         <form>
         <div className="form first">
         <div className="input-field">
                <div className="details personal">
                     <div className="fields">
                         <div className="input-field">
                             <label>Coupon value</label>
                             <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                         </div>
                         <div class="mb-2 col-sm-3">
                             <label for="couponType" class="col-sm-10 col-form-label">Coupon Type</label>
                             <select class="form-select" id='couponType' aria-label="Default select example" value={value} onChange={(e) => setCouponType(e.target.value)}>
                                 <option selected>select</option>
                                 <option value="1">percentage coupon</option>
                                 <option value="2">timeperiodcoupon</option>
                                 <option value="3">blackdayCoupon</option>
                             </select>
                         </div>
                         <div className="input-field">
                            <label>Starting Date</label>
                             <input type="date" placeholder="Enter starting date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                         </div>
                         <div className="input-field">
                             <label>Expiry Date</label>
                            <input type="date" placeholder="Enter ending date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                         </div>
                     </div> 
                     <div className="text-center">
                         <button className="backBtn btn btn-primary" id="btnSave" onClick={pre}>back</button>
                         <button className="nextBtn btn btn-primary" id="btnSave" onClick={next}>Next</button>
                         <button className="btn btn-primary" id="btnSave" type="reset">Reset</button>
                     </div>
                 </div>
             </div>
             </div>
         </form>
     </div>   
          </div>
        }

        {
          formNo === 3 && <div>
            <div className="container">
         <header>Usage Limit</header><br></br>
         <form onSubmit={Update}>
         <div className="form first">
         <div className="input-field">
                 <div className="details personal">
                     <div className="fields">
                         <div className="input-field">
                             <label>Minmum order Amount</label>
                             <input type="number" value={minOrder} onChange={(e) => setMinOrder(e.target.value)}/>
                         </div>
                        
                         <div className="input-field">
                             <label>Maximum order Amount</label>
                             <input type="number" value={maxOrder} onChange={(e) => setMaxOrder(e.target.value)}/>
                         </div>
                        <div className="input-field">
                            <label>Email Restrictions :</label>
                             <input type="email" value={restrictEmail} onChange={(e) => setEmail(e.target.value)}/>
                         </div>
                         <div className="input-field">
                             <label>Specify the no of cart items the coupon code can be applied</label>
                             <input type="number" value={noItem} onChange={(e) => setItem(e.target.value)}/>
                         </div>
                         <div className="input-field">
                            <label>coupon Qaunttity</label>
                             <input type="number"  value={couponQuantity} onChange={(e) => setQuantity(e.target.value)}/>
                         </div>
                         <div className="input-field">
                             <label>No of time the user can use this discount</label>
                             <input type="number" value={usageLimit}  onChange={(e) => setLimit(e.target.value)}/>
                         </div>
                     </div> 
                    <div className="text-center">
                    <button className="btn btn-primary" id="btnSave" onClick={pre}>back</button>
                         <button className="btn btn-primary" id="btnSave" onClick={finalSubmit}>create coupon</button> 
                         <button className="btn btn-primary" id="btnSave" type="reset">Reset</button>
                     </div>
                </div>
             </div>
             </div>
         </form>
    </div> 
          </div>
        }
           {
          formNo === 4 && <div>
            <div className="container">
         <header>coupon created</header><br></br>
         <form >
         
         </form>
    </div> 
          </div>
        }
           
        {/* <label>Coupon Code  : </label>
            <input type="text"  value={code} onChange={(e) => setCode(e.target.value)}/> 
        </div>
            <div class="form first">
            <div class="input-field">
                </div>
                <div class="details personal">
                    <span class="title">Coupon Details</span>
                    <div class="fields">
                    <div class="input-field">
                            <label>Coupon Name</label>
                            <input type="text" value={name}  onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div class="input-field">
                            <label>Coupon value</label>
                            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                        </div>
                        <div class="input-field">
                            <label>Minmum order Amount</label>
                            <input type="number"   />
                        </div>
                        <div class="input-field">
                            <label>Status</label>
                            <select required onChange={(e) => setStatus(e.target.value)}>
                                <option disabled selected>Select status</option>
                                <option>Activate</option>
                                <option>DeActivate</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Maximum order Amount</label>
                            <input type="number"  />
                        </div>
                        <div class="input-field">
                            <label>Email Restrictions :</label>
                            <input type="number" />
                        </div>
                        <div class="input-field">
                            <label>Specify the no of cart items the coupon code can be applied</label>
                            <input type="number"  />
                        </div>
                        <div class="input-field">
                            <label>Usage limit for customer</label>
                            <input type="number"   />
                        </div>
                        <div class="input-field">
                            <label>No of time the user can use this discount</label>
                            <input type="number"  />
                        </div>

                        <div class="input-field">
                            <label>products applicable for this coupon</label>
                            <select>
                                <option disabled selected>Select product</option>
                                <option>sun glass radian</option>
                                <option>zeelool glass</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Description</label>
                            <input type="text"  />
                        </div>
                        <div class="input-field">
                            <label>Starting Date</label>
                            <input type="date" placeholder="Enter starting date" />
                        </div>
                        <div class="input-field">
                            <label>Expiry Date</label>
                            <input type="date" placeholder="Enter expiry date"/>
                        </div>
                        <div>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                            <label for="vehicle1"> Coupon code applies to all qualifying items in the cart</label>
                        </div>
                    </div>
                </div>
                <div class="details ID">
                    <div class="fields">
                    </div>
                    <button class="CreateBtn">
                        <span class="btnText">Update</span>
                        <i class="uil uil-navigator"></i>
                    </button>
                </div>  */}
            </div>
    )
}

export default UpdateUser;