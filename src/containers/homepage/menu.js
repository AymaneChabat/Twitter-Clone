import { Fragment } from "react";
import BottomMenuSM from "../../components/menu/menu-types/bottom-menu-sm";
import MainMenu from "../../components/menu/menu-types/main-menu";
import { PostIcon } from "../../components/icons/menu";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import SlideMenu from "../../components/menu/menu-types/slide-menu-sm";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

function FinalMenu() {
  const match = useMediaQuery("(max-width:600px)")
  const location = useLocation();
  const page = location.pathname.slice(1)

  return (
    <AnimatePresence initial={true} mode="sync">
      {match ? (
        <Fragment>
          <BottomMenuSM key={200} />
          {page === 'home' && (
            <Fragment>
              <div className="fixed right-4 bottom-[70px] z-20">
                <Link
                  to={"/compose/post"}
                  state={{ previousLocation: location }}
                  type="button"
                  className="text-white s13:w-[16rem] px-0.5 s13:px-0 s13:py-3 bg-[#1ca4ff] hover:bg-[#0292f2] font-medium rounded-full transition duration-300 text-md"
                >
                  <PostIcon />
                </Link>
              </div>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <MainMenu tab={page.charAt(0).toUpperCase() + page.slice(1)} />
      )}
    </AnimatePresence>
  );
}

export default FinalMenu;
