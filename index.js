require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const exp = require('constants')
const morgan = require('morgan')
const server = express();
const path = require('path')
const productRouter = require('./routes/product')
const userRouter = require('./routes/users')
const cors = require('cors')


// console.log('env',process.env.DB_PASSWORD)

// db connection
//mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected')

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}




//body parser
server.use(cors());
server.use(express.json()); 
server.use('/products',productRouter.router)
server.use('/users',userRouter.router)
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR))) 

server.use('*',(req,res)=>{
  // res.sendFile(__dirname+'/build/index.html')
  res.sendFile(path.resolve(__dirname , 'build','index.html'))
})

server.listen(process.env.PORT, () => {
    console.log('server started')
})  


