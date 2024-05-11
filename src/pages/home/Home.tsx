import Footer from "@/components/Footer";
import Brands from "./components/Brands";
import AllCategories from "./components/AllCategories";
import Banner from "./components/Banner";
import { useFetch } from "@/hooks/UseFetch";
import { toolsCategoryUrl } from "@/services/url";
import CategoriesLoader from "./components/CategoriesLoader";

const Home = () => {
  const { data: categories, isLoading } = useFetch(toolsCategoryUrl);

  return (
    <div className="relative">
      <div className="mt-[70px] max-w-[100vw] max-h-[100vh]">
        <Banner />
        <div className="bg-[#fffff0] relative">
          <div className="">
            <div className="flex flex-col items-center max-w-[500px] mx-auto mt-5 mb-5 ">
              <h4 className="font-bold text-[26px] text-center hidden lg:flex ">
                Your one-stop shop for all the plastering supplies you need.
              </h4>
              <h4 className=" text-xl font-semibold tracking-wide text-[#7150e6] mt-3  ">
                Shop better with Chocky Plasterings.
              </h4>
            </div>
            {isLoading ? (
              <CategoriesLoader cards={8} />
            ) : (
              <AllCategories categories={categories} />
            )}
          </div>
          <Brands />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
