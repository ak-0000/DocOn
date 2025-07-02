import express from 'express'
import {appointmemtDoctor, appointmentCancelled, appointmentComplete, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile} from '../controllers/doctorController.js'
import authDoctor from '../middleware/authdoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list' , doctorList)
doctorRouter.post('/login' , loginDoctor)
doctorRouter.get('/appointments' ,authDoctor ,  appointmemtDoctor)
doctorRouter.post('/complete-appointment' , authDoctor , appointmentComplete)
doctorRouter.post('/cancelled-appointment' , authDoctor , appointmentCancelled)
doctorRouter.get('/dashboard' , authDoctor , doctorDashboard)
doctorRouter.get('/profile' , authDoctor , doctorProfile)
doctorRouter.post('/update-profile' , authDoctor , updateDoctorProfile)

 

export default doctorRouter