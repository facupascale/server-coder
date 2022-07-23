import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Cart from '../pages/cart'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'

export default function Navigation() {

    return (
            <Routes>
                <Route exact path='/' element={<Navigate replace to='/login' />}/>
                <Route path='/home' element={<Home/>} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
    )
}