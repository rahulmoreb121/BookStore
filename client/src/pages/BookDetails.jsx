import { useParams } from "react-router-dom";
import BookDetail from "../components/bookdetail/BookDetail";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const BookDetails = () => {
  const accessToken = useSelector((state) => state.authreducer.accessToken);
  const param = useParams();
  const privateApi = useAxiosPrivate();
  const [bookDetail, setBookDetail] = useState([]);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const getBookDetails = async () => {
      try {
        const response = await privateApi.get(`/book/${param.id}`, {
          headers,
          withCredentials: true,
        });
        setBookDetail(response.data.data);
      } catch (error) {
        console.log("error", error);
        return error;
      }
    };
    getBookDetails();
  }, [accessToken, setBookDetail, privateApi]);
  return (
    <div>
      <BookDetail bookDetail={bookDetail} />
    </div>
  );
};

// const bookDetailLoader = async ({ params }) => {};

export default BookDetails;
