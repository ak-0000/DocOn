import express from 'express'
import { getProfile, loginUser, registerUser , updateProfile  ,bookAppointment, showAppointment, cancelAppointment , paymentRazorpay, verifyRazorpay} from '../controllers/userController.js'
import authUser from '../middleware/authuser.js';
import upload from '../middleware/multer.js';


const userRouter = express.Router() ;
 
userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)
userRouter.get('/get-profile' , authUser , getProfile)
userRouter.post('/update-profile' , upload.single('image') , authUser , updateProfile )
userRouter.post('/book-appointment' , authUser , bookAppointment )
userRouter.get('/my-appointments' , authUser , showAppointment )
userRouter.post('/cancel-appointment' , authUser , cancelAppointment )
userRouter.post('/payment-razorpay' , authUser , paymentRazorpay )
userRouter.post('/verifyRazorpay' , authUser , verifyRazorpay )


export default userRouter