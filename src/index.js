import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { createRoot } from 'react-dom/client';
import './index.css'
import Home from './pages/Home'
import Editor from './pages/Editor'
import Simulator from './pages/Simulator'
import Remote from './pages/Remote'
import Error from './pages/Error'

// import ReactDOM from 'react-dom' depcreated

// Use HashRouter instead of BrowserRouter if published to github-pages
// HashRouter worked while BrowserRouter did not

export default function App() {
    return (
        // enables react-dnd functionality
        <DndProvider backend={HTML5Backend} >
            {/* Routes to the different pages of the app,
                returns an 'error-page' if the wrong path is provided */}
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='editor' element={<Editor />} />
                    <Route path='simulator' element={<Simulator />} />
                    <Route path='remote' element={<Remote />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </DndProvider>
    )
}
const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(<App />)
// ReactDOM.render(<App />, document.getElementById('root')) depcreated, use createRoot instead