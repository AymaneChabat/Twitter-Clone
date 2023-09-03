function DownArrow({active, size}) {

    return (
        <svg fill={active !== undefined ? (active ? "#1d9bf0" : "#000000") : "#1d9bf0"} className={active !== undefined ? (active ? "rotate-180 transition-all transition-500" : "rotate-0 transition-all transition-300") : "rotate-0 transition-all transition-300"} height={size === undefined ? 16 : size} width={size === undefined ? 16 : size} version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 330 250" >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path> 
            </g>
        </svg>
    )
}

export default DownArrow;