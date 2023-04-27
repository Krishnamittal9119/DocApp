const express = require('express');
const {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    // deleteAllNotificationController,
    getAllDocotrsController,
    bookeAppointmnetController,
    bookingAvailabilityController,
    userAppointmentsController,
  } = require("../controllers/userCtrl");
const authMiddleware = require('../middlewares/authMiddleware');

//Router Object

const router = express.Router();

// routes

//Login || Post
router.post('/login',loginController);

//register || Post
router.post('/register',registerController);

//Auth || Post

router.post('/getUserData', authMiddleware, authController);

//Apply Doctor || Post

router.post('/apply-doctor', authMiddleware, applyDoctorController);

// notification || Post
router.post("/get-all-notification",authMiddleware,getAllNotificationController);

//GET ALL DOC
router.get('/getAllDoctors',authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router; 