import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './index.css'
import Home from './pages/Home'
import Simulator from './pages/Simulator'
import Error from './pages/Error'

const container = document.getElementById('root')
const root = createRoot(container)

export default function App() {
    return (
        <DndProvider backend={HTML5Backend} >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='simulator' element={<Simulator />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </DndProvider>
    )
}

root.render(<App />)