import express from 'express';
import {
  addBook,
  deleteBook,
  deleteBookImage,
  getAllBooks,
  getAllBooksOfUser,
  getSingleBook,
  updateBookDetails,
} from '../controllers/book.controller.js';
const router = express.Router();

router.route('/').post(addBook);
router.route('/').get(getAllBooks);
router.route('/').get(getAllBooksOfUser);
router.route('/:id').get(getSingleBook);
router.route('/').delete(deleteBookImage);
router.route('/:id').patch(updateBookDetails);
router.route('/:id').delete(deleteBook);

export { router };
