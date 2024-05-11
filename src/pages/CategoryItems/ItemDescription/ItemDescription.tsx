import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toolsToolUrl } from "@/services/url";
import useAddToCart from "@/hooks/useAddToCart";
import { CartContext } from "@/context/CartContext";

const ItemDescription = () => {
  const [item, setItems] = useState<any>({});
  const { id } = useParams();
  const [state]: any = useContext(CartContext);
  const navigate = useNavigate();
  const { addToolToCart, isItemInCart, setIsItemInCart }: any = useAddToCart();

  const getCategory = async () => {
    if (id) {
      const response = await axios.get(toolsToolUrl);
      const data = response.data;

      const filterItem = data.filter((category: any) => {
        return category?.id === id;
      });

      setItems(filterItem[0]);
    }
  };

  useEffect(() => {
    getCategory();
  }, [id]);

  useEffect(() => {
    const checkIfItemIsInCart = state.toolsInCart.find((tool: any) => {
      // remeber item.tool === toolId
      return tool?.tool == item?.id;
    });

    if (checkIfItemIsInCart) {
      setIsItemInCart(true);
      return;
    }
  });

  return (
    <div>
      <div className="mt-[75px] max-w-[1000px] mx-auto px-5 ">
        <div className="row gap-1 text-md items-center pb-6">
          <span>Home</span>
          <span className="text-black/70 text-sm">/</span>
          <span className="text-black/70 ">{item?.category?.name}</span>
          <span className="text-sm">/</span>
          <span className="text-black/70">{item?.name}</span>
        </div>

        {Object.keys(item).length > 0 && (
          <div className="flex flex-col lg:flex-row gap-4 pb-5">
            <div className="flex-[0.5]">
              <div className=" h-[300px] w-full lg:h-auto">
                <img
                  src={item?.image}
                  alt={"product"}
                  className="w-full h-full object-contain "
                />
              </div>
              <div className="flex  my-1 px-2 gap-2">
                <div className="w-20 h-20 border-2 border-black rounded-md hover:cursor-pointer transition-all ">
                  <img
                    src={item?.image}
                    alt=""
                    className="w-full  object-cover rounded-md "
                  />
                </div>
                <div className="w-20 h-20 border-2 border-black rounded-md hover:cursor-pointer transition-all ">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full  object-cover rounded-md "
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <div>
                <h4 className="text-xl font-semibold capitalize tracking-wide">
                  {item?.name}
                </h4>
                <h4 className="text-md font-medium mt-2 text-lg">
                  KSH {item?.price}
                </h4>
              </div>

              <div className="flex gap-10 py-3">
                {/* <div className="flex items-center gap-3">
                  <button className="bg-red-600 p-2 rounded-md hover:text-white transition-all">
                    <HiOutlineMinusSm />
                  </button>
                  <h4 className="text-lg font-medium">4</h4>
                  <button className="bg-red-600 p-2 rounded-md hover:text-white transition-all ">
                    <IoAdd />
                  </button>
                </div> */}
                <div className="w-full">
                  {isItemInCart ? (
                    <button
                      onClick={() => navigate("/cart")}
                      className="uppercase bg-green-500 py-2 font-semibold tracking-wide  text-white w-full hover:text-black transition-all"
                    >
                      Show In Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addToolToCart(item?.id, +item?.price)}
                      className="uppercase bg-[#7150e6] py-2 font-semibold tracking-wide  text-white w-full hover:text-black transition-all"
                    >
                      Add To cart
                    </button>
                  )}
                </div>
              </div>

              <div>
                <p className="pb-2">{item.description}</p>
                <div className="py-2 ">
                  <h4 className="font-semibold text-xl">Brand</h4>
                  <div className="w-16 h-16">
                    <img
                      src={item?.brand?.image}
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDescription;
