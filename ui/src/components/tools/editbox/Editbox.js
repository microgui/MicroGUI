import EditIcon from '@mui/icons-material/Edit'
import { Stack } from '@mui/material'
import { useEditor } from '@craftjs/core'
import React from 'react'

export const Editbox = () => {
    const { active, related } = useEditor((state, query) => {
        const currentlySelectedNodeId = query.getEvent('selected').first();
        return {
            active: currentlySelectedNodeId,
            related:
                currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
        }
    })
    
    return (
        <div className="editbox">
            <div className="editHeader">
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1}
                >
                    <EditIcon style={{ color: 'grey' }} />
                    <h2 style={{ color: 'grey' }}>Edit</h2>
                </Stack>
            </div>
            {active && related.toolbar && React.createElement(related.toolbar)}
            {!active && (
                <h3 style={{marginTop: '20px', fontWeight: 'normal'}}>Drag a component to the canvas area and click on it to start editing.</h3>
            )}
        </div>
    )
} 