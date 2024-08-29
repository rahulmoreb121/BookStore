import styles from "./BookDetail.module.css";
const BookDetail = () => {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <img src="../public/assets/book.jpg" width={100} height={100} alt="" />
      </div>
      <div className={styles.right}>
        <div className="title">title</div>
        <div className="image_name">
          <div className="author_image"></div>
          <p className="name"></p>
        </div>
        <p>******</p>
        <div className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
          deserunt libero quos nam, est fugit odio incidunt similique
          perspiciatis sequi?
        </div>
        <div className="date">123</div>
        <div className="laguage">sdfs</div>
        <div className="pages">12</div>
        <div className="category">sdf</div>
        <div className="price">$90</div>
        <div className="buttons">
          <div className="btn1">1</div>
          <div className="btn2">2</div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
