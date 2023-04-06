import EditIcon from '@mui/icons-material/Edit'
import LayersIcon from '@mui/icons-material/Layers';
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
            <div className="editContainer">
                <div className="editHeader">
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing={1}
                    >
                        <EditIcon style={{ color: 'grey' }} />
                        <h3 style={{ color: 'grey' }}>Edit</h3>
                    </Stack>
                </div>
                {active && related.toolbar && React.createElement(related.toolbar)}
                {!active && (
                    <p style={{ margin: '20px', fontWeight: 'normal' }}>Drag a component to the canvas area and click on it to start editing.</p>
                )}
            </div>
            <div className="editContainer">
                <div className="editHeader" >
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing={1}
                    >
                        <LayersIcon style={{ color: 'grey' }} />
                        <h3 style={{ color: 'grey' }}>Layers</h3>
                    </Stack>
                </div>
                {active && related.toolbar && React.createElement(related.toolbar)}
                {!active && (
                    <p style={{ margin: '20px', fontWeight: 'normal' }}>Drag a component to the canvas area and click on it to start editing.</p>
                )}
            </div>

        </div>
    )
} 