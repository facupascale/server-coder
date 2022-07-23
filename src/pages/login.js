import React from 'react'
import './index.css'
import { userInfo, userLogin } from '../services/userEndpoints'
import { Navigate, Link } from 'react-router-dom'

export default function Login(){

    const [credentials, setCredentials] = React.useState({ username: '', password: '' })
    const [user, setUser] = React.useState({})
    const [appLoading, setAppLoading] = React.useState(true)
    const getInfo = async() => {
        try {
            const user = await userInfo()
            setUser(user)
            setAppLoading(!appLoading)
        } catch (error) {
            console.log(error)
        }
    }
    const login = async(credentials) => {
        try {
            const user = await userLogin(credentials)
            setAppLoading(!appLoading)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getInfo()
    },[])

    console.log(user)

    return (
        <>
        {user.succes === true && !appLoading ? 
            <Navigate to='/home' replace={true} /> : 
                <div className='containerLogin'>
                    <div>
                        <h1>Login</h1>
                        <form onSubmit={login}>
                            <label>Username: 
                                <input type='text' placeholder='Enter username' value={credentials.username} onChange={(event) => setCredentials({...credentials, username: event.target.value})}/>
                            </label>
                            <label>
                                Password:
                                <input type='password' placeholder='Enter password' value={credentials.password} onChange={(event) => setCredentials({...credentials, password: event.target.value})}/>
                            </label>
                            <div>
                                <input type='submit' value='Login' />
                                <Link to='/register'>Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
        }
        </>
    )
} 