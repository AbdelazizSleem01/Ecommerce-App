import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "Products",
            },
        ],
        payment: {
            // Add the payment schema definition here
        },
        buyer: {
            type:mongoose.ObjectId,
            ref: "users",
        },
        status: {
            type: String,
            default: "Not Processed",
            enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"],
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);


