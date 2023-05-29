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
  Divider
} from '@mui/material'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'

export const ToolbarClear = () => {
  const { canUndo, actions, query } = useEditor((_, query) => ({
    canUndo: query.history.canUndo()
  }))

  const [open, setOpen] = useState(false)

  /* Function that clears the canvas by iterating over all
       nodes currently in the canvas and deleting them one by one */
  const clearCanvas = () => {
    const nodes = query.getSerializedNodes()
    for (const key in nodes) {
      // making sure to not delete the ROOT(canvas)...
      if (key !== 'ROOT') {
        actions.delete(key)
      } else {
        // reset the canvas background/image
        actions.setProp(key, (props) => {
          props.background = null
          props.image = null
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
                    style={{ cursor: canUndo ? 'pointer' : 'not-allowed' }}
                >
                    <IconButton
                        onClick={() => {
                          setOpen(true)
                        }}
                        disabled={!canUndo}
                    >
                        <HighlightOffIcon
                            sx={{ color: 'grey' }}
                        />
                    </IconButton>
                </span>
            </Tooltip>
            {/* Open a dialog to make sure the user wants to clear the canvas */}
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
