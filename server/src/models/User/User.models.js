import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    refreshToken: {
      type: String,
      default: '',
    },
    userPhotoUrl: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // If the password hasn't been modified, skip hashing
  }
  try {
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash; // Save the hashed password
    next(); // Proceed with saving the document
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createRefreshToken = async function (_id, userName) {
  const refreshToken = jwt.sign({ _id, userName }, process.env.REFRESH_SECRET, {
    expiresIn: '10m',
  });
  return refreshToken;
};

userSchema.methods.createAccessToken = async function (_id, userName) {
  const accessToken = jwt.sign({ _id, userName }, process.env.ACCESS_SECRET, {
    expiresIn: '5m',
  });
  return accessToken;
};

export const userModel = mongoose.model('User', userSchema);
