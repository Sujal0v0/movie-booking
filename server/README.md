# express

1. npm init -y
2. npm i express --save
3. create .gitignore file and add node_module
4. create index.js file
5. update the script as "dev":"node index.js"
6. in index.js,
   const express=require('express');
   OR import express from "express";
   const app=express();
   app.get("/",(req,res)=>{
   res.send({msg:"Hello World"});
   })

   app.listen(8000,()=>{
   console.log("App is listening in 8000");
   })

7. npm i --save-dev nodemon
8. in package.json => added scripts:{
   "dev": "nodemon index.js",
   "production": "node index.js"
   }
9. npm run dev
10. npm i --save dotenv
11. in index.js require("dotenv").config
    OR import dotenv from "dotenv"
    dotenv.config();
12. create .env file
13. Add PORT=8000 in env file
14. in index.js => Number(process.env.PORT)
15. add .env in gitignore

//Application

1. Application run
2. Error handling
3. data base connection
4. Environment variable
5. Api versioning
6. Service (gmail,google)
7. Utils
8. Validation
9. Static Files
10. Logging
11. File upload

//Advanced Concept

1. Aggregation
2. Pagination
3. Role limiting
4. Advanced Logging (mid level developer)
