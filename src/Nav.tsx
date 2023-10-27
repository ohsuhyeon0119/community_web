import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { AiFillHome } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { BsChatLeftText } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { BiSolidUser } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
export function Nav() {
  const { params } = useParams();
  console.log('params:', params);
  return (
    <div className="Nav">
      <IconContext.Provider value={{ size: '50px' }}>
        <div className="homeContainer">
          <Link style={{ color: 'black' }} to="/">
            <AiFillHome></AiFillHome>
          </Link>
        </div>
        <div className="boardsContainer">
          <Link to="boards" style={{ color: 'black' }}>
            <BsChatLeftTextFill></BsChatLeftTextFill>
          </Link>
        </div>
        <div className="userContainer">
          <Link to="user" style={{ color: 'black' }}>
            <BiSolidUser></BiSolidUser>
          </Link>
        </div>
      </IconContext.Provider>
    </div>
  );
}
