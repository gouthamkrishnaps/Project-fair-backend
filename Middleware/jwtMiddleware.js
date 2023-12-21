// import jsonwebtoken

const jwt = require('jsonwebtoken')


const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');

    //logic
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    try{
        // first argument should be token and second argument should be secretkey
        const jwtResponse = jwt.verify(token,"secretkey123")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    }catch(err){
        res.status(401).json("Authorization failed....please login")
    }

    
}

module.exports = jwtMiddleware