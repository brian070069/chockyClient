import { useFetch } from "@/hooks/UseFetch";
import { HiOutlineMinusSm } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { orderUrl, toolsToolUrl } from "@/services/url";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "@/context/AuthContext";
import axios from "axios";
import { ACTION, CartContext } from "@/context/CartContext";

const SingleItem = ({ tool }: any) => {
  const { data } = useFetch(toolsToolUrl);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [toolsDetails, setToolsDetails] = useState<any>({});
  const [toolQuantity, setToolQuantity] = useState<any>(tool?.quantity);
  const [itemSubTotal, setItemSubTotal] = useState(tool?.subtotal);
  const { setIsAuthenticated }: any = useContext(AuthenticationContext);
  const [, dispatch]: any = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length > 0) {
      const item: any = data.find((item: any) => item.id === tool.tool);
      setToolsDetails(item);
    }
  }, [data]);

  const updateItemInCart = async (operation: string) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
      localStorage.clear();
      return;
    }

    setIsLoadingUpdate(true);

    try {
      const response = await axios.get(orderUrl + "cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartId = response.data[0].cart_id;

      if (operation === "addition") {
        const newQuantity = toolQuantity + 1;
        await axios.patch(
          orderUrl + `cart/${cartId}/item/${tool?.cart_item_id}/`,
          {
            cart_item_id: tool?.cart_item_id,
            quantity: newQuantity,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setToolQuantity((prev: any) => prev + 1);
        setItemSubTotal((prev: any) => +prev + +toolsDetails?.price);
        dispatch({
          type: ACTION.UPDATESUBTOTALS,
          quantity: newQuantity,
          subtotal: +itemSubTotal + +toolsDetails?.price,
          id: tool.tool,
        });
        setIsLoadingUpdate(false);
      } else {
        if (toolQuantity <= 1) {
          setIsLoadingUpdate(false);
          return;
        }
        const newQuantity = toolQuantity - 1;
        await axios.patch(
          orderUrl + `cart/${cartId}/item/${tool?.cart_item_id}/`,
          {
            cart_item_id: tool?.cart_item_id,
            quantity: newQuantity,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setToolQuantity((prev: any) => prev - 1);
        setItemSubTotal((prev: any) => +prev - +toolsDetails?.price);

        dispatch({
          type: ACTION.UPDATESUBTOTALS,
          quantity: newQuantity,
          subtotal: +itemSubTotal - +toolsDetails?.price,
          id: tool.tool,
        });
        setIsLoadingUpdate(false);
      }
    } catch (error: any) {
      setIsLoadingUpdate(false);

      if (error.request?.status === 401) {
        navigate("/login");
        localStorage.clear();
      } else {
        console.log(error);
        console.log("an error occured");
      }
    }
  };

  const removeItemFromCart = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
      localStorage.clear();
      return;
    }
    setIsLoadingRemove(true);
    try {
      const getResponse = await axios.get(orderUrl + "cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartId = getResponse.data[0].cart_id;

      await axios.delete(
        orderUrl + `cart/${cartId}/item/${tool?.cart_item_id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({ type: ACTION.DELETEFROMCART, cartItemId: tool?.cart_item_id });
    } catch (error: any) {
      setIsLoadingRemove(false);
      console.log(error);
      if (error.request?.status === 401) {
        navigate("/login");
        localStorage.clear();
      } else {
        console.log("an error occured");
      }
    }
  };

  return (
    <>
      <div className="bg-[#ebecec48] shadow-md border border-black/30 rounded-md">
        <div className="flex flex-col lg:flex-row  gap-5">
          <div className="flex justify-center">
            <div className="w-32 h-32">
              <img
                src={toolsDetails?.image}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
          <div className="flex  w-full  flex-col gap-6 py-2 px-2">
            <div className="flex justify-between">
              <div>
                <h4 className="text-lg">{toolsDetails?.name}</h4>
                <p className="flex gap-2 text-[16px]">
                  <span className="font-medium">Price</span>
                  <span>Ksh {toolsDetails?.price}</span>
                </p>
              </div>
              <div>
                {isLoadingRemove ? (
                  <span className="text-red-500 capitalize">Removing...</span>
                ) : isLoadingUpdate ? (
                  <span className="text-red-500 capitalize"></span>
                ) : (
                  <button onClick={removeItemFromCart}>
                    <RxCross2 size={23} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              {isLoadingUpdate ? (
                <span className="text-green-600 font-semibold text-lg">
                  Updating...
                </span>
              ) : isLoadingRemove ? (
                <span></span>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateItemInCart("subtract")}
                    className="bg-red-600 p-2 rounded-md hover:text-white transition-all"
                  >
                    <HiOutlineMinusSm />
                  </button>
                  <h4 className="text-lg font-medium">{toolQuantity}</h4>
                  <button
                    onClick={() => updateItemInCart("addition")}
                    className="bg-red-600 p-2 rounded-md hover:text-white transition-all "
                  >
                    <IoAdd />
                  </button>
                </div>
              )}

              <div className="flex">
                <h4 className="font-medium tracking-wide">
                  KSh {itemSubTotal}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleItem;
