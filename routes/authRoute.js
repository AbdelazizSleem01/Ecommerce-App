import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPassworController,
    updateProfileController,
    getAllUsersController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
    roleUpdateController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

// Create a router object
const router = express.Router();

// Define the route for registering a user (POST /register)
router.post('/register', registerController);

// Define the route for logging in a user (POST /login)
router.post('/login', loginController);

// Forget password  (POST /forget pass)
router.post('/forgot-password', forgotPassworController);
// get all user
router.get('/users', getAllUsersController);

//test Route
router.get('/test', requireSignIn, isAdmin, testController)

//protect User route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protect Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// update profile 
router.put("/updateProfile", requireSignIn, updateProfileController)

// orders 
router.get("/orders", requireSignIn, getOrdersController)

// orders 
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController)

// orders Status update
router.put("/orders-status/:orderId", requireSignIn, isAdmin, orderStatusController)

// Role update

router.put("/role-update/:id", requireSignIn, isAdmin, roleUpdateController)
export default router;