import { useContext, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthenticationContext } from "./context/AuthContext";
import axios from "axios";
import { ACTION, CartContext } from "./context/CartContext";
import Nav from "./components/Nav";
import LazyLoading from "./components/LazyLoading";
import { orderUrl } from "./services/url";

const CategoryItem = lazy(() => import("./pages/CategoryItems/CategoryItem"));
const ItemDescription = lazy(
  () => import("./pages/CategoryItems/ItemDescription/ItemDescription")
);
const Cart = lazy(() => import("./pages/cart/Cart"));
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Courses = lazy(() => import("./pages/Courses/Courses"));
const SingleCourse = lazy(
  () => import("./pages/Courses/SingleCourse/SingleCourse")
);

function App() {
  const { isAuthenticated, setIsAuthenticated }: any = useContext(
    AuthenticationContext
  );
  const [, dispatch]: any = useContext(CartContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const getCartItems = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await axios.get(orderUrl + `cart/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data[0].cart_items;
        dispatch({ type: ACTION.GETTOOLSINCART, payload: data });
      } catch (error) {}
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div>
      <BrowserRouter>
        {/* Render the Nav component based on the current location */}
        <RouteNavigation />
        <Suspense fallback={<LazyLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tools/:cat/:id">
              <Route index element={<CategoryItem />} />
              <Route
                path="/tools/:cat/:id/products/:id"
                element={<ItemDescription />}
              />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<SingleCourse />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

const RouteNavigation = () => {
  const location = useLocation();

  return (
    location.pathname !== "/login" &&
    location.pathname !== "/register" && <Nav />
  );
};

export default App;
