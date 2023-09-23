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

app.get("/movies/add", (req, res) =>{
    let newTitle=req.query.title
    let newYear=req.query.year
    let newRating=req.query.rating

    if(newTitle==undefined || newYear==undefined){
        res.json({status:403, error:true, message:"you cannot create a movie without providing a title and a year"})
    }else if(newYear.length !== 4 && isNaN(newYear)){
        res.json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }else if(newRating==undefined){
        newRating=4
    }
    else{
        const newMovie={title:newTitle,year:newYear, rating:newRating }
        movies.push(newMovie)
        res.json(movies)

        
    }

})

app.get("/movies/read/", (req, res) =>{
     
    res.json({status:200, data:movies})
    
})

app.get("/movies/read/by-date", (req, res) =>{
     
    const sortedYear =movies.sort((a, b)=>a.year - b.year)
    res.json({status:200, data:sortedYear})
    
})

app.get("/movies/read/by-rating", (req, res) =>{
     
    const sortedRate =movies.sort((a, b)=>b.rating - a.rating)
    res.json({status:200, data:sortedRate})
    
})

app.get("/movies/read/by-title", (req, res) =>{
     
    const sortedTitle =movies.sort((a, b) => a.title.localeCompare(b.title));
    res.json({status:200, data:sortedTitle})
    
})

app.get("/movies/read/id/:ID", (req, res) =>{
     
    const ID=req.params.ID
    const movie=movies[ID -1]

    if(ID<=movies.length && ID >0){
        res.json({status:200, data:movie })

    }else
    res.json({status:404, error:true,message :"the movie " +ID +" doesn't exist" })
    
})





app.get("/movies/update", (req, res) =>{
    
})

app.get("/movies/delete", (req, res) =>{
    
})



app.listen(3000);


