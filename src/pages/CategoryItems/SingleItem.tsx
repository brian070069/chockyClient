import { CartContext } from "@/context/CartContext";
import useAddToCart from "@/hooks/useAddToCart";
import { useContext, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const SingleItem = ({ tool }: any) => {
  const { addToolToCart, isItemInCart, setIsItemInCart, isLoading } =
    useAddToCart();
  const [state]: any = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfItemIsInCart = state.toolsInCart.find((item: any) => {
      // remeber item.tool === toolId
      return item.tool === tool.id;
    });

    if (checkIfItemIsInCart) {
      setIsItemInCart(true);
      return;
    }
  }, [state.toolsInCart]);

  return (
    <div className="border-2 shadow-md rounded-md w-full ">
      <div className="h-[180px] lg:h-[200px] w-full ">
        <Link to={`${location.pathname}/products/${tool.id}`}>
          <img
            src={tool.image}
            alt=""
            className="w-full h-full object-contain rounded-lg"
          />
        </Link>
      </div>
      <div className="p-3 w-full">
        <h4 className="text-center text-md text-black/70 capitalize">
          {tool.brand.name}
        </h4>
        <h5 className="text-[16px] text-black/90 tracking-wide">{tool.name}</h5>
        <h5 className="font-medium">KSH {tool.price}</h5>
        <div>
          {isItemInCart ? (
            <button
              onClick={() => navigate("/cart")}
              className="bg-[#7150e6] w-full py-2 rounded-md mt-2 hover:text-white transition-all"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => addToolToCart(tool.id, +tool.price)}
              className={twMerge(
                "bg-red-500 w-full py-2 mt-2 rounded-md font-medium flex justify-center  hover:text-white",
                isLoading && "bg-gray-500"
              )}
            >
              {isLoading ? (
                <TailSpin
                  visible={true}
                  height="25"
                  width="25"
                  color="red"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Add to Cart"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
