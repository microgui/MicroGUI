import { useNode } from '@craftjs/core'
import { Box } from '@mui/material'
import { useDrop } from 'react-dnd'

import { CanvasAreaSettings } from './CanvasAreaSettings'
import image from '../../../jarjar.png'

export const CanvasArea = ({ background, width, height, children }) => {

    const [, dropTarget] = useDrop({
        accept: "component",
        drop(item, monitor) {
            const offset = monitor.getClientOffset();
            if (offset) {
                const dropTargetXy = document.getElementById('canvasElement').getBoundingClientRect();
                return ({
                    x: parseInt(offset.x - dropTargetXy.left),
                    y: parseInt(offset.y - dropTargetXy.top)
                })
            }
        }
    })

    const { connectors: { connect } } = useNode()

    return (
        <div ref={dropTarget}>
            <Box
                ref={connect}
                id='canvasElement'
                sx={{
                    width: parseInt(width),
                    height: parseInt(height),
                    backgroundColor: background ? `rgba(${Object.values(background)})` : null,
                    backgroundImage: background ? null : 'radial-gradient(#e2e2e2 20%, #fff 20%)',
                    //backgroundImage: "url(" + image + ")",
                    backgroundPosition: background ? null : '0 0',
                    backgroundSize: background ? null : '10px 10px',
                }}
            >
                {children}
            </Box>
        </div>
    )
}

CanvasArea.craft = {
    displayName: 'Canvas',
    props: {
        id: 'canvasElement',
        width: '400',
        height: '400'
    },
    related: {
        toolbar: CanvasAreaSettings
    }
}