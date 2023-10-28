import { forwardRef, useEffect, useState } from 'react';
import { SearchIcon } from '../../components/icons/menu';
import { getUsers, resetUsers } from '../../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

const SearchBar = forwardRef(({}, ref) => {
    // State for managing the search input value
    const [search, setSearch] = useState("");
    // State to track whether the input is focused or not
    const [focused, setFocused] = useState(false);
    // Get the current color from Redux state
    const color = useSelector(state => state.color.color);
    const dispatch = useDispatch();
  
    // Effect to handle search input changes and dispatch actions accordingly
    useEffect(() => {
      if (search === "") {
        dispatch(resetUsers());
      } else if (search !== "") {
        // Dispatch the getUsers action with the search query and other parameters
        dispatch(getUsers(search, undefined, "search", 5, undefined));
      }
      // Update the ref with the current search value
      ref.current = search;
    }, [search]);
  
    return (
      <div className={'flex py-2 w-[85%] my-2 items-center rounded-full border-2 px-4 dark:bg-[#16181c] bg-['+(!focused ? "#EFF3F4] border-transparent" : "#ffffff] border border-["+color+"]")}>
        <SearchIcon picked={[false,"Explore"]} color={focused ? color : "#808080"} size={"20"}/>
        <input
          onChange={(e) => { setSearch(e.target.value) }}
          value={search}
          onFocus={() => { setFocused(true) }}
          onBlur={() => { setFocused(false) }}
          placeholder='Search'
          className='dark:text-[#ffffff] bg-transparent w-full ml-3 focus:outline-none font-chirp'
        />
      </div>
    );
});

export default SearchBar;