import mongoose from 'mongoose';
import { bookModel } from '../models/Book/Book.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadPhotoCloudinary } from '../utils/uploadPhotoCloudinary.js';
import { deleteCloudinaryImages } from '../utils/deleteCloudinaryImages.js';

const addBook = asyncHandler(async (req, res, next) => {
  let {
    title,
    description,
    category,
    price,
    discountPercentage,
    pages,
    language,
    publishedOn,
  } = req.body;
  let author = req.user;
  let multerImages = req.files;

  if (
    !title ||
    !description ||
    !category ||
    !price ||
    !discountPercentage ||
    !pages ||
    !language ||
    !publishedOn
  ) {
    return next(new ApiError(400, 'All fields are mandatory'));
  }
  if (!multerImages.length) {
    return next(new ApiError(400, 'CoverImages are required'));
  }

  try {
    let bookExists = await bookModel.findOne({ title });
    if (bookExists) {
      return next(new ApiError(400, 'Book with title already exists'));
    }
    let coverImages = await Promise.all(
      multerImages.map(async (image) => {
        return await uploadPhotoCloudinary(image.path);
      })
    );
    if (coverImages.length < 0) {
      return next(new ApiError(500, 'failed to upload file in cloudinary'));
    }
    let createBook = await bookModel.create({
      title,
      description,
      category,
      price,
      discountPercentage,
      coverImages,
      author,
      pages,
      language,
      publishedOn,
    });

    res
      .status(200)
      .json(new ApiResponse(200, createBook, 'books created successfully'));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, 'cloudinary' + error.message));
  }
});

const getAllBooks = asyncHandler(async (req, res, next) => {
  let books = await bookModel.find();
  if (!books.length) {
    return next(new ApiError(200, 'No Books available'));
  }
  res
    .status(200)
    .json(new ApiResponse(200, books, 'books retrieved successfully'));
});

const getAllBooksOfUser = asyncHandler(async (req, res, next) => {
  let books = await bookModel.find({
    author: new mongoose.Types.ObjectId(req.user),
  });
  if (!books.length) {
    return next(new ApiError(200, 'No Books available'));
  }
  res
    .status(200)
    .json(new ApiResponse(200, books, 'books retrieved successfully'));
});

const getSingleBook = asyncHandler(async (req, res, next) => {
  let bookId = req.params.id;
  if (!bookId) return next(new ApiError(400, 'Book id is missing'));
  try {
    let book = await bookModel.find({ _id: bookId });
    if (!book.length)
      return next(new ApiError(400, 'No Book found with this Id'));
    res
      .status(200)
      .json(new ApiResponse(200, book, 'book retrieved successfully'));
  } catch (error) {
    return next(new ApiError(400, 'No Book found with this Id'));
  }
});

const updateBookDetails = asyncHandler(async (req, res, next) => {
  let bookId = req.params.id;
  let data = req.body;
  console.log(data);

  if (!bookId || !data)
    return next(new ApiError(400, 'Book id or data  is missing'));
  try {
    if (data?.title) {
      let bookExist = await bookModel.findOne({ title: data.title });
      if (bookExist)
        return next(new ApiError(400, 'Book with this title already exists'));
    }
    let book = await bookModel.findByIdAndUpdate({ _id: bookId }, data, {
      validateModifiedOnly: true,
      runValidators: true,
      new: true,
    });
    res
      .status(200)
      .json(new ApiResponse(200, book, 'book updated successfully'));
  } catch (error) {
    console.log(error);

    return next(new ApiError(400, 'No Book found with this Id'));
  }
});

const deleteBookImage = asyncHandler(async (req, res, next) => {
  let bookId = req.query.bookId;
  let imageUrl = req.query.imageUrl;
  if (!bookId || !imageUrl) {
    return next(new ApiError(400, 'book id or url is missing'));
  }
  try {
    let imagesplit = imageUrl.split('/');
    let imageId = imagesplit[imagesplit.length - 1].split('.')[0];
    const response = await deleteCloudinaryImages(imageId);
    if (response.result !== 'ok') {
      return next(new ApiError(400, 'No image found'));
    }
    let book = await bookModel.findByIdAndUpdate(
      bookId,
      { $pull: { coverImages: imageUrl } }, // Pull the tag from the array
      { new: true }
    );
    if (!book) {
      return next(new ApiError(400, 'No Book found'));
    }

    res
      .status(200)
      .json(new ApiResponse(200, book, 'Image deleted successfully'));
  } catch (err) {
    return next(new ApiError(400, err));
  }
});

const deleteBook = asyncHandler(async (req, res, next) => {
  let bookId = req.params.id;
  if (!bookId) {
    return next(new ApiError(400, 'book id is missing'));
  }
  try {
    let book = await bookModel.findOneAndDelete({ _id: bookId });

    if (!book) {
      return next(new ApiError(400, 'No book found'));
    }
    let booksImages = book.coverImages;

    if (booksImages.length > 0) {
      await Promise.all(
        booksImages.map(async (bookImage) => {
          let splitUrl = bookImage.split('/');
          let imageId = splitUrl[splitUrl.length - 1].split('.')[0];
          console.log(imageId);

          const response = await deleteCloudinaryImages(imageId);
          if (response.result !== 'ok') {
            return next(new ApiError(400, 'No image found'));
          }
        })
      );
    }
    res
      .status(204)
      .json(new ApiResponse(204, book, 'book deleted successfully'));
  } catch (err) {
    return next(new ApiError(400, err));
  }
});

export {
  addBook,
  getAllBooks,
  getAllBooksOfUser,
  getSingleBook,
  deleteBookImage,
  updateBookDetails,
  deleteBook,
};
