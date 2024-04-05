const express=require('express')
const FDItemModel=require('../models/fdItems')
const router=express.Router()

router.post('/addfditem',async (req,res)=>{
    try{
        const newitem=new FDItemModel(req.body)
    await newitem.save()
    res.send('Feedback saved successfully')
    }
    catch(error){
        res.status(400).send(error)
    }
})

module.exports=router