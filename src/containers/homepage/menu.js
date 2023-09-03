import BottomMenuSM from "../../components/menu/menu-types/bottom-menu-sm";
import MainMenu from "../../components/menu/menu-types/main-menu";


function FinalMenu({w}) {
    
  return (
    <>
        {w < 500 ? <BottomMenuSM /> : <MainMenu /> }
    </>
  );
}

export default FinalMenu;
