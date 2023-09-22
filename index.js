const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app =express()

app.get("/", (req, res) =>{
    console.log("here")
    res.send("ok")
})

app.listen(3000)
