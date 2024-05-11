import { Skeleton } from "@/components/ui/skeleton";
import { twMerge } from "tailwind-merge";

const CategoriesLoader = ({ cards, className }: any) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mx-2 lg:mx-10 justify-center w-full">
      {Array(cards)
        .fill(0)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className={twMerge("h-[170px] w-full", className)}
            />
          );
        })}
    </div>
  );
};

export default CategoriesLoader;
