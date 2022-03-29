import { useEditor } from '@craftjs/core'
import {
    Button as MaterialButton,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid
} from '@mui/material'

import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { saveAs } from 'file-saver'

/**
 * Creates a toolbar for various tools related to the 
 * canvas, such as redo etc.
 * @returns The 'Toolbar' component
 */
export const Toolbar = () => {
    const { actions, enabled, query } = useEditor((state) => ({
        enabled: state.options.enabled
    }))

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const saveFile = (data) => {
        const file = new File([data], "test.json", {type:'text/json;charset=utf-8'})
        saveAs(file)
    }

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
                        style={{
                            maxWidth: '115px', maxHeight: '35px',
                            minWidth: '95px', minHeight: '25px'
                        }
                        }
                        disableElevation
                        onClick={() => {
                            localStorage.setItem('data', query.serialize())
                        }}
                    >
                        <PlayCircleOutlineIcon style={{ padding: '2px' }} />
                        Simulate
                    </MaterialButton>
                </Link>
                
                    <MaterialButton
                        size='small'
                        variant='contained'
                        color='success'
                        /* 'query.serialize' serializes the state of the canvas
                         into a JSON string. This can be used to recreate the
                         state of the canvas. */
                        onClick={() => {
                            console.log(query.serialize())
                            handleOpen()
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
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            Hey you!
                        </DialogTitle>
                        <DialogContent>
                            <Grid container>
                                <Grid item xs={6}>
                                    <h3>Copy to clipboard</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <h3>Save as .JSON file</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialButton 
                                        variant='outlined' 
                                        onClick={() => {navigator.clipboard.writeText(query.serialize())}}
                                    > Copy
                                    </MaterialButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialButton 
                                        variant='outlined'
                                        onClick={() => {saveFile(query.serialize())}}
                                    >Save
                                    </MaterialButton>
                                </Grid>  
                            </Grid>
                        </DialogContent>
                    </Dialog>
                
            </div>
        </div>
    )
}