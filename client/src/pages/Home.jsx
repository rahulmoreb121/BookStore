import BookCard from "../components/BookCard/BookCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import style from "./Home.module.css";
const Home = () => {
  const accessToken = useSelector((state) => state.authreducer.accessToken);
  const privateApi = useAxiosPrivate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    setLoading(true);
    const getAllBooks = async () => {
      try {
        const response = await privateApi.get("/book", {
          headers,
          withCredentials: true,
        });

        setBooks(response.data.data);
        setLoading(false);
        return response;
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        return error;
      }
    };
    getAllBooks();
  }, [accessToken, setBooks, privateApi]);

  return (
    <div className={style.main}>
      {loading && <div>Loading...</div>}
      {books && books.length
        ? books.map((book) => <BookCard key={book?.title} bookData={book} />)
        : books.length == 0 && <div>No Books Found</div>}
    </div>
  );
};

export default Home;
