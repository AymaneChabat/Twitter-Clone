import { useState } from "react";
import SearchIcon from "../icons/menu/search";

function SearchBar({searchInput, setSearch}) {
    const [color,setColor] = useState("#ffffff")
    return (
        <div className="bg-[#ebebeb]">
            <div>
                <SearchIcon picked={["0", null]} color={color}/>
                <input className="bg-transparent" placeholder="Search" value={searchInput} onChange={(e)=>{setSearch(e.target.value)}}/>
            </div>
        </div>
    )
}

export default SearchBar;