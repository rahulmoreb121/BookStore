import Auth from "../components/Auth/Auth";
import BookCard from "../components/BookCard/BookCard";

const Home = () => {
  const login = (values) => {
    console.log("hello", values);
  };
  return (
    <>
      <BookCard />
      <Auth isSignup={true} loginOrRegister={login} />
    </>
  );
};

export default Home;
