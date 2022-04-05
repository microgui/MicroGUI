import { useNode } from '@craftjs/core'
import { Box } from '@mui/material'

import { CanvasAreaSettings } from './CanvasAreaSettings'

export const CanvasArea = ({ background, width, height, children }) => {

    const { connectors: { connect } } = useNode()

    return (
        <Box
            ref={connect}
            id='canvasElement'
            sx={{ 
                width: parseInt(width), 
                height: parseInt(height),
                backgroundColor: background ? `rgba(${Object.values(background)})` : null,
                backgroundImage: background ? null : 'radial-gradient(#e2e2e2 20%, #fff 20%)',
                backgroundPosition: background ? null : '0 0',
                backgroundSize: background ? null : '10px 10px',
            }}
        >
            {children}
        </Box>
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