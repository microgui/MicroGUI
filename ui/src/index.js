import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './index.css'
import Editor from './pages/Editor'
import Simulator from './pages/Simulator'
import Error from './pages/Error'

import ReactDOM from 'react-dom'

export default function App() {
    return (
        <DndProvider backend={HTML5Backend} >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Editor />} />
                    <Route path='simulator' element={<Simulator />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </DndProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))