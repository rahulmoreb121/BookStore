import "./BookCard.css";
const BookCard = () => {
  return (
    <div className="main">
      <div className="top">
        <img src="/assets/book.jpg" alt="" />
      </div>
      <div className="bottom">
        <div className="date_likes">
          <p className="date">12 nov 2024</p>
          <p className="likes"> * * * * *</p>
        </div>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          nisi, esse repudiandae est provident laborum commodi nam voluptatum
          impedit sed.
        </p>
        <div className="price_buttons">
          <p className="price">90$</p>
          <div className="buttons">
            <button className="explore_btn">explore </button>
            <button className="add_to_cart_btn">add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
