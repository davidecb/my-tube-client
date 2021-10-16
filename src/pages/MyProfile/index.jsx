import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from '../../common/api/config'
import './MyProfile.scss';

function MyProfile({ user, setUser }) {
    const history = useHistory();

    const deleteUser = () => {
        const url = '/api/users/me';

        axios.delete(url, {
            headers: {
              'Authorization': `Bearer ${user.token}` 
            }
          }).then(res => {
            sessionStorage.setItem('user', JSON.stringify(''));
            setUser('')
            setTimeout(() => {
                history.push("/");                 
            }, 2000)
        }).catch(err => {
            console.log(err);
        })
    }

    const myVideos = () => {
        const url = `/users/me/${user.user._id}/myvideos`
        history.push(url)
    }

    const logOut = () => {
        const url = '/api/users/logout';        
        axios.post(url, {}, {
            headers: {
              'Authorization': `Bearer ${user.token}` 
            }
          }).then(res => {
            sessionStorage.setItem('user', JSON.stringify(''));
            setUser('')
            setTimeout(() => {
                history.push("/");                 
            }, 2000)
        }).catch(err => {
            console.log(err);
        }) 
    }
    
    const logOutAll = () => {
        const url = '/api/users/logoutAll';        
        axios.post(url, {}, {
            headers: {
              'Authorization': `Bearer ${user.token}` 
            }
          }).then(res => {
            sessionStorage.setItem('user', JSON.stringify(''));
            setUser('')
            setTimeout(() => {
                history.push("/");                 
            }, 2000)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="myProfile">
            {user &&
                <div className="myProfile__form">                 
                    <div className="myProfile__titleContainer">
                        <label className="myProfile__title defaultTitle">Welcome</label>
                        <label className="myProfile__title defaultTitle">{user.user.name}</label>                
                    </div>                
                    <button 
                        className="myProfile__myVideos defaultButton"
                        onClick={myVideos}
                        >My Videos</button>
                    <button 
                        className="myProfile__logOutButton defaultButton"
                        onClick={logOut}
                        >Log Out</button>                
                    <button 
                        className="myProfile__logOutAllButton defaultButton"
                        onClick={logOutAll}
                        >Log Out all sessions</button>                
                    <button 
                        className="myProfile__deleteUser defaultButton"
                        onClick={deleteUser}
                        >Delete user</button>                
                </div>
            }
            {!user && 
                <div className="myProfile__logOutform">
                    <div className="myProfile__titleContainer">                
                        <label className="myProfile__title defaultTitle">See you soon</label>
                    </div>
                </div>
            }
        </div>
    );
}

export default MyProfile;