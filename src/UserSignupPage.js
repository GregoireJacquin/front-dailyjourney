import React, { useState } from 'react'

const actionDefault = {postSignup : () => Promise.resolve({})};

const UserSignupPage = ({actions = actionDefault}) => {

    const [displayname,setDisplayname] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [repeatPassword,setRepeatPassword] = useState('');
    const OnClickSignup = () => {
        const user = {
            username: username,
            displayname: displayname,
            password: password
        }
        actions.postSignup(user);
    }
    return (
        <div>
            <h1>Sign up</h1>
            <div>
                <input placeholder='Your display name' value={displayname} onChange={e => setDisplayname(e.target.value)}/>
                <input placeholder='Your username' value={username} onChange={e => setUsername(e.target.value)}/>
                <input type='password' placeholder='Your password' value={password} onChange={e => setPassword(e.target.value)}/>
                <input type='password' placeholder='Repeat your password' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
                <button onClick={() => OnClickSignup()}>Sign up</button>
            </div>
        </div>
    )
}


export default UserSignupPage