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
            path: "mybooks",
            element: <MyBooks />,
          },
          {
            path: "mybooks/:id",
            element: <BookDetails />,
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
