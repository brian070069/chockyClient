import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toolsCategoryUrl } from "@/services/url";
import SingleItem from "./SingleItem";
import CategoryItemLoader from "./CategoryItemLoader";

const CategoryItem = () => {
  const { id, cat } = useParams();
  const [categoryItems, setCategoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [brands, setBrands] = useState([]);

  const getCategory = async () => {
    if (id) {
      try {
        setIsLoading(true);
        const response = await axios.get(toolsCategoryUrl + id);
        const data = response.data;
        setCategoryItems(data?.tools);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getCategory();
  }, [id]);

  return (
    <div className=" min-h-[100vh]  min-w-[100vw] pt-[70px] ">
      <div className=" mb-10 row  w-full pb-24">
        <div className="w-48 hidden md:block px-3">
          <h4 className="pt-2  font-medium text-lg border-b border-black/90 mb-4">
            Brands
          </h4>
          {/* <div className="flex flex-col gap-3">
            {brands?.map((brand: any) => {
              return (
                <div
                  key={brand.id}
                  className="border-b-[1px] border-b-black/50"
                >
                  <div className="flex flex-col gap-3 items-center">
                    <div className="w-24  pb-3">
                      <img src={brand?.image} alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
        <div className=" mx-2 lg:px-10 pt-3 w-full">
          <div>
            <div>
              <span className="font-medium">Home</span>
              <span className="px-1 font-medium">/</span>
              <span className="text-black/80 capitalize">{cat}</span>
            </div>
            <h4 className="text-[28px] font-semibold my-4 capitalize ">
              {cat}
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 gap-3  justify-center">
            {isLoading ? (
              <CategoryItemLoader cards={10} />
            ) : (
              categoryItems?.map((tool: any) => {
                return <SingleItem key={tool.id} tool={tool} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
