import jwt from 'jsonwebtoken'


// admin auth middleware
const authAdmin = async(req ,res , next)  => {
    try{
        const {atoken} = req.headers
        if(!atoken){
            return res.json ({success:false , message: "not authorised"})
        }
        const tokendecode = jwt.verify(atoken , process.env.JWT_SECRET)
        if(tokendecode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json ({success:false , message: "not authorised"})
        }
        next()
    }catch(error){

        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

export default authAdmin 