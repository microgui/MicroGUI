import { useEditor } from '@craftjs/core'
import { Button as MaterialButton, IconButton, Tooltip } from '@mui/material'

import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SaveAltIcon from '@mui/icons-material/SaveAlt'

/**
 * Creates a toolbar for various tools related to the 
 * canvas, such as redo etc.
 * @returns The 'Toolbar' component
 */
export const Toolbar = () => {
    const { actions, enabled, query } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    return (
        <div className='toolbar'>
            <div className='undoRedoButtons'>
                <Tooltip
                    title='Undo'
                >
                    <IconButton
                        onClick={() => {
                            try {
                                actions.history.undo()
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                    >
                        <UndoIcon
                            style={{
                                color: 'grey',
                                cursor: 'pointer'
                            }}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title='Redo'
                >
                    <IconButton
                        onClick={() => {
                            try {
                                actions.history.redo()
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                    >
                        <RedoIcon
                            style={{
                                color: 'grey',
                                cursor: 'pointer'
                            }}
                        />
                    </IconButton>
                </Tooltip>
            </div>
            <div className='simulateJsonButtons' style={{ padding: '5px' }}>
                <MaterialButton
                    size='small'
                    variant='contained'
                    color='info'
                    style={{
                        maxWidth: '115px', maxHeight: '35px',
                        minWidth: '95px', minHeight: '25px'
                    }
                    }
                    disableElevation
                    onClick={() => {
                        actions.setOptions((options) => (options.enabled = !enabled))
                    }}
                >
                    <PlayCircleOutlineIcon style={{ padding: '2px' }} /> 
                    {enabled ? 'Preview' : 'Edit'}
                </MaterialButton>
                <MaterialButton
                    size='small'
                    variant='contained'
                    color='success'
                    /* 'query.serialize' serializes the state of the canvas
                     into a JSON string. This can be used to recreate the
                     state of the canvas. */
                    onClick={() => {
                        console.log(query.serialize())
                    }}
                    style={{
                        margin: '5px', maxWidth: '70px',
                        maxHeight: '35px', minWidth: '80px',
                        minHeight: '25px'
                    }
                    }
                    disableElevation
                >
                    <SaveAltIcon style={{ padding: '2px' }} /> 
                    JSON
                </MaterialButton>
            </div>
        </div>
    )
}