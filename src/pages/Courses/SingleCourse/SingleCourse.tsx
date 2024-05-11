import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import SingleCourseDetails from "./SingleCourseDetails";
import LoadingImage from "../../../assets/loading.svg";
import { coursesUrl } from "@/services/url";

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>({});
  const [courseDate, setCourseDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getCourse = async () => {
    if (id) {
      try {
        setIsLoading(true);
        const response = await axios.get(coursesUrl + `course/${id}`);
        const data = response.data;
        const formatedDate = format(data.courses.date, "MMMM do yyyy, h:mm");
        setCourseDate(formatedDate);
        setCourse(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  return (
    <div>
      <div className="mt-[75px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-48">
              <img
                src={LoadingImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="text-xl mt-5">Loading... Please Wait</h4>
          </div>
        ) : (
          <SingleCourseDetails course={course} courseDate={courseDate} />
        )}
      </div>
    </div>
  );
};

export default SingleCourse;

{
  // "course_id": "04693e09-c9ad-4e22-a0dd-240ddf58c771",
  // "title": "Plastering 101: From Basics to Expert Level.",
  // "price": "2000.00",
  // "discount": "10.00",
  // "study_method": "ONLINE",
  // "duration": "1.8 hours · Self-paced",
  // "qualification": "No formal qualification",
  // "more_info": "In Plastering 101: From Basics to Expert Level, you'll explore the fundamental aspects of Plastering 101: From. This Plastering 101: From Basics to Expert Level offers a comprehensive overview, ensuring a deep understanding of Plastering 101: From. Perfect for beginners and those looking to refresh their knowledge, Plastering 101: From Basics to Expert Level is the first step in mastering Plastering 101: From.",
  // "picture": "https://res.cloudinary.com/dj1g3dh8q/image/upload/v1/courses/hcipg2_r4jb8t",
  // "date": "2024-04-18T06:00:00Z"
}
