import { useState } from 'react'
import { useEditor } from '@craftjs/core'
import {
    Button as MaterialButton,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Grid,
    TextField
} from '@mui/material'

import UploadIcon from '@mui/icons-material/Upload'
import CloseIcon from '@mui/icons-material/Close'

export const ToolbarLoad = () => {

    const { actions } = useEditor()

    const [openOuter, setOpenOuter] = useState(false)
    const [openInner, setOpenInner] = useState(false)
    const [pasteText, setPasteText] = useState('')

    const loadFile = (file) => {
        var reader = new FileReader()
        reader.onload = function (e) {
            actions.deserialize(e.target.result)
        }
        reader.readAsText(file, 'UTF-8')
        handleClose()
    }
    const loadText = (text) => {
        actions.deserialize(text)
        handleClose()
    }

    const handleClose = () => {
        setOpenOuter(false)
        setOpenInner(false)
        setPasteText('')
    }
    return (
        <>
            <MaterialButton
                size='small'
                variant='contained'
                color='warning'
                onClick={() => setOpenOuter(true)}
                disableElevation
            >
                <UploadIcon style={{ padding: '2px' }} />
                Load
            </MaterialButton>
            <Dialog open={openOuter} onClose={handleClose} fullWidth={true} maxWidth='xs' >
                <DialogTitle>
                    Load data
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
                            <h4>Paste from clipboard</h4>
                        </Grid>
                        <Grid item xs={6}>
                            <h4>Upload a .json file</h4>
                        </Grid>
                        <Grid item xs={6}>
                            <MaterialButton
                                variant='outlined'
                                onClick={() => setOpenInner(true)}
                            > Paste
                            </MaterialButton>
                        </Grid>
                        <Grid item xs={6}>
                            <MaterialButton
                                variant='outlined'
                                component='label'
                            > Upload
                                < input
                                    type="file"
                                    hidden
                                    onChange={(e) => loadFile(e.target.files[0])}
                                />
                            </MaterialButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog open={openInner} onClose={handleClose} fullWidth={true} maxWidth='xs' >
                <DialogTitle>
                    Paste data
                    <Divider />
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="pasteData"
                        label="Paste here"
                        type="text"
                        fullWidth
                        variant="standard"
                        spellCheck={false}
                        multiline
                        rows={6}
                        onChange={(e) => {
                            setPasteText(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <MaterialButton onClick={handleClose}>Cancel</MaterialButton>
                    <MaterialButton onClick={() => loadText(pasteText)}
                    > Load
                    </MaterialButton>
                </DialogActions>
            </Dialog>
        </>
    )
}