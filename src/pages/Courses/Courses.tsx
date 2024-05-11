import { useFetch } from "@/hooks/UseFetch";
import Banner from "./components/Banner";
import CategoriesLoader from "../home/components/CategoriesLoader";
import { useNavigate } from "react-router-dom";
import { coursesUrl } from "@/services/url";

const Courses = () => {
  const { data: courses, isLoading } = useFetch(
    `${coursesUrl}course`
  );
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Banner allCourses={courses?.length} />
      <div className="w-[100vw] overflow-x-hidden flex gap-5 flex-wrap justify-center py-5 px-5 text-[#00244c]">
        {isLoading ? (
          <CategoriesLoader cards={10} />
        ) : (
          courses.map((course: any) => {
            return (
              <div key={course?.course_id} className=" rounded-md w-96 ">
                <div className=" py-5 px-8 flex flex-col gap-4  bg-[#e9e9eaf8]">
                  <h4 className="capitalize text-xl tracking-wide font-semibold">
                    {course?.title}
                  </h4>
                  <h4 className="capitalize tracking-wide font-medium text-[#00244c]/90">
                    {course?.qualification}
                  </h4>
                </div>
                <div className="px-5 py-3 bg-[#00244C0D] ">
                  <p className="font-medium text-md text-md text-[#00244c]/90">
                    {course?.more_info.slice(0, 110)}...
                  </p>
                  <h4 className="font-bold text-xl italic my-3">
                    Ksh {course?.price}
                  </h4>
                  <div>
                    <button
                      onClick={() =>
                        handleNavigate(`/courses/${course?.course_id}`)
                      }
                      className="  bg-[#ffa100] py-2 px-5 font-semibold  rounded-sm mt-2 tracking-wider"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Courses;
