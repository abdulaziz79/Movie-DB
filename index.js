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
    let minutes=currentDate.getMinutes()

    res.status(200).send(hours+":"+minutes)
})
app.listen(3000)
