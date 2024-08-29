import { useParams } from "react-router-dom";
import BookDetail from "../components/bookdetail/BookDetail";
const BookDetails = () => {
  const param = useParams();
  console.log(param);

  return (
    <div>
      <BookDetail />
    </div>
  );
};

export default BookDetails;
