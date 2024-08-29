import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyBooks from "./pages/MyBooks";
import Navbar from "./components/navbar/Navbar";
import BookDetails from "./pages/BookDetails";
import NavbarLayout from "./Layout/NavbarLayout/NavbarLayout";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/mybooks",
        element: <MyBooks />,
      },
      {
        path: "/mybooks/:id",
        element: <BookDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <Navbar />
    </RouterProvider>
  );
}

export default App;
