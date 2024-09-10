import style from "./BookForm.module.css";
import { useForm } from "react-hook-form";
// eslint-disable-next-line react/prop-types
const BookForm = ({ addOrUpdate }) => {
  const categories = [
    "Literary Fiction",
    "Historical Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Horror",
    "Biography",
    "Autobiography",
    "Memoir",
    "Self-Help",
    "Travel",
    "Health & Wellness",
    "Cooking",
    "True Crime",
    "History",
    "Science",
    "Politics",
    "Religion & Spirituality",
    "Business & Economics",
    "YA Fiction",
    "YA Fantasy",
    "YA Romance",
    "Picture Books",
    "Early Readers",
    "Middle Grade",
    "Chapter Books",
    "Dystopian",
    "Adventure",
    "Paranormal",
    "Steampunk",
    "Classical Literature",
    "Poetry",
    "Graphic Novels",
    "Comics",
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    coverImages: [],
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    publishedOn: "",
    language: "",
    pages: "",
  });
  const submit = async (data) => {
    await addOrUpdate(data, reset);
  };
  const validateFileSize = (files) => {
    console.log("inside", files[0]);

    const maxSize = 5 * 1024 * 1024;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > maxSize) {
        console.log("insede the file", files[i].size, maxSize);
        return false;
      }
    }
    return true;
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input
            placeholder="Enter Title"
            {...register("title", { required: "Title is required" })}
            type="text"
          />
          {errors.title && (
            <p className={style.error}>{errors.title.message}</p>
          )}
        </div>
        <div>
          <textarea
            placeholder="Enter Description"
            className={style.textarea}
            {...register("description", {
              required: "description is required",
            })}
            type="text"
            rows="5"
            cols="50"
          />
          {errors.description && (
            <p className={style.error}>{errors.description.message}</p>
          )}
        </div>
        <div>
          <select
            placeholder="select Category"
            {...register("category", {
              required: "category is required",
            })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className={style.error}>{errors.category.message}</p>
          )}
        </div>

        <div>
          <input
            placeholder="Enter Price"
            {...register("price", {
              required: "price is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "only numbers are allowed",
              },
            })}
            type="text"
          />
          {errors.price && (
            <p className={style.error}>{errors.price.message}</p>
          )}
        </div>

        <div>
          <input
            placeholder="Enter Discount Percentage"
            {...register("discountPercentage", {
              required: "discount percentage is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "only numbers are allowed",
              },
            })}
            type="text"
          />
          {errors.discountPercentage && (
            <p className={style.error}>{errors.discountPercentage.message}</p>
          )}
        </div>
        <div className={style.input_container}>
          <input
            type="date"
            placeholder="Enter published date"
            {...register("publishedOn", {
              required: "publishedOn is required",
            })}
            max={today}
          />
          {errors.publishedOn && (
            <p className={style.error}>{errors.publishedOn.message}</p>
          )}
        </div>
        <div>
          <input
            placeholder="Enter language"
            {...register("language", {
              required: "language is required",
            })}
            type="text"
          />
          {errors.language && (
            <p className={style.error}>{errors.language.message}</p>
          )}
        </div>
        <div>
          <input
            placeholder="Enter No of pages"
            {...register("pages", {
              required: "pages is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "only numbers are allowed",
              },
            })}
            type="text"
          />
          {errors.pages && (
            <p className={style.error}>{errors.pages.message}</p>
          )}
        </div>

        <div className={style.upload}>
          <span className={style.label}>Upload Photos:</span>
          <input
            className={style.file}
            {...register("coverImages", {
              required: "Image is required",
              validate: {
                fileSize: validateFileSize || "file should be lesss than 2mb",
              },
            })}
            type="file"
            multiple
          />
        </div>
        {errors.coverImages && errors.coverImages.type === "required" && (
          <p className={style.error}>{errors.coverImages.message}</p>
        )}
        {/* {errors.coverImages && errors.coverImages.type === "fileSize" && (
          <p className={style.error}>Image should be less than 2 mb</p>
        )} */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookForm;
