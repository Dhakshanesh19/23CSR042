const { json } = require('body-parser');
const express = require('express');


const app = express();
const route = express.Router();

app.use(json);

route.get('http://4.224.186.213/evaluation-service/logs',(req,res,next)=>{
        try{
            const {stack,level,package,message} = req.body();
                

        }
        catch{
            console.log("OOPS! Error");
        }

})