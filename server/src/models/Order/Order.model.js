import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Ensure customer name is provided
  },
  userEmail: {
    type: String,
    required: true, // Ensure customer email is provided
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
  },
  userAddress: {
    type: String,
    required: true, // Ensure customer address is provided
  },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true, // Ensure book ID is provided
      },
      quantity: {
        type: Number,
        required: true, // Ensure quantity is provided
        min: 1, // Minimum quantity is 1
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true, // Ensure total amount is provided
    min: 0, // Minimum total amount is 0
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], // Order status options
    default: "Pending", // Default status
  },
  orderDate: {
    type: Date,
    default: Date.now, // Default to current date
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "PayPal", "COD"], // Payment method options
    required: true, // Ensure payment method is provided
  },
});

export const orderModel = mongoose.model("Order", orderSchema);
