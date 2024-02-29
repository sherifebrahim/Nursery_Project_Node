const dotenv = require("dotenv").config();
const express=require("express");
const mongose=require("mongoose")
const morgan = require('morgan');
const body_parser = require('body-parser');



const router = require('./routers/router');


 //1-create server
const server=express();
 // Middleware to log request details
server.use(morgan('dev'));

server.use(body_parser.json());

server.use(body_parser.urlencoded({ extended:false }));


const port=process.env.port || 8080;

//conect to database 
mongose.connect("mongodb+srv://fouadmogy98:fouadmogy98@cluster0.xhmyccp.mongodb.net/")
//promise
.then(()=>{
console.log("DB connected.....");
server.listen(port,()=>{
   console.log("after connected, Im Listning...........",port);
})
}).catch(()=>{
   console.log("DB connected problem "+error);
})


//   build server

//first middleware
//repsond to any http request
server.use((request,response,next)=>{
   console.log("first use function",request.url,request.method);
   next();
  });


//routes(endpoints)

server.use(router);



// 3- not found
server.use((request,response)=>{
   response.status(404).json({message:"not found"});
  })


//4- error callback(4 input)
server.use((error,request,response,next)=>{
   response.status(500).json({message:error+""});
  })