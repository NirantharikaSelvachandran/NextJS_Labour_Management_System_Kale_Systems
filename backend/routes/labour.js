const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/add', (req,res) =>{
    let labour = req.body;
    query1 = "insert into labour_details(labour_id,name,age,phone_number,bank_account_number,role) values(?,?,?,?,?,?)"
    connection.query(query1,[labour.labour_id,labour.name,labour.age,labour.phone_number,labour.bank_account_number,labour.role],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Labour added Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get', (req,res) =>{
    var query1 = "select labour_id,name,age,phone_number,bank_account_number,role from labour_details";
    connection.query(query1,(err,results) =>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
});

router.patch('/update/:labour_id', (req, res) => {
    let labour_id = req.params.labour_id; // Retrieve labour_id from URL path
    let labour = req.body;
    let query = "UPDATE labour_details SET name=?, age=?, phone_number=?, bank_account_number=?, role=? WHERE labour_id=?";
    connection.query(query, [labour.name, labour.age, labour.phone_number, labour.bank_account_number, labour.role, labour_id], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Labour updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:labour_id', (req,res) => {
    const labour_id = req.params.labour_id;
    var query1 = "delete from labour_details where labour_id=?";
    connection.query(query1,[labour_id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({massage:"Labour Id does not found"});
            }
            return res.status(404).json({massage:"Labour deleted successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;