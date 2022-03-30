import { useEditor } from '@craftjs/core'
import {
    Button as MaterialButton,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Grid,
    Divider
} from '@mui/material'

import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CloseIcon from '@mui/icons-material/Close';

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

    const [copied, setCopied] = useState(false)
    const [openOuter, setOpenOuter] = useState(false)
    const [openInner, setOpenInner] = useState(false)
    const [formText, setFormText] = useState('')
    const [error, setError] = useState(false)

    const handleOpenOuter = () => {
        setOpenOuter(true)
    }
    const handleOpenInner = () => {
        setOpenInner(true)
    }
    const handleClose = () => {
        setOpenOuter(false)
        setOpenInner(false)
        setCopied(false)
        setFormText('')
        setError(false)
    }

    const saveFile = (data, name) => {
        if (formText !== '') {
            const file = new File([JSON.stringify(JSON.parse(data), null, 4)], `${name}.json`, { type: 'text/json;charset=utf-8' })
            saveAs(file)
            handleClose()
        }
        if (formText === '') setError(true)
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
                        handleOpenOuter()
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
                    Save
                </MaterialButton>
                <Dialog open={openOuter} onClose={handleClose} fullWidth={true} maxWidth='xs' >
                    <DialogTitle>
                        Save data
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: 'grey'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Divider />
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1} align='center'>
                            <Grid item xs={6}>
                                <h4>Copy to clipboard</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <h4>Save as .json file</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <MaterialButton
                                    variant='outlined'
                                    disabled={copied}
                                    onClick={() => {
                                        navigator.clipboard.writeText(query.serialize())
                                        setCopied(true)
                                    }}
                                > {copied ? 'Copied' : 'Copy'}
                                </MaterialButton>
                            </Grid>
                            <Grid item xs={6}>
                                <MaterialButton
                                    variant='outlined'
                                    onClick={() => handleOpenInner()}
                                > Save
                                </MaterialButton>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <Dialog open={openInner} onClose={handleClose} fullWidth={true} maxWidth='xs' >
                    <DialogTitle>
                        Save file
                        <Divider />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a file name here. It will be saved as .json
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="File name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                                setError(false)
                                setFormText(e.target.value)
                            }}
                            error={error}
                            helperText={error ? "Name can't be empty" : null}
                        />
                    </DialogContent>
                    <DialogActions>
                        <MaterialButton onClick={handleClose}>Cancel</MaterialButton>
                        <MaterialButton onClick={() => saveFile(query.serialize(), formText)}
                        > Save
                        </MaterialButton>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}