
const guestOnly= (req, res ,next)=>{
    if(req.session?.user){
        res.status(400).json({msg:"You are already logged in"});
    }else{
        next();
    }
}

module.exports = guestOnly;