const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Cart Item Schema
const CartItemSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book", // Reference to the Book model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Define the Cart Schema
const CartSchema = new Schema(
  {
    username: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
      unique: true, // Each user has one active cart at a time
    },
    items: [CartItemSchema], // Array of Cart Items
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "checked_out", "abandoned"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Pre-save middleware to calculate the total price and update the timestamp
CartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  this.updatedAt = Date.now();
  next();
});

// Static method to add an item to the cart
CartSchema.statics.addItemToCart = async function (
  userId,
  bookId,
  quantity,
  price
) {
  let cart = await this.findOne({ user: userId, status: "active" });
  if (!cart) {
    cart = new this({ user: userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex((item) =>
    item.book.equals(bookId)
  );
  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ book: bookId, quantity, price });
  }

  return cart.save();
};

// Static method to remove an item from the cart
CartSchema.statics.removeItemFromCart = async function (userId, bookId) {
  let cart = await this.findOne({ user: userId, status: "active" });
  if (cart) {
    cart.items = cart.items.filter((item) => !item.book.equals(bookId));
    return cart.save();
  }
  return null;
};

// Static method to clear the cart (e.g., after checkout)
CartSchema.statics.clearCart = async function (userId) {
  let cart = await this.findOne({ user: userId, status: "active" });
  if (cart) {
    cart.items = [];
    cart.totalPrice = 0;
    return cart.save();
  }
  return null;
};

// Create the Cart model
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
