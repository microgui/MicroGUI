import { useEditor } from '@craftjs/core'
import {
    Button as MaterialButton,
    IconButton,
    Tooltip,
    Stack
} from '@mui/material'

import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

import { Link } from 'react-router-dom'

import { ToolbarClear } from './ToolbarClear'
import { ToolbarSave } from './ToolbarSave'
import { ToolbarLoad } from './ToolbarLoad'

/**
 * Creates a toolbar for various tools related to the 
 * canvas, such as redo etc.
 * @returns The 'Toolbar' component
 */
export const Toolbar = () => {
    const { canUndo, canRedo } = useEditor((state, query) => ({
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo()
    }))
    const { actions, query } = useEditor()

    return (
        <div className='toolbar'>
            <Stack direction='row'>
                <Tooltip
                    title='Undo'
                >
                    <span
                        style={{cursor: canUndo ? 'pointer' : 'not-allowed'}}
                    >
                        <IconButton
                            disabled={!canUndo}
                            onClick={() => {
                                try {
                                    actions.history.undo()
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                        >
                            <UndoIcon
                                sx={{color: 'grey'}}
                            />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip
                    title='Redo'
                >
                    <span
                        style={{cursor: canRedo ? 'pointer' : 'not-allowed'}}
                    >
                        <IconButton
                            disabled={!canRedo}
                            onClick={() => {
                                try {
                                    actions.history.redo()
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                        >
                            <RedoIcon
                                sx={{color: 'grey'}}
                            />
                        </IconButton>
                    </span>
                </Tooltip>
                <ToolbarClear />
            </Stack>
            <Stack direction='row' spacing={0.7} sx={{ paddingRight: '10px' }}>
                <Link
                    to='/simulator'
                    target='_blank'
                    rel='noreferrer'
                    style={{ textDecoration: 'none' }}
                >
                    <MaterialButton
                        size='small'
                        variant='contained'
                        color='info'
                        disableElevation
                        onClick={() => {
                            localStorage.setItem('data', query.serialize())
                        }}
                    >
                        <PlayCircleOutlineIcon style={{ padding: '2px' }} />
                        Simulate
                    </MaterialButton>
                </Link>
                <ToolbarSave />
                <ToolbarLoad />
            </Stack>
        </div>
    )
}