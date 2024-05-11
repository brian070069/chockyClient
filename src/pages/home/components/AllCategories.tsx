import { Link } from "react-router-dom";

const AllCategories = ({ categories }: any) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-3 mx-2 lg:mx-10 justify-center ">
      {categories.map((categories: any) => {
        return (
          <div key={categories.id} className="relative hover:cursor-pointer">
            <div className="h-[200px] lg:h-[250px] z-[5] rounded-lg">
              <img
                src={categories.image}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <Link
              to={`/tools/${categories.name.toLowerCase().replace(/\//g, "")}/${
                categories.id
              }`}
              className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/60 rounded-lg flex flex-col justify-center items-center"
            >
              <div className="flex flex-col items-center gap-2">
                <h4 className="capitalize text-white/80 font-semibold text-2xl tracking-wide text-center">
                  {categories.name}
                </h4>
                <button className="bg-red-600 py-2 px-5 text-white font-medium tracking-wide text-white/80 rounded-sm">
                  Shop Now
                </button>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllCategories;
