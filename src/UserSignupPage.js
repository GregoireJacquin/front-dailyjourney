import React, { useState } from 'react'

const actionDefault = {postSignup : () => Promise.resolve({})};

const UserSignupPage = ({actions = actionDefault}) => {

    const [displayName,setDisplayName] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [repeatPassword,setRepeatPassword] = useState('');
    const OnClickSignup = () => {
        const user = {
            username: username,
            displayName: displayName,
            password: password
        }
        actions.postSignup(user);
    }
    return (
        <div className='container'>
            <h1 className='text-center'>Sign up</h1>
            <div className='col-12 mb-3'>
                <label>Display name</label>
                <input className='form-control' placeholder='Your display name' value={displayName} onChange={e => setDisplayName(e.target.value)}/>
                <label>Username</label>
                <input className='form-control' placeholder='Your username' value={username} onChange={e => setUsername(e.target.value)}/>
                <label>Password</label>
                <input className='form-control' type='password' placeholder='Your password' value={password} onChange={e => setPassword(e.target.value)}/>
                <label>Password Repeat</label>
                <input className='form-control' type='password' placeholder='Repeat your password' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
                <div className='text-center'>
                <button className='btn btn-primary' onClick={() => OnClickSignup()}>Sign up</button>
                </div>
            </div>
        </div>
    )
}


export default UserSignupPage