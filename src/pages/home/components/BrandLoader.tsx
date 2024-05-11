import { Skeleton } from "@/components/ui/skeleton";

const BrandLoader = ({ cards }: any) => {
  return (
    <div className="row justify-center  gap-4 flex-wrap">
      {Array(cards)
        .fill(0)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="w-[100px] md:w-[130px] h-[100px]  flex items-center "
            />
          );
        })}
    </div>
  );
};

export default BrandLoader;
