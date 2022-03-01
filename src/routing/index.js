import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from '../pages/cart'
import Home from '../pages/home'

export default function Navigation() {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
        </Routes>
    )
}