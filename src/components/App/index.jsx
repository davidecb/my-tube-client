import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Header';
import Home from '../../pages/Home';
import Upload from '../../pages/Upload';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import MyProfile from '../../pages/MyProfile';
import Video from '../../pages/Video';
import './App.scss';
import MyVideos from '../../pages/MyVideos';

function App() {
    const [user, setUser] = useState('');
    const history = useHistory();

    useEffect(() => {
        if(!user) {
            const SSUser =  JSON.parse(sessionStorage.getItem('user'));
            if (SSUser) {
                setUser(SSUser)
            }          
        }
    }, [user])

    return (           
        <div className="App">
            <BrowserRouter>
                <Header user={user} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/videos/upload">
                        <Upload user={user} />
                    </Route>
                    <Route path="/users/signin">
                        <SignIn user={user} setUser={setUser} />
                    </Route>
                    <Route path="/users/signup">
                        <SignUp user={user} setUser={setUser} />
                    </Route>
                    <Route exact path="/users/me/:userIdentificator">
                        <MyProfile user={user} setUser={setUser} />
                    </Route>
                    <Route path="/video/:videoId">
                        {
                            ({ match }) => {
                                return (
                                    <Video videoId={match.params.videoId} user={user} setUser={setUser} />
                                )
                            }
                        }                        
                    </Route>
                    <Route path="/users/me/:userIdentificator/myvideos">
                        <MyVideos user={user} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>        
        
    );
}

export default App;
