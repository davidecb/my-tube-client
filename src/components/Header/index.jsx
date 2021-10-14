import { Link, useHistory } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { BiVideoPlus } from 'react-icons/bi';
import { FaUserNinja } from 'react-icons/fa';
import { useState } from 'react';
import './Header.scss';

function Header({ user }) {
    const [searchParams, setSearchParams] = useState('')
    const history = useHistory();

    const searchVideos = () => {
        const route = `/home?searchParams=${searchParams}`
        history.push(route)
    }

    return (
        <header className="header">            
            <Link to='/home'>         
                <div className="header__logo">MyTube</div>
            </Link>    
            <div className="header__searchBar searchBar">
                <input 
                    className="searchBar__input textInput" 
                    placeholder="Search..." 
                    onChange={(e) => setSearchParams(e.target.value)}
                />
                <div className="searchBar__logoContainer defaultIconButton">
                    <FiSearch className="searchBar__logo defaultLogo" onClick={searchVideos} />
                </div>
            </div>
            <div className="header__profile profile">
                {user && 
                    <Link to='/videos/upload'>                
                        <div className="header__addVideo defaultIconButton">
                            <BiVideoPlus className="header__addVideoLogo defaultLogo" />
                        </div>
                    </Link>
                }                               
                {!user &&
                    <Link to='/users/signin'> 
                        <div className="profile__signIn defaultButton">Sign In</div>
                    </Link>
                }
                {user && 
                    <Link to={`/users/me/${user.user._id}`}> 
                        <div className="profile__me">
                            <FaUserNinja className="profile__meLogo defaultLogo" />
                        </div>
                    </Link>
                }
            </div> 
        </header>
    );
}

export default Header;