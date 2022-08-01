import { Routes, Route, HashRouter } from "react-router-dom"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './index.css'
import Home from './pages/Home'
import Editor from './pages/Editor'
import Simulator from './pages/Simulator'
import Remote from './pages/Remote'
import Error from './pages/Error'

import ReactDOM from 'react-dom'

export default function App() {
    return (
        // enables react-dnd functionality
        <DndProvider backend={HTML5Backend} >
            {/* Routes to the different pages of the app,
                returns an 'error-page' if the wrong path is provided */}
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='editor' element={<Editor />} />
                    <Route path='simulator' element={<Simulator />} />
                    <Route path='remote' element={<Remote />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </HashRouter>
        </DndProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))