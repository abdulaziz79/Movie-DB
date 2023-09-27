const users = [ 
    { username: 'John', password: '1234' },
    { username: 'Jane', password: '5678' } ]

    

    const auth= (req,res,next)=>{
        const {username,password}=req.headers;

        const user = users.find(user=>user.username === username && user.password === password )

        if(user){
          return next()
        }else{
            res.status(404).json({message:"authentication failed"})
        }

    }
    
    module.exports= {auth}