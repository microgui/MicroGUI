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
import { ToolbarUpload } from './ToolbarUpload'
import { useEffect } from "react";

/**
 * Creates a toolbar for various tools related to the 
 * canvas, such as redo etc.
 */
export const Toolbar = () => {
    // check if undo/redo is possible using craft.js functionality.
    const { canUndo, canRedo } = useEditor((_, query) => ({
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo()
    }))
    const { actions, query } = useEditor()

    useEffect(() => {
        function handleKeyDown(event) {
            const isMac = /Mac/i.test(navigator.platform);
            if ((isMac && event.metaKey && event.key === "z") || (!isMac && event.ctrlKey && event.key === "z")) {
                // Call your undo function here
                try {
                    actions.history.undo()
                } catch (error) {
                    console.log(error)
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className='toolbar'>
            <Stack direction='row'>
                <Tooltip
                    title='Undo (Ctrl+Z or CMD+Z)'
                >
                    <span
                        style={{ cursor: canUndo ? 'pointer' : 'not-allowed' }}
                    >
                        <IconButton
                            // The button is disabled if there is nothing to undo 
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
                                sx={{ color: 'grey' }}
                            />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip
                    title='Redo'
                >
                    <span
                        style={{ cursor: canRedo ? 'pointer' : 'not-allowed' }}
                    >
                        <IconButton
                            // The button is disabled if there is nothing to redo 
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
                                sx={{ color: 'grey' }}
                            />
                        </IconButton>
                    </span>
                </Tooltip>

                {/* Renders the clear button of the toolbar */}
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
                        /* When the user clicks the 'simulate' button the state is serialized
                           using craft.js functionality and the data is saved in the 
                           browser's local storage. */
                        onClick={() => {
                            localStorage.setItem('data', query.serialize())
                        }}
                    >
                        <PlayCircleOutlineIcon style={{ padding: '2px' }} />
                        Simulate
                    </MaterialButton>
                </Link>

                {/* Renders the save/load buttons of the toolbar */}
                <ToolbarSave />
                <ToolbarLoad />
                <ToolbarUpload />
            </Stack>
        </div>
    )
}