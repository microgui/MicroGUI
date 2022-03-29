import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import Home from './pages/Home'
import Simulator from './pages/Simulator'
import Error from './pages/Error'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='simulator' element={<Simulator />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))