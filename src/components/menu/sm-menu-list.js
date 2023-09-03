import IconTwitter from '../icons/logos/twitter-icon';
import ListIcon from '../icons/menu/list';
import BookmarkIcon from '../icons/menu/bookmark';
import CommunityIcon from "../icons/menu/communities";
import ProfileIcon from '../icons/menu/profile';
import SMItem from "./sm-items";

function SMList() {

    const menu = [
        [<ProfileIcon picked={["",null]}/>,"Profile"],
        [<IconTwitter clas={"w-[26px]"}/>,"Verified"],
        [<ListIcon picked={["",null]}/>,"Lists"],
        [<BookmarkIcon picked={["",null]}/>,"Bookmarks"],
        [<CommunityIcon picked={["",null]}/>,"Communities"],
    ]

  return (
    <div className='flex flex-col xl:items-start '>
        <div className='h-[100%] flex flex-col justify-around mt-2 xl:items-start items-center'>
            <div className='w-[90%]'>
            {menu.map((pick, index) => (
                <a href='#'>
                <SMItem key={index} data={pick} />
                </a>
            ))}
            </div>
        </div>
    </div>
  );
}

export default SMList;
