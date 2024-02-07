import userModel from "./../models/userModel.js";
import orderModel from "./../models/orderModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validations
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }

        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,
        }).save();
        res.status(200).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

//forgotPasswordController

export const forgotPassworController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Emai is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

//update profile
export const updateProfileController = async (req, res) => {
    try {
        const { email, password, name, phone, address } = req.body;
        const user = await userModel.findById(req.user._id);

        // Password validation
        if (password && password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address
            },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: `Profile Updated Successfully   👌`,
            updatedUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in updating profile",
            error
        });
    }
};

//get all user 
export const getAllUsersController = async (req, res) => {
    try {
        let user = await userModel.find();
        user = user.map((user) => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            answer: user.answer,
            role: user.role,
        }));
        res.status(201).send({
            success: true,
            user
        });
    } catch (err) {
        console.log("Error getting Users");
        res.status(500).send({ sucess: false, message: "Server Error!" })
    }
}

// orders

export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name")
        res.json(orders);
    } catch (err) {
        console.log("Error Getting Orders", err);
        res.status(500).send({
            success: false,
            message: "Error Getting Orders",
            err,
        });
    }
};

// All-orders

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 })
        res.json(orders);
    } catch (err) {
        console.log("Error Getting Orders", err);
        res.status(500).send({
            success: false,
            message: "Error Getting Orders",
            err,
        });
    }
};

// order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const { orders } = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders)

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error Update Status of Orders",
            err,
        });
    }
}

// roleUpdateController


export const roleUpdateController = async (req, res) => {
    try {
        const { role } = req.body;
        const { id } = req.params;
        const userRole = await userModel.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        );
        res.status(200).send({
            success: true,
            userRole,
            message: "Role Updated Successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error Updating Role",
            error: err,
        });
    }
};