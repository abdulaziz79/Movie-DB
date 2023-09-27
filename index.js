const express = require('express');
const app =express()
const mongoose=require("mongoose")

const bodyParser =require("body-parser");
// const { default: mongoose } = require('mongoose');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }]


    //schema and module
    const movieSchema = new mongoose.Schema({
        title: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
          min:1780,
          max:new Date().getFullYear(),

        },
        rating:{
            type:Number,
            required:true,
            default:4,
            min:0,
            max:10
        }
      });
      
      // Create a User model using the schema
      const Movie = mongoose.model('Movie', movieSchema);

    app.use(express.json())
    
    const url="mongodb+srv://aboudecharkawi:wQp6a3J7Ar0YxzNn@moviedb.o9pergp.mongodb.net/?retryWrites=true&w=majority"
    
    const client = mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    (async ()=> {
        try {
          await client;
          console.log('Connected to MongoDB');
        } catch (error) {
          console.error('Error connecting to MongoDB:', error);
        }
      })()

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

app.post("/movies/add", (req, res) =>{
    let newTitle=req.body.title
    let newYear=req.body.year
    let newRating=parseFloat(req.body.rating) || 4

    if(newTitle==undefined || newYear==undefined){
        res.json({status:403, error:true, message:"you cannot create a movie without providing a title and a year"})
    }else if(newYear.length !== 4 || isNaN(newYear)){
        res.json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }else if(newRating>10 ||newRating<0){
        newRating=4
    }
    
        const newMovie={title:newTitle,year:parseInt(newYear, 10), rating:newRating }
        movies.push(newMovie)
        res.json(movies)



})
  
app.get("/movies/delete/:id", (req, res) =>{

    let newId=req.params.id
    
    if(newId  > movies.length || newId<1){
        res.json({status:404, error:true, message:`the movie ${newId} does not exist`
    })
    }
    movies.splice(newId-1   , 1)
    res.json({movies})
    
})



app.get("/movies/update/:id", (req, res) =>{

    let updateId=req.params.id
    let newTitle=req.query.title
    let newRate=parseFloat(req.query.rating)
    let newYear=req.query.year
    
    if(updateId  > movies.length || updateId<1){
        res.json({status:404, error:true, message:`the movie ${updateId} does not exist`
    })
    }else{
        if(newTitle){
            movies[updateId-1].title= newTitle
        }if(newRate){
            movies[updateId -1].rating=newRate
        }if(newYear){
            movies[updateId-1].year=newYear
        }
        
    }
   
    res.json({movies})
    
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

app.get("/movies/add", (req, res) =>{
    let newTitle=req.query.title
    let newYear=req.query.year
    let newRating=parseFloat(req.query.rating) || 4
    

    if(newTitle==undefined || newYear==undefined){
        res.json({status:403, error:true, message:"you cannot create a movie without providing a title and a year"})
    }else if(newYear.length !== 4 || isNaN(newYear)){
        res.json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }else if(rating>10 ||newRating<0){
        newRating=4
    }
    
        const newMovie={title:newTitle,year:parseInt(newYear, 10), rating:newRating }
        movies.push(newMovie)
        res.json(movies)

 

})

app.put("/movies/update/:id", (req, res) =>{

    let updateId=req.params.id
    let newTitle=req.body.title
    let newRate=parseFloat(req.body.rating)
    let newYear=req.body.year
    
    if(updateId  > movies.length || updateId<1){
        res.json({status:404, error:true, message:`the movie ${updateId} does not exist`
    })
    }else{
        if(newTitle){
            movies[updateId-1].title= newTitle
        }if(newRate){
            movies[updateId -1].rating=newRate
        }if(newYear){
            movies[updateId-1].year=newYear
        }
        
    }
   
    res.json({movies})
    
})  

app.delete("/movies/delete/:id", (req, res) =>{

    let newId=req.params.id
    
    if(newId  > movies.length || newId<1){
        res.json({status:404, error:true, message:`the movie ${newId} does not exist`
    })
    }
    movies.splice(newId-1   , 1)
    res.json({movies})
    
})


app.post('/movies/addd', async (req, res) => {
    try {
      const { title, year, rating } = req.body;
      const movie = new Movie({ title, year, rating });
      const savedMovie = await movie.save();
      res.json(savedMovie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  






app.put('/movies/updates/:id', async (req, res) => {
    try {
      const { title, year,rating} =req.body;
      const movieId = req.params.id;
  
      const movie = await Movie.findById(movieId);
  
      if (!movie) {
        return res.status(404).json({ message: `Movie with ID ${movieId} not found` });
      }
  
      // Update movie properties
      if (title) {
        movie.title = title;
      }
      if (year) {
        movie.year = year;
      }
      if (rating) {
        movie.rating = rating;
      }
  
      // Save the updated movie
      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

 app.delete('/movies/deletes/:id',async (req,res)=>{
    try{
        const movieId =req.params.id;
        const movie=await Movie.findByIdAndRemove(movieId);
        if(!movie){
            return res.status(404).json({message:`Movie with ID ${movieId}doesn't exist`})
        }
        res.json({message: `Movie with id ${movieId} has been deleted succesfully`})
    }catch (error){
        res.status(400).json({error :error.message})
    }
 })


  app.listen(3000);
