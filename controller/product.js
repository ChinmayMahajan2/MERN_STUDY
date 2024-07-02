const fs = require('fs')
const model = require('../Model/product');
const { default: mongoose } = require('mongoose');
const Product = model.Product;

// Create
exports.createProduct = async (req,res)=>{
    
    const product = new Product(req.body);
    // product.title = 'PhoneC';
    // product.price = 99999;
    // product.rating = 5;

    // ye async function hai
    try{
        const doc = await product.save()
        console.log({err:null, doc})
        res.status(201).json(doc)
    }
    catch(err){
        console.log({err,doc:null})
        res.status(404).json(err)
    }
    
}  

exports.getAllProducts = async (req,res)=>{
    const products = await Product.find()
    res.json(products)
}

exports.getProduct  = async (req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id)
    res.json(product)
}

exports.replaceProduct = async  (req,res)=>{
    const id = req.params.id;
    try{
        const doc = await Product.findOneAndReplace({_id:id},req.body,{new:true})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(doc)
    }
    
}

exports.updateProduct = async (req,res)=>{
    const id = req.params.id;
    try{
        const doc = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(doc)
    }
}
exports.deleteProduct = async (req,res)=>{
    const id = req.params.id;
    try{
        const doc = await Product.findOneAndDelete({_id:id})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(doc)
    }
}