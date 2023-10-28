import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";

function TabNavigation({ tabLabels, onTabSelect }) {
  // State for managing the position of the selected tab indicator.
  const [indicatorPosition, setIndicatorPosition] = useState({ width: 0, left: 0 });

  // State to track the currently selected tab.
  const [selectedTab, setSelectedTab] = useState(0);

  // Define tab indicator colors.
  const tabIndicatorColors = {
    "#1d9bf0": "border-[#1d9bf0]",
    "#ffd400": "border-[#ffd400]",
    "#f91880": "border-[#f91880]",
    "#7856ff": "border-[#7856ff]",
    "#ff7a00": "border-[#ff7a00]",
    "#00ba7c": "border-[#00ba7c]",
  };

  // Get the current tab indicator color from Redux state.
  const currentTabIndicatorColor = useSelector((state) => state.color.color);

  // Update the selected tab and notify the parent component if needed.
  useEffect(() => {
    if (onTabSelect !== undefined) {
      onTabSelect(tabLabels[selectedTab]);
    }
  }, [selectedTab]);

  // Update the tab indicator position when the list of tab labels changes.
  useEffect(() => {
    const selectedTabElement = document.getElementById(tabLabels[selectedTab]);
    setIndicatorPosition({ width: selectedTabElement.offsetWidth, left: selectedTabElement.offsetLeft });
  }, [tabLabels]);

  return (
    <nav className={"border-b pb-0.5 border-[#1d9bf0]/[.1] dark:border-[#ffffff]/[.3] overflow-hidden  relative"}>
      <ul className="flex">
        {tabLabels.map((label, index) => (
          <Fragment key={index}>
            <li
              className={'text-center py-3 cursor-pointer dark:hover:bg-[#ffffff]/[.15] hover:bg-[#E6E7E7]/[.6] transition-all duration-300 w-[100%]'}
              onClick={() => {
                if (selectedTab !== index) {
                  setSelectedTab(index);
                }
              }}
            >
              <span
                id={label}
                className={selectedTab === index ? ('dark:text-[#ffffff]  py-3.5 ' + tabIndicatorColors[currentTabIndicatorColor] + ' text-md font-chirp') : 'py-3.5 text-[#7A8791] text-md font-chirp'}
              >
                {label}
              </span>
            </li>
          </Fragment>
        ))}
      </ul>
      <hr
        className={"border-t-8 absolute transition-all duration-300 " + tabIndicatorColors[currentTabIndicatorColor]}
        style={{ width: `${indicatorPosition.width}px`, left: `${indicatorPosition.left}px` }}
      />
    </nav>
  );
}

export default TabNavigation;

  