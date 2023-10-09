import { AnalyticsIcon, AdsIcon, SettingsIcon, HelpIcon, DataIcon, DisplayIcon, KeyboardIcon, LogoutIcon } from '../icons/menu';
import DropdownButton from '../buttons/dropdown';

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
