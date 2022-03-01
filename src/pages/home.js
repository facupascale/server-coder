import React, { useState } from 'react';
import Products from './products'

export default function Home() {

    const [user, setUser] = useState('')

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '3%'}}> 
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                <button onClick={() => setUser('Admin')} style={{ marginRight: '1%'}}>Admin</button>
                <button onClick={() => setUser('Client')} style={{ marginLeft: '1%'}}>Client</button>
            </div>
            <Products user={user}/>
        </div>
    )
}