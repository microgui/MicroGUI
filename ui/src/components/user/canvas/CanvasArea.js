import { useNode } from '@craftjs/core'
import { Box } from '@mui/material'
import { useDrop } from 'react-dnd'

import { CanvasAreaSettings } from './CanvasAreaSettings'

export const CanvasArea = ({ background, image, width, height, children }) => {

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
                    backgroundImage: image ? `url(${image})` : (background ? null : 'radial-gradient(#e2e2e2 20%, #fff 20%)'),
                    backgroundSize: image ? `${width}px ${height}px` : (background ? null: '10px 10px'),
                    position: 'relative',
                    transition: 'width 0.8s, height 0.8s'
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