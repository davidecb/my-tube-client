import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../../common/api/config'
import './SignUp.scss';

function SignUp({ user, setUser }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    //const [user, setUser] = useState('');
    const history = useHistory();

    const createAccount = async () => {
        const data = {
            name,
            email,
            password
        };        
        const url = '/api/users/'
        //axios.get(url, config).then(res => console.log(res)).catch(err => console.log(err.message))
        axios.post(url, data, config).then(res => {
            console.log(res.data)
            sessionStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data)
            setTimeout(() => {
                history.push("/");
            }, 2000)
        }).catch(err => {
            console.log(err);
        })
        

    }

    return (
        <div className="signUp">
            { !user &&
                <div className="signUp__form">
                    <label className="signUp__title defaultTitle">Sign Up </label>
                    <label className="signUp__userLabel" for="signUp__name">Name:</label>
                    <input 
                        className="signUp__input textInput"
                        name="name"
                        id="signUp__name"
                        type="text" 
                        placeholder="Name..." 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="signUp__userLabel" for="signUp__email">Email:</label>
                    <input 
                        className="signUp__input textInput"
                        name="email"
                        id="signUp__email"
                        type="text" 
                        placeholder="Email..." 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="signUp__passwordLabel textInput" for="signUp__password">Password:</label>
                    <input 
                        className="signUp__input"
                        name="password" 
                        id="signUp__password" 
                        type="password" 
                        placeholder="Password..." 
                        onChange={(e) => setPassword(e.target.value)}
                    />                    
                    <button 
                        className="signUp__signUpButton defaultButton"
                        onClick={createAccount}
                    >Sign Up</button>
                </div>
            }
            { user &&
                <div className="signIn__welcomeMessage">
                    <label className="signIn__title defaultTitle">your account has been created!!</label>
                    <label className="signIn__title defaultTitle">Welcome!!</label>
                    <label className="signIn__title defaultTitle">{user.user.name}!! </label>
                </div>
            }
        </div>
    );
}

export default SignUp;