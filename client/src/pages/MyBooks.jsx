import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import BookCard from "../components/BookCard/BookCard.jsx";
import style from "./MyBooks.module.css";
import { useNavigate } from "react-router-dom";
const MyBooks = () => {
  const accessToken = useSelector((state) => state.authreducer.accessToken);
  const privateApi = useAxiosPrivate();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const getUsersBooks = async () => {
      try {
        const response = await privateApi.get("/book/userbooks", {
          headers,
          withCredentials: true,
        });

        setBooks(response.data.data);
        return response;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    };
    getUsersBooks();
  }, [accessToken, setBooks, privateApi]);
  const navigateBookDetail = (id) => {
    navigate(`/books/${id}`);
  };
  return (
    <div className={style.main}>
      {books && books.length ? (
        books.map((book) => (
          <BookCard
            key={book?.title}
            bookData={book}
            navigateBookDetail={navigateBookDetail}
          />
        ))
      ) : (
        <div>No Books Found</div>
      )}
    </div>
  );
};

export default MyBooks;
