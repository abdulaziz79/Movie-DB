const express = require('express');

const app =express()

app.get("/", (req, res) =>{
    console.log("here")
    res.send("ok")
})

app.listen(3000)
