import express from 'express'

import { addDoctor , allDoctors, loginAdmin } from '../controllers/adminController.js'
import {changeAvailabilty} from '../controllers/doctorController.js'

import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authadmin.js'

const adminRouter = express.Router() 

adminRouter.post('/add-doctor' , authAdmin , upload.single('image') , addDoctor)
adminRouter.post('/login' , loginAdmin)
adminRouter.post('/all-doctors' ,authAdmin ,allDoctors)
adminRouter.post('/change-availability' , authAdmin , changeAvailabilty)




export default adminRouter