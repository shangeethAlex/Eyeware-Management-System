const express = require("express");
const router = express.Router();
  
const Pay = require("../models/PaymentInput")
 
 



//insert
router.post("/insert", async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Mail,
      Telephone,
      Country,
      City,
      Address,
      PostalCode,
      Province,
    } = req.body;
    
    const transactionDate = new Date();
    
    const year = transactionDate.getFullYear();
    const month = String(transactionDate.getMonth() + 1).padStart(2, '0');
    const day = String(transactionDate.getDate()).padStart(2, '0');
    const hours = String(transactionDate.getHours()).padStart(2, '0');
    const minutes = String(transactionDate.getMinutes()).padStart(2, '0');
    
    const formattedDateAndTime = `${year}-${month}-${day} ${hours}.${minutes}`;
    
    const pays = new Pay({
      FirstName: FirstName,
      LastName: LastName,
      Mail: Mail,
      Telephone: Telephone,
      Country: Country,
      City: City,
      Address: Address,
      PostalCode: PostalCode,
      Province: Province,
      Time: formattedDateAndTime,
    });
    

    await pays.save();
    res.send("inserted data");
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error inserting data: ${err.message}`);
  }
  
});



//read 
router.get("/read", async (req, res) => {
  try {
    const result = await Pay.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    //res.status(500).json({ error: "Error reading data" });
  }
});

//delete 
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  await Pay.findByIdAndRemove(id).exec();
  res.send('deleted')
});

 
router.put("/update/:id", async (req, res) => {
  const newStatus = req.body.newStatus;
  const id = req.params.id;
  try {
    await Pay.findByIdAndUpdate(id, { Status: newStatus });
    res.send('updated');
    
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating status');
  }
});


// router.listen(8070, () => {
//   console.log('server running on port 3001...')
// }
//)
module.exports=router