import { useSelector } from "react-redux";

function TwitterButton({content}) {
    const colors = {"#1d9bf0":"bg-[#1d9bf0]", "#ffd400":"bg-[#ffd400]", "#f91880":"bg-[#f91880]", "#7856ff":"bg-[#7856ff]", "#ff7a00":"bg-[#ff7a00]", "#00ba7c":"bg-[#00ba7c]"}
    const color = useSelector(state => state.color.color)
    return (
        <button type="button" class={"text-white w-full h-full font-medium rounded-full transition duration-300 text-md hover:brightness-75 " + (colors[color])}>
            {content}
        </button>
    );
  }
  
  export default TwitterButton;
  