import { useState, useEffect, useContext } from "react";
import Logo from "../assets/logo.png";
import LogoIcon from "../assets/logoIcon.png";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BsCart3 } from "react-icons/bs";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { IoIosPerson } from "react-icons/io";
import { toolsCategoryUrl } from "@/services/url";
import { useFetch } from "@/hooks/UseFetch";
import { AuthenticationContext } from "@/context/AuthContext";
import { ACTION, CartContext } from "@/context/CartContext";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";

const Nav = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [state, dispatch]: any = useContext(CartContext);
  const { data: Categories } = useFetch(toolsCategoryUrl);
  const { isAuthenticated, setIsAuthenticated }: any = useContext(
    AuthenticationContext
  );
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);

  const titles = [
    { id: 1, title: "Category" },
    { id: 2, title: "Brands" },
    { id: 3, title: "Trade Types" },
  ];

  const toogleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    dispatch({ type: ACTION.RESTORE });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the width as needed
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-3 px-3 lg:px-10 border-b-[1px] shadow-md bg-white max-h-20">
      <div className="w-[180px] row items-center gap-2">
        <div className="">
          <button className="lg:hidden" onClick={toogleSideBar}>
            <RxHamburgerMenu size={22} />
          </button>
          <div
            className={`fixed bg-white top-0 bottom-0 z-50 left-0 right-0 h-[100vh] px-5 transition-all duration-500 sm:hidden ${
              showSideBar ? "translate-x-0" : "-translate-x-[100%]"
            }`}
          >
            <div className="flex justify-between items-center pb-3 pt-7">
              <div className="flex items-center gap-2">
                <span>
                  <IoIosPerson size={25} />
                </span>

                <div className="text-xl tracking-wide font-medium ">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        localStorage.clear();
                        toogleSideBar();
                        setIsAuthenticated(false);
                        dispatch({ type: ACTION.RESTORE });
                      }}
                    >
                      LogOut
                    </button>
                  ) : (
                    <Link to={"/login"}>login</Link>
                  )}
                </div>
              </div>
              <div>
                <button className="flex items-center" onClick={toogleSideBar}>
                  <RxCross1 size={25} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-8">
              <Link
                onClick={toogleSideBar}
                to={"/courses"}
                className="text-2xl  font-medium text-black/80"
              >
                Courses
              </Link>
              <h4 className="text-2xl border-b border-black pb-2 font-medium text-black/80">
                Categories
              </h4>
              {Categories?.map((item: any) => {
                return (
                  <div key={item?.id} className="py-3 border-b-2 ">
                    <Link
                      onClick={toogleSideBar}
                      to={`/tools/${item?.name}/${item?.id}`}
                      className="capitalize text-2xl"
                    >
                      {item?.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {isSmallScreen ? (
          <Link to={"/"} className="w-full">
            <img src={LogoIcon} alt="logo" className="w-10" />
          </Link>
        ) : (
          <img
            src={Logo}
            alt="logo"
            onClick={() => navigate("/")}
            className="w-48 cursor-pointer transition-all "
          />
        )}
      </div>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="flex gap-1">
          <div>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-[15px]">
                {titles[0]?.title} {/* Changed titles.title[0] to titles[0] */}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-80 p-3 px-5 capitalize flex flex-col gap-3 shadow-md bg-[#FFFFF0]">
                {Categories?.map((item: any) => {
                  return (
                    <div key={item?.id}>
                      <Link
                        to={`/tools/${item.name
                          .toLowerCase()
                          .replace(/\//g, "")}/${item?.id}`}
                        className="capitalize"
                      >
                        {item?.name}
                      </Link>
                    </div>
                  );
                })}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </div>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link
                to="/courses"
                className="text-[15px] font-semibold tracking-wide"
              >
                Courses
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="row gap-10">
        <Link to="/cart" className="relative mr-4 lg:mr-0">
          <div>
            <BsCart3 size={21} />
          </div>
          <div className="counter">{state.toolsInCart.length}</div>
        </Link>
        <div className="hidden lg:flex">
          {isAuthenticated ? (
            <button className="tracking-wide" onClick={handleLogout}>
              LogOut
            </button>
          ) : (
            <Link to={"/login"} className="row items-center gap-1">
              <span>
                <TbLogin2 size={22} />
              </span>
              <span className="text-md">Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;

// <NavigationMenuList className="flex gap-1">
//   <div>
//     <NavigationMenuItem>
//       <NavigationMenuTrigger className="text-[15px]">
//         {titles[1]?.title} {/* Changed titles.title[0] to titles[0] */}
//       </NavigationMenuTrigger>
//       <NavigationMenuContent className="min-w-80 p-3 px-5 capitalize flex flex-col gap-3 shadow-md bg-[#FFFFF0]">
//         {brands?.map((item: any) => {
//           return (
//             <div key={item?.id}>
//               <Link
//                 to={`/tools/${item?.name}/${item?.id}`}
//                 className="capitalize"
//               >
//                 {item?.name}
//               </Link>
//             </div>
//           );
//         })}
//       </NavigationMenuContent>
//     </NavigationMenuItem>
//   </div>
// </NavigationMenuList>;
