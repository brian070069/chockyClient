import { useFetch } from "@/hooks/UseFetch";
import { toolsBrandUrl } from "@/services/url";
import BrandLoader from "./BrandLoader";

const Brands = () => {
  const { data, isLoading } = useFetch(toolsBrandUrl);

  return (
    <div className="my-5">
      <h4 className="text-center text-2xl font-semibold tracking-wide   mb-5 ">
        Our Best Brands
      </h4>
      <div className="row justify-center  gap-10 flex-wrap">
        {isLoading ? (
          <BrandLoader cards={5} />
        ) : (
          data.map((brand: any) => {
            return (
              <div
                key={brand.id}
                className="w-[100px] md:w-[130px] md:h-[150px]  flex items-center"
              >
                <img
                  src={brand.image}
                  alt="brand"
                  className="w-full object-contain"
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Brands;
