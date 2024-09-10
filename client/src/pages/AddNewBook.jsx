import BookForm from "../components/bookform/BookForm";
import api from "../api/axios.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddNewBook = () => {
  const accessToken = useSelector((state) => state.authreducer.accessToken);
  const navigate = useNavigate();
  const addBook = async (data, reset) => {
    console.log("from add book", data);
    const formdata = new FormData();
    for (let i = 0; i < data.coverImages.length; i++) {
      formdata.append("coverImages", data.coverImages[i]);
    }

    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("publishedOn", data.publishedOn);
    formdata.append("category", data.category);
    formdata.append("discountPercentage", data.discountPercentage);
    formdata.append("price", data.price);
    formdata.append("language", data.language);
    formdata.append("pages", data.pages);
    console.log(formdata.getAll("coverImages"));

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await api.post("/book", formdata, { headers });
      console.log(response);
      reset();
      navigate("/mybooks");
    } catch (error) {
      console.log(error);
    }
  };
  return <BookForm addOrUpdate={addBook} />;
};

export default AddNewBook;
