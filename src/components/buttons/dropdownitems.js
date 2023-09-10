import { signOut } from "../../redux/actions";
import { useDispatch } from "react-redux";

function DropdownItems({data}) {
  const dispatch = useDispatch()
  return (
            <div className='flex py-2 w-[100%] items-center' onClick={data[1] === "Log out" ? ()=>{dispatch(signOut())} : ""}>
                {data[0]}
                <span className='font-medium text-[16px] text-[#000000]/[.7] -mb-0.5'>{data[1]}</span>
            </div>
  );
}

export default DropdownItems;
