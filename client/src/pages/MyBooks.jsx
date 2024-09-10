import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import BookCard from "../components/BookCard/BookCard.jsx";
import { replace, useNavigate } from "react-router-dom";
const MyBooks = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.authreducer.accessToken);
  const privateApi = useAxiosPrivate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const getBooks = async () => {
      try {
        const response = await privateApi.get("/book", {
          headers,
          withCredentials: true,
        });
        console.log(response);
        setBooks(response.data.data);
        return response;
      } catch (error) {
        console.log("error", error);

        return error;
      }
    };
    getBooks();
  }, [accessToken, privateApi]);

  return (
    <div>
      {books.length ? (
        books.map((book) => <BookCard key={book?.title} />)
      ) : (
        <div>No Books Found</div>
      )}
    </div>
  );
};

export default MyBooks;
