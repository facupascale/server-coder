import React from 'react'
import { userRegister } from '../services/userEndpoints'

const Register = () => {

    const [credentials, setCredentials] = React.useState({
        username: '',
        password: '',
        email: '',
        nombre: '',
        direccion: '',
        telefono: '',
        edad: '',
        foto: ''
    })

    const registro = async() => {
        try {
            const user = await userRegister(credentials)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='containerRegister'>
            <div>
                <h1>Register</h1>
                <form onSubmit={() => registro()}>
                    <div>
                        <label>
                            Username: 
                            <input type='text' placeholder='Enter username' value={credentials.username} onChange={(event) => setCredentials({...credentials, username: event.target.value})}/>
                        </label>
                        <label>
                            Password:
                            <input type='password' placeholder='Enter password' value={credentials.password} onChange={(event) => setCredentials({...credentials, password: event.target.value})}/>
                        </label>
                        <label>
                            Email:
                            <input type='text' placeholder='Enter your email' value={credentials.email} onChange={(event) => setCredentials({...credentials, email: event.target.value})}/>
                        </label>
                        <label>
                            Telefono:
                            <input type='text' placeholder='Enter your phone number' value={credentials.telefono} onChange={(event) => setCredentials({...credentials, telefono: event.target.value})}/>
                        </label>
                    </div>
                    <div>

                        <label>
                            Direccion:
                            <input type='text' placeholder='Enter your address' value={credentials.direccion} onChange={(event) => setCredentials({...credentials, direccion: event.target.value})}/>
                        </label>
                        <label>
                            Nombre:
                            <input type='text' placeholder='Enter your full name' value={credentials.nombre} onChange={(event) => setCredentials({...credentials, nombre: event.target.value})}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Edad:
                            <input type='text' placeholder='Enter your age' value={credentials.edad} onChange={(event) => setCredentials({...credentials, edad: event.target.value})}/>
                        </label>
                        <label>
                            Foto:
                            <input type='file' accept='image/*' placeholder='Upload your profile picture' value={credentials.foto} onChange={(event) => setCredentials({...credentials, foto: event.target.value})}/>
                        </label>
                    </div>
                    <div>
                        <input type='submit' value='Register' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register