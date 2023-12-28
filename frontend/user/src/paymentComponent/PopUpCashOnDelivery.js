import React,{useState,useEffect } from 'react';
import emailjs from 'emailjs-com'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
 

function PopupForm({ closePopup,firstName ,mail  }) {
 
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleCloseClick = () => {
       setIsFormSubmitted(true);
  };

  
 const [isToastVisible, setIsToastVisible] = useState(false);

 useEffect(() => {
   if (isToastVisible) {
     const timer = setTimeout(() => {
       // Redirect to the payment page after the toast message times out
       setIsToastVisible(false);
       // Replace '/payment' with your desired payment page URL
       window.location.href = '/';
     }, 3000); // Adjust the timeout duration as needed (3000 milliseconds = 3 seconds)
     
     return () => {
       clearTimeout(timer); // Clear the timeout if the component unmounts before the timeout completes
     };
   }
 }, [isToastVisible]);

//email 
const sendEmail = () => {
  emailjs
    .send(
      'service_o4lejvv', // replace with your EmailJS service ID
      'template_6h0j0a4', // replace with your EmailJS template ID
      {
        to_name: `${firstName}`,
        product:"Blue Spects",
        payment:"$650",
        from_name:'LankaOpticals',
        to_email: `${mail}`,
        message: 'Thank you for choosing cash on delivery with us. We appreciate your business and want to make your shopping experience as convenient as possible. Your product is on its way!.',
      
      },
      'zmODVjugiCFyY9DWt' // replace with your EmailJS user ID
    )
    .then(
      (response) => {
        console.log('Email sent:', response);
        toast.success('Mail was sent', { position: 'top-center' });
        setIsToastVisible(true);
     
      },
      (error) => {
        console.error('Email sending failed:', error);
      }
    );
};





  return (
    <div className="popup">
      <div className="popup-content">
      {isFormSubmitted ? (
          <div>
            <h2 style={{color:'#1b5c04'}}> purchased successfully!</h2>
            <p>Thank you for your purchase</p>
            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={sendEmail}>Ok</button>
            {isToastVisible && <ToastContainer position="top-center" autoClose={3000} />}
    
          </div>
        ) : (
         <div> 
        <h2>Confirm order</h2>
        <p>You can pay in cash to our courier when you receive the goods at your doorstep.</p>
      
         
        <button type="button" className="btn btn-primary btn-lg" data-dismiss="modal" onClick={handleCloseClick}>Confirm</button>
        <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal" onClick={closePopup}> Cancel</button>
           </div>
        )}
      </div>   
    </div>     
 
  );
}

export default PopupForm;