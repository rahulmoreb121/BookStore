import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyBooks from "./pages/MyBooks";
import Navbar from "./components/navbar/Navbar";
import BookDetails from "./pages/BookDetails";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRouteLayout from "./Layout/ProtectedRouteLayout/ProtectedRouteLayout";
import MyBookLayout from "./Layout/MyBookLayout/MyBookLayout";
import AddNewBook from "./pages/AddNewBook";
import PersistUser from "./Layout/PersistUser/PersistUser";
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },

      {
        element: <PersistUser />,
        children: [
          {
            element: <ProtectedRouteLayout />,
            children: [
              {
                index: true,
                element: <Home />,
              },
              {
                path: "about",
                element: <About />,
              },
              {
                element: <MyBookLayout />,
                children: [
                  {
                    path: "mybooks",
                    element: <MyBooks />,
                    // loader: myBooksLoader,
                  },
                  {
                    path: "book",
                    element: <AddNewBook />,
                  },
                ],
              },
              {
                path: "books/:id",
                element: <BookDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <Navbar />
      </RouterProvider>
    </Provider>
  );
}

export default App;
