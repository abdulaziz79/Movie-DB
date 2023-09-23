const express = require('express');
const app =express()

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }]

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

app.get("/movies/create", (req, res) =>{

})

app.get("/movies/read", (req, res) =>{

    res.json({status:200, data:movies})

    
})

app.get("/movies/update", (req, res) =>{
    
})

app.get("/movies/delete", (req, res) =>{
    
})



app.listen(3000);


