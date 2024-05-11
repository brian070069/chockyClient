import { Skeleton } from "@/components/ui/skeleton";

const CategoryItemLoader = ({ cards }: any) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className=" flex flex-col gap-2 rounded-md w-full "
            >
              <div className="h-[120px] lg:h-[160px] w-full ">
                <Skeleton className="w-full  h-full" />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-full h-7" />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CategoryItemLoader;
