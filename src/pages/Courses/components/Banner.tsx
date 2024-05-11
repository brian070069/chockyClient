import IconLogo from "../../../assets/logoIcon.png";
import CoursesImage from "../../../assets/coursesImage.jpeg";

const Banner = ({ allCourses }: any) => {
  return (
    <div className="flex flex-col justify-center  lg:flex-row mt-[70px] lg:h-96">
      <div className="py-10 px-12 flex flex-col justify-center gap-3 bg-[#ead3c284] flex-1">
        <div>
          <img src={IconLogo} alt="logo" className="w-16" />
        </div>
        <div>
          <h4 className="text-2xl font-semibold">Plastering Courses</h4>
        </div>
        <h4 className="text-lg tracking-wider text-[#36a636] font-semibold ">
          <span> {allCourses}</span>
          <span> {allCourses > 1 ? "Courses" : "Course"}</span>
        </h4>
        <p className="font-semibold text-[17px]">
          Are you looking to add plastering to your skill set? Our full range of
          plastering courses cover everything. We also provide Rendering
          training as well as Dry Lining courses and qualifications
        </p>
      </div>
      <div className="w-full h-full flex-1 bg-white">
        <img src={CoursesImage} alt="" className="object-cover h-full w-full" />
      </div>
    </div>
  );
};

export default Banner;
