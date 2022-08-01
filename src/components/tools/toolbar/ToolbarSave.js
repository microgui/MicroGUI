import { useState } from 'react'
import { useEditor } from '@craftjs/core'
import {
    Button as MaterialButton,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Tooltip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Grid,
    Divider,
} from '@mui/material'

import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CloseIcon from '@mui/icons-material/Close'

import { saveAs } from 'file-saver'

export const ToolbarSave = () => {

    const { query } = useEditor()

    const [openOuter, setOpenOuter] = useState(false)
    const [openInner, setOpenInner] = useState(false)
    const [copied, setCopied] = useState(false)
    const [copiedString, setcopiedString] = useState(false)
    const [formText, setFormText] = useState('')
    const [error, setError] = useState(false)

    /* Function that saves the file representing the 
       canvas-state to downloads. The file is saved
       as a JSON file.*/
    const saveFile = (data, name) => {
        if (formText !== '') {
            const file = new File(
                [JSON.stringify(JSON.parse(data), null, 4)],
                `${name}.json`,
                { type: 'text/json;charset=utf-8' }
            )
            saveAs(file)
            handleClose()
        }
        if (formText === '') setError(true)
    }

    // Function to close all dialogs
    const handleClose = () => {
        setOpenOuter(false)
        setOpenInner(false)
        setCopied(false)
        setcopiedString(false)
        setError(false)
        setFormText('')
    }

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <MaterialButton
                size='small'
                variant='contained'
                color='success'
                onClick={() => { setOpenOuter(true) }}
                disableElevation
            >
                <SaveAltIcon style={{ padding: '2px' }} />
                Save
            </MaterialButton>
            <Dialog open={openOuter} onClose={handleClose} fullWidth={true} maxWidth='sm' >
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
                        <Grid item xs={4}>
                            <h4>Copy to clipboard</h4>
                            <h4>(json-format)</h4>
                        </Grid>
                        <Grid item xs={4}>
                            <h4>Copy to clipboard</h4>
                            <h4>(String-format)</h4>
                        </Grid>
                        <Grid item xs={4}>
                            <h4>Save as .json file</h4>
                        </Grid>
                        <Grid item xs={4}>
                            <MaterialButton
                                variant='outlined'
                                disabled={copied}
                                // copy the JSON data to the clipboard using craft.js functionality
                                onClick={() => {
                                    const doc = JSON.parse(query.serialize())
                                    doc["ROOT"]["props"]["persistant"] = checked
                                    navigator.clipboard.writeText(JSON.stringify(doc))
                                    setCopied(true)
                                }}
                            > {copied ? 'Copied' : 'Copy'}
                            </MaterialButton>
                        </Grid>
                        <Grid item xs={4}>
                            <MaterialButton
                                variant='outlined'
                                disabled={copiedString}
                                // copy the JSON data to the clipboard using craft.js functionality
                                onClick={() => {
                                    const doc = JSON.parse(query.serialize())
                                    doc["ROOT"]["props"]["persistant"] = checked
                                    navigator.clipboard.writeText(JSON.stringify(doc).replaceAll('\\n', '').replaceAll('"', '\\"').replaceAll('    ', '').replaceAll('<div>', '\\n').replaceAll('</div>', ''))
                                    setcopiedString(true)
                                }}
                            > {copiedString ? 'Copied' : 'Copy'}
                            </MaterialButton>
                        </Grid>
                        <Grid item xs={4}>
                            <MaterialButton
                                variant='outlined'
                                onClick={() => setOpenInner(true)}
                            > Save
                            </MaterialButton>
                        </Grid>
                    </Grid>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Tooltip title="If this is checked, the uploaded GUI will be stored in your display's persistant memory. That means the GUI persists and will be rendered on reboot."
                                    placement="top" arrow>
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                    />
                                </Tooltip>
                            }

                            label="Make persistant" />
                    </FormGroup>

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
                    {/* The saveFile function is called to save the serialized state
                        of the canvas. 'formText' being the user specified name
                        of the file. */}
                    <MaterialButton onClick={() => saveFile(query.serialize(), formText)}>Save</MaterialButton>
                </DialogActions>
            </Dialog>
        </>
    )
}