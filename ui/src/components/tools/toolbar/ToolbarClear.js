import { useState } from 'react'
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
    Divider,
} from '@mui/material'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'

export const ToolbarClear = () => {

    const { canUndo, canRedo } = useEditor((state, query) => ({
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo()
    }))

    const { actions, query } = useEditor()

    const [open, setOpen] = useState(false)

    const clearCanvas = () => {
        var nodes = query.getSerializedNodes()
        for (let key in nodes) {
            if (key !== 'ROOT') {
                actions.delete(key);
            } else {
                actions.setProp(key, (props) => {
                    props.background = null
                })
            }
        }
        setOpen(false)
    }
    return (
        <>
            <Tooltip
                title='Clear all'
            >
                <span
                    style={{cursor: (canUndo || canRedo) ? 'pointer' : 'not-allowed'}}   
                >
                    <IconButton
                        onClick={() => {
                            setOpen(true)
                        }}
                        disabled={!(canUndo || canRedo)}
                    >
                        <HighlightOffIcon
                            sx={{color: 'grey'}}
                        />
                    </IconButton>
                </span>
            </Tooltip>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} maxWidth='xs'>
                <DialogTitle>
                    Warning!
                    <Divider />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action will delete all of your progress! <br />
                        Do you wish to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButton variant='contained' onClick={() => setOpen(false)}>Cancel</MaterialButton>
                    <MaterialButton variant='outlined' onClick={clearCanvas}>Confirm</MaterialButton>
                </DialogActions>
            </Dialog>
        </>
    )
}