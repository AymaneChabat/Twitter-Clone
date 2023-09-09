import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FinalMenu from '../../containers/homepage/menu';
import LastContainer from '../homepage/last-container';

function Template({element, w}) {
    const [page, setPage] = useState("home");
    const location = useLocation();

    useEffect(() => {
        setPage(location.pathname.slice(1,))
      }, [location]);

    return (
        <div className='flex h-screen overflow-hidden'>
            <FinalMenu w={w}/>
            {element}
            <LastContainer w={w} page={page}/>
        </div>
    )
}

export default Template;