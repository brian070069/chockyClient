import { useContext, useState } from "react";
import axios from "axios";
import { AuthenticationContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ACTION, CartContext } from "@/context/CartContext";
import { orderUrl } from "@/services/url";

const useAddToCart = () => {
  const { setIsAuthenticated }: any = useContext(AuthenticationContext);
  const [, dispatch]: any = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isItemInCart, setIsItemInCart] = useState(false);
  const navigate = useNavigate();

  const addToolToCart = async (toolId: string, toolPrice: number) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
      localStorage.clear();
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(orderUrl + "cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartId = response.data[0].cart_id;

      const addToCart = await axios.post(
        orderUrl + `cart/${cartId}/item/`,
        {
          tool: toolId,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsLoading(false);
      dispatch({
        type: ACTION.ADDTOOLSTOCART,
        payload: { ...addToCart.data, tool: toolId, subtotal: toolPrice },
        price: toolPrice,
      });
    } catch (error: any) {
      setIsLoading(false);
      if (error.request.status === 401) {
        navigate("/login");
        localStorage.clear();
      } else {
        console.log("an error occcured");
      }
    }
  };

  return { addToolToCart, isLoading, setIsItemInCart, isItemInCart };
};

export default useAddToCart;
