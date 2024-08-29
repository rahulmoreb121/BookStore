import mongoose, { mongo } from 'mongoose';
import { ApiError } from '../../utils/ApiError.js';

const commentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },
    coverImages: {
      type: [String], // Array of strings
      required: true, // Ensure at least one cover image is provided
      // Custom validation to ensure non-empty array
    },

    category: {
      type: String,
      enum: [
        'Literary Fiction',
        'Historical Fiction',
        'Science Fiction',
        'Fantasy',
        'Mystery',
        'Thriller',
        'Romance',
        'Horror',
        'Biography',
        'Autobiography',
        'Memoir',
        'Self-Help',
        'Travel',
        'Health & Wellness',
        'Cooking',
        'True Crime',
        'History',
        'Science',
        'Politics',
        'Religion & Spirituality',
        'Business & Economics',
        'YA Fiction',
        'YA Fantasy',
        'YA Romance',
        'Picture Books',
        'Early Readers',
        'Middle Grade',
        'Chapter Books',
        'Dystopian',
        'Adventure',
        'Paranormal',
        'Steampunk',
        'Classical Literature',
        'Poetry',
        'Graphic Novels',
        'Comics',
      ],
      required: true, // Ensure category is provided
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0, // Minimum rating
      max: 5, // Maximum rating
      default: 0, // Default rating if not provided
    },
    comments: {
      type: [commentSchema],
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    publishedOn: {
      type: String,
      required:true
    },
    language:{
      type: String,
      required:true
    },
    pages:{
      type: Number,
      required:true
    }
  },
  { timestamps: true }
);

export const bookModel = mongoose.model('Book', bookSchema);
