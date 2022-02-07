import React, { useRef, useEffect } from 'react'
import './Canvas.css';

/**
 * Canvas component holding objects.
 */
const Canvas = props => {
    /** Mutable ref of canvas. */
    const canvasRef = useRef()

    /** Runs upon rendering canvas in App. */
    useEffect(() => {
        /** Access canvas ref element. */
        const canvasElement = canvasRef.current
        /** Get 2D canvas drawing context. */
        const canvasContext = canvasElement.getContext('2d')
        /** Send context to draw function in App. */
        props.draw(canvasContext)
    }, [props.draw])

    /** Create canvas with ref. */
    return <canvas ref={canvasRef} />
}

export default Canvas