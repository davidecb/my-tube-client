import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../common/api/config'
import './SignIn.scss';

function SignIn({ user, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('some')
    //const [user, setUser] = useState('')
    const history = useHistory();

    const sendCredentials = async () => {
        const data = {
            email,
            password
        };        
        const url = '/api/users/login';
        //axios.get(url, config).then(res => console.log(res)).catch(err => console.log(err.message))
        axios.post(url, data, config).then(res => {
            console.log(res.data)
            setLoginStatus(true)
            sessionStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data)
            setTimeout(() => {
                history.push("/");                 
            }, 2000)
        }).catch(err => {
            console.log(err);
            setLoginStatus(false)
        })
    }

    return (
        <div className="signIn">
            { !user &&
                <div className="signIn__form">
                    <label className="signIn__title defaultTitle">Sign In </label>
                    {!loginStatus && <label className="signIn__wrongLogin">Wrong Email or password</label>}
                    <label className="signIn__userLabel" for="signIn__email">Email:</label>
                    <input 
                        className="signIn__input textInput"
                        name="email"
                        id="signIn__email"
                        type="text" 
                        placeholder="Email..." 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="signIn__passwordLabel textInput" for="signIn__password">Password:</label>
                    <input 
                        className="signIn__input"
                        name="password" 
                        id="signIn__password" 
                        type="password" 
                        placeholder="Password..." 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <button 
                        className="signIn__signInButton defaultButton"
                        onClick={sendCredentials}
                        >Sign In</button>
                    <label className="signIn__notAccount">Don't you have an account??</label>
                    <Link to='/users/signup'> 
                        <button className="signIn__signInButton defaultButton">Sign Up</button>
                    </Link>
                </div>
            }
            {setLoginStatus && user &&
                <div className="signIn__welcomeMessage">
                    <label className="signIn__title defaultTitle">Welcome</label>
                    <label className="signIn__title defaultTitle">{user.user.name}!! </label>
                </div>
            }
            </div>
    );
}

export default SignIn;