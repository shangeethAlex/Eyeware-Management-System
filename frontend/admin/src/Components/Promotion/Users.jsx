import React,{ useEffect, useState,useRef} from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Swal from 'sweetalert2'
import {useReactToPrint} from "react-to-print"
import { NavLink, useParams, useHistory } from 'react-router-dom';
import Modal from "./Modal/Modal";
import emailjs from 'emailjs-com'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './form.css';
import jsPDF from "jspdf";
import Modals from './components/model2/Modals'; // Import your Modal2 component

function Users(){

    const [users,setUsers] = useState([])
    const componentPDF = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const {id} = useParams()
    const form = useRef();
    const [messageSent, setMessageSent] = useState(false);
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("");
    const [originalUsers, setOriginalUsers] = useState([]);
    const [searchCouponName, setSearchCouponName] = useState(""); // New state



    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_u4q0rc5', 'template_85byiol', form.current, 'wmKeHQtmUK9LKa86l')
        .then(
          (result) => {
            console.log(result.text);
            console.log('Message sent');
            setMessageSent(true);
  
            toast.success('Message sent successfully!', {
              position: 'top-right',
              autoClose: 3000, // Toast message will auto close after 3 seconds
            });
  
            // Delay the redirection by 3 seconds (3000 milliseconds)
            setTimeout(() => {
              window.location.href = '/coupon';
            }, 3000);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }

    useEffect(()=>{
        axios.get('http://localhost:8070/promotion/getUsers')
        .then(result => {
          setOriginalUsers(result.data);
          setUsers(result.data);
          console.log(result.data)
          console.log(users.length)
        })
        .catch(err => console.log(err))
    },[])

   // ...

useEffect(() => {
  if (originalUsers) {
    // Filter the users array based on the searchQuery
    const filteredUsersByCode = originalUsers.filter(user =>
      user.code && user.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter the filteredUsersByCode array based on the searchCouponName
    const filteredUsers = filteredUsersByCode.filter(user =>
      user.name && user.name.toLowerCase().includes(searchCouponName.toLowerCase())
    );

    // Update the state with filtered results
    setUsers(filteredUsers);
  }
}, [searchQuery, searchCouponName, originalUsers]);

// ...




    const handleSearch = (e) => {
      const query = e.target.value.toLowerCase();
      // Filter the users array based on the searchQuery
      const filteredUsers = users.filter(user =>
        user.code.toLowerCase().includes(query)
      );
      // Update the state with filtered results
      setUsers(filteredUsers);
      setSearchQuery(query);
    };

    const handleSearchCouponName = () => {
      // Filter the users array based on the searchCouponName
      const filteredUsers = originalUsers.filter(user =>
        user.name.toLowerCase().includes(searchCouponName.toLowerCase())
      );
      // Update the state with filtered results
      setUsers(filteredUsers);
    };

    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8070/promotion/deleteUser/'+id)
                .then(res => {console.log(res)
                  navigate('/')
               
            })
                .catch(errr => console.log(errr))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                
              )
              window.location.reload()
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
        
    }
    const generatePDF = () => {
      const doc = new jsPDF();
      doc.text("List of Coupons", 10, 10);
  
      const tableHeaders = [
        "Coupon Code",
        "Coupon Name",
        "Coupon value",
        "Starting Date",
        "Ending Date",
      ];
      const tableData = users.map((users) => [
        users.code,
        users.name,
        users.value,
        new Date(users.startDate).toLocaleDateString("en-GB"),
        new Date(users.endDate).toLocaleDateString("en-GB"),
      ]);
  
      doc.autoTable({
        head: [tableHeaders],
        body: tableData,
        startY: 20,
      });
  
      // Save the PDF as a file
      doc.save("Coupons.pdf");
    };

    // ///////////////////////////


useEffect(() => {
  const timer = setTimeout(() => {
    setModalOpen(true);
  }, 5000); // 

  return () => {

    clearTimeout(timer);
  };
}, []);
/////////////////////////



    return(
      <div>
  
      <div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">send coupon to customer</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      {messageSent ? (
        <ToastContainer />
      ) : (
        <form ref={form} onSubmit={sendEmail}>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Customer Name:</label>
            <input type="text" class="form-control" id="recipient-name" name="user_name"/>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Customer Email:</label>
            <input type="email" class="form-control" id="recipient-name" name="user_email" />
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Coupon Code:</label>
            <input type="text" class="form-control" id="recipient-code" name="message" />
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" >Send message</button>
      </div>
        </form>
        )}
      </div>
      
    </div>
  </div>
</div>
      </div>
    

        <div className="d-flex vh-100 align-items-center input-group">
        <div class="row" id="iii">
        <div class=" col schclass input-group ">
          <input type="search" class="form-control rounded  " placeholder="code" aria-label="Search"  value={searchQuery} onChange={handleSearch} aria-describedby="search-addon" />
        </div>
          <div class="col">
          <input type="search" class="form-control rounded " placeholder="Name" aria-label="Search"   value={searchCouponName} onChange={(e) => setSearchCouponName(e.target.value)} aria-describedby="search-addon" />
          </div>
        </div>
 
            <div className="w-100 bg-white rounded p-4 ">
                <Link to="/create" className='btn btn-success' id="btn1">Create coupon</Link>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" id="btn1">Send Coupon</button>
                <button className="btn btn-danger" onClick={generatePDF}  id="btn1"><DownloadOutlinedIcon /></button>
        
                {/* <div className="App">
    {modalOpen && <Modals setOpenModal={setModalOpen} />}
  </div> */}
                <div className="table-container" style={{ height: "550px", overflowY: "auto" }}>
                <div ref={componentPDF} style={{width:'100%'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>value(%)</th>
                            <th>start Date</th>
                            <th>Ending Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user)=> {
                                return <tr>
                                    <td>{user.code}</td>
                                    <td>{user.name}</td>
                                    <td>{user.value}</td>
                                    <td>{new Date(user.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(user.endDate).toLocaleDateString()}</td>
                    

                                    <td>
                                        <Link to={`/views/${user._id}`}> <button className="btn btn-success" id="btn1"><RemoveRedEyeIcon /></button></Link>
                                        <Link to={`/update/${user._id}`} className="btn btn-primary" id="btn1"><CreateIcon/></Link>
                                        <button className="btn btn-danger" id="btn1" onClick={(e) => handleDelete(user._id)}><DeleteOutlineIcon /></button>
                                        
                                        
        
                                        
                                    </td>
                                </tr>
                            })  
                        }
                    </tbody>
                </table>
                </div>
                </div>
                
            </div>
        </div>  
        </div>   
    )
}

export default Users;