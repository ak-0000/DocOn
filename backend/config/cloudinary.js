import {v2 as cloudinary} from 'cloudinary'
import { connect } from 'mongoose'

const  connect_Cloudinary = async() => {

    cloudinary.config({
        cloud_name:process.env.Cloudinary_name,
        api_key : process.env.Cloudinary_Api,
        api_secret : process.env.Cloudinary_Secret_key

    })
}

export default connect_Cloudinary