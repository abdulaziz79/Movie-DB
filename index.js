const express = require('express');
const app =express()

app.get("/", (req, res) =>{
    console.log("here")
    res.send("ok")
})

app.get("/test", (req, res) =>{
    
    res.status(200).send("ok")
})

app.get("/time", (req, res) =>{

    let currentDate=new Date()
    let hours= currentDate.getHours()
    let second=currentDate.getSeconds()

    res.status(200).send(hours+":"+second)
})

app.get("/hello/:id?", (req, res) =>{

    let id = req.params.id;
    let message;
    if(id){
        message="Hello "+ id
    }else  {
        message="Hello user "
    }

    res.json({status:200, message})
})

app.get("/search", (req, res) =>{

    let name=req.query.s;
    if(name)
    

    res.json({status:200, message :"ok", data:name})

    else{
        res.json({status:500,error:true, message :"you have to provide a search"})
    }
});




app.listen(3000);


