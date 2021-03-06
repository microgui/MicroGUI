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
    Divider,
    Grid,
    TextField,
    Alert,
    Snackbar
} from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton';


import UploadIcon from '@mui/icons-material/InstallMobile'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { setWS, ws } from '../../user/Utilities'

const theme = createTheme({
    palette: {
        yellow: {
            main: '#FBEE60',
            darker: '#053e85',
        },
    },
});

export const ToolbarUpload = () => {
    const [open, setOpen] = useState(false);

    const { query } = useEditor()
    const [openOuter, setOpenOuter] = useState(false)
    const [loading, setLoading] = useState(false);

    const [IP, setIP] = useState('')
    const [error, setError] = useState(false)

    let str = ''
    let ws_init = false

    let chunkSize = 1000
    let startPoint = 0
    let endPoint = chunkSize

    // Function to close all dialogs
    const handleClose = () => {
        setOpenOuter(false)
        setLoading(false);
        setError(false)
        if (ws_init) {
            ws_init = false
            ws.close()
        }
    }

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const RemoteConnect = () => {
        if (ws == null || !ws_init) {
            setLoading(true);
            setWS("ws://" + IP.trim() + "/ws")

            ws.addEventListener('error', function (event) {
                setError(true)
                setLoading(false);
            });

            ws.onopen = function () {
                ws_init = true
                startPoint = 0
                endPoint = chunkSize

                ws.send("newDocument")
            };

            ws.onmessage = function (event) {
                if (event.data === 'OK') {
                    let sub = str.substring(startPoint, endPoint)
                    if (sub) {
                        ws.send(sub)
                        startPoint += chunkSize
                        endPoint += chunkSize
                    } else {
                        ws.send("NEW DOCUMENT SENT")
                    }
                }
                if (event.data === 'NEW DOCUMENT RECEIVED') {
                    handleClose()
                    setOpen(true)
                }
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Snackbar open={open} autoHideDuration={4000} onClose={() => { setOpen(false) }} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert variant="filled" onClose={() => { setOpen(false) }} severity="success" sx={{ width: '100%' }}>
                    Remote GUI upload was successful!
                </Alert>
            </Snackbar>

            <MaterialButton
                size='small'
                variant='contained'
                color='yellow'
                onClick={() => {
                    setOpenOuter(true)
                    setError(false)
                }}
                disableElevation
            >
                <UploadIcon style={{ padding: '2px' }} />
                Upload
            </MaterialButton>
            <Dialog open={openOuter} onClose={handleClose} fullWidth={true} maxWidth='sm' >
                <DialogTitle>
                    Upload GUI remotely to display
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
                    This feature is useful for rapidly building and tweaking your GUI.<br />
                    Note: 'Make persistant' only works for smaller GUIs (below 4 kB).<br /><br />
                    <Grid container spacing={1} align='center' direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={6}>
                            <h4>Enter the IP of your display:</h4>
                        </Grid>
                        <Grid item xs={6} sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={IP}
                                type="text"
                                sx={{ paddingRight: '10px', paddingLeft: '10px' }}
                                onChange={(event) => {
                                    setIP(event.target.value)
                                    setError(false)
                                }}
                                error={error}
                                helperText={error ?
                                    'WebSocket connection failed'
                                    : null
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                                disabled={!IP}
                                variant='contained'
                                component='label'
                                endIcon={<SendIcon />}
                                onClick={() => {
                                    const doc = JSON.parse(query.serialize())
                                    doc["ROOT"]["props"]["persistant"] = checked
                                    str = JSON.stringify(doc).replaceAll('\\n', '').replaceAll('    ', '').replaceAll('<div>', '\n').replaceAll('</div>', '')
                                    RemoteConnect()
                                }}
                                loading={loading}
                                loadingPosition="end"
                            > Connect &amp; Send
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </ThemeProvider >
    )
}