import DropdownButton from '../buttons/dropdown';
import AnalyticsIcon from '../icons/menu/analytics';
import AdsIcon from '../icons/menu/ads';
import SettingsIcon from '../icons/menu/settings';
import HelpIcon from '../icons/menu/help';
import DataIcon from '../icons/menu/data';
import DisplayIcon from '../icons/menu/display';
import KeyboardIcon from '../icons/menu/keyboard';
import LogoutIcon from '../icons/menu/logout';

function Dropdowns() {

    const dropdown = [
        ["Creator Studio", [
                [<AnalyticsIcon />, "Analytics"]
            ]
        ],
        ["Professional Tools", [
                [<AdsIcon />, "Ads"]
            ]
        ],
        ["Settings and Support", [
                [<SettingsIcon margin={'mr-[12px]'}/>, "Settings and privacy"],
                [<HelpIcon />, "Help Center"],
                [<DataIcon />, "Data saver"],
                [<DisplayIcon />, "Display"],
                [<KeyboardIcon />, "Keyboard shortcuts"],
                [<LogoutIcon />, "Log out"]
            ]
        ]
    ]

  return (
            <div>
                {dropdown.map((item, index)=>(
                    <DropdownButton key={index} data={item}/>
                ))}
            </div>
  );
}

export default Dropdowns;
