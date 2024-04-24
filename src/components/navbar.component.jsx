import { useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Symbol from "./Symbol.component";
import { UserContext } from "../App";
import { logOutUser } from "../common/sessionControl";
import AnimationWrapper from "../common/animationwrapper";

const Navbar = () => {
  const [toggleSearchBox, settoggleSearchBox] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const navigate = useNavigate();

  const {
    appData: { access_token, username, profile_img },
    setAppData,
  } = useContext(UserContext);

  const handleSubMenuClick = () => {
    setSubMenu((prev) => !prev);
  };
  
  const handleLogOutUser = () => {
    logOutUser();
    setAppData({ access_token: null });
    navigate("/signin");
  };

  return (
    <>
      <nav className="navbar flex items-center min-h-[8vh] w-full px-3 border-b border-gray-100">
        <div className="md:flex items-center w-full">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex w-fit">
              <img src={logo} className={`w-12 h-12`} />
            </Link>
            <div className="quick-links md:absolute flex items-center right-4 my-4">
              <button
                className="md:hidden w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                onClick={() => settoggleSearchBox((prev) => !prev)}
              >
                <Symbol classStyle="" symbolName="search"></Symbol>
              </button>
              <Link
                to="/editor"
                className="relative hidden md:flex px-5 py-3 hover:bg-gray-100 rounded-md"
              >
                <Symbol
                  classStyle="absolute top-[0.9rem]"
                  symbolName="file-edit"
                />
                <p className="ml-5">Write</p>
              </Link>
              <>
                <div className="relative mx-2">
                  {access_token ? (
                    <AnimationWrapper key={access_token}>
                      <div className="relative flex items-center gap-3">
                        <Link to="/dashboard">
                          <Symbol
                            symbolName="bell"
                            classStyle="px-3 py-3 rounded-full bg-gray-100 flex items-center"
                          />
                        </Link>
                        <button
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-purple-400"
                          onClick={handleSubMenuClick}
                          onBlur={() => {
                            setTimeout(() => {
                              setSubMenu(false);
                            }, 150);
                          }}
                        >
                          <img src={profile_img} className="object-cover" />
                        </button>
                        <AnimationWrapper key={subMenu}>
                          <div
                            className={`sub-menus ${
                              subMenu ? "" : "hidden"
                            } absolute right-3 flex flex-col top-14 border-gray-200 border overflow-hidden rounded-lg w-[170px]`}
                          >
                            <Link
                              to="/profile"
                              className="hover:bg-gray-100 px-8 py-3"
                            >
                              Profile
                            </Link>
                            <Link
                              to="/settings"
                              className="hover:bg-gray-100 px-8 py-3"
                            >
                              Settings
                            </Link>
                            <button
                              className="hover:bg-gray-100 px-8 py-3 text-left"
                              onClick={handleLogOutUser}
                            >
                              Logout
                              <span className="block text-[12px] text-gray-400 text-left">
                                @{username}
                              </span>
                            </button>
                          </div>
                        </AnimationWrapper>
                      </div>
                    </AnimationWrapper>
                  ) : (
                    <AnimationWrapper key={access_token}>
                      <div className="flex items-center gap-3">
                        <Link
                          to="/signin"
                          className="px-5 py-3 bg-black text-white rounded-md hover:opacity-75"
                        >
                          <p>Sign in</p>
                        </Link>
                        <Link
                          to="/signup"
                          className="hidden md:block px-5 py-3 bg-gray-100 text-black rounded-md hover:opacity-75"
                        >
                          <p>Sign up</p>
                        </Link>
                      </div>
                    </AnimationWrapper>
                  )}
                </div>
              </>
            </div>
          </div>
          <div
            className={`search-box${
              toggleSearchBox ? "" : " hidden"
            } md:flex relative my-2 w-full md:w-fit`}
          >
            <i className="fi fi-rr-search absolute left-3 top-[0.70rem] "></i>
            <input
              type="text"
              className="search-box input w-full md:w-[300px] bg-gray-100 h-10 rounded-full pl-9"
            />
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
