# 🩺 DocOn – Doctor Appointment Booking Platform

**DocOn** is a full-stack, role-based doctor appointment booking system with secure login, admin controls, image upload and real-time payments via Razorpay.

Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- 🧑‍⚕️ **Multi-role system** – separate portals for users and admins
- 🔐 **JWT Authentication** – secure login & protected routes
- 📅 **Appointment Booking** – real-time slot reservation
- 🧾 **Razorpay Integration** – secure online payments
- ☁️ **Image Upload** – via Multer + Cloudinary
- 📬 **Form Validation**, user feedback & error handling

---

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| React + Tailwind | Frontend UI |
| Node.js + Express | Backend APIs |
| MongoDB + Mongoose | Database |
| Razorpay | Payment Gateway |
| Cloudinary | Image Upload |
| JWT & bcryptjs | Authentication |

---

## 📦 Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/ak-0000/DocOn.git
cd DocOn
```
### 2. Install Dependencies
Backend
```bash
cd backend
npm install
```
Frontend
```bash
cd ../frontend
npm install
```
Admin
```bash
cd ../admin
npm install
```

### 3. Setup Environment Variables
#Create your .env files in all 3 folders:

📁 backend/.env
env
```bash
MONGODB_URL= your_mongodb_url_here
CLOUDINARY_NAME= your_cloudinary_name_here
CLOUDINARY_API= your_cloudinary_api_here
CLOUDINARY_SECRET_KEY= your_cloudinary_secret_key_here
ADMIN_EMAIL= your_admin_email_here
ADMIN_PASSWORD= your_admin_password_here
JWT_SECRET= your_jwt_secret_here
CURRENCY= your_currency_here
RAZORPAY_KEY_ID= your_razorpay_key_id_here
RAZORPAY_KEY_SECRET= your_razorpay_key_secret_here
```
📁 frontend/.env
env
```bash
VITE_BACKEND_URL =  your_backend_url_here
VITE_RAZORPAY_KEY_ID =  "your_razorpay_key_id_here"
```
📁 admin/.env
env
```bash
VITE_BACKEND_URL = your_backend_url_here
```

### 4. 🚀 Run the App (in 3 terminals)
# Terminal 1: Start Backend
```bash
cd backend
npm start
```
# Terminal 2: Start Frontend
```bash
cd frontend
npm start
```
# Terminal 3: Start Admin Panel
```bash
cd admin
npm start
```

### 💖 Support ###
## If you find this project useful, please give it a ⭐ on GitHub.
## Feedback and contributions are welcome!

