import "./BookCard.css";
// eslint-disable-next-line react/prop-types
const BookCard = (prop) => {
  return (
    <div className="main">
      <div className="top">
        <img src={prop.bookData?.coverImages[0]} alt="" />
      </div>
      <div className="bottom">
        <div className="date_likes">
          <p className="date">{prop.bookData?.publishedOn}</p>
          <p className="likes"> * * * * *</p>
        </div>
        <p className="desc">{prop.bookData.description}</p>
        <div className="price_buttons">
          <p className="price">{prop.bookData.price}</p>
          <div
            className="buttons"
            onClick={() => prop.navigateBookDetail(prop.bookData._id)}
          >
            <button className="explore_btn">explore </button>
            <button className="add_to_cart_btn">add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
