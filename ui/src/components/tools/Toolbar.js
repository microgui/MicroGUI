import { useEditor } from '@craftjs/core'
import { Button as MaterialButton } from '@mui/material';
import { styled } from '@mui/material/styles';
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
    const { actions, query } = useEditor();

    return (
        <div className='toolbar'>
            <div className='undoRedoButtons' style={{padding:'5px', marginBottom: '-10px'}}>
                <UndoIcon 
                    style={{color:'grey', margin:'3px', 
                        maxWidth: '40px', maxHeight: '40px', 
                        minWidth: '25px', minHeight: '25px',
                        cursor: 'pointer'}
                    }
                    onClick={() => actions.history.undo()}
                />
                <RedoIcon 
                    style={{color:'grey', margin:'3px', 
                        maxWidth: '40px', maxHeight: '40px', 
                        minWidth: '25px', minHeight: '25px',
                        cursor: 'pointer'}
                    }
                    onClick={() => actions.history.redo()}
                />
            </div>
            <div className='simulateJsonButtons' style={{padding:'5px'}}>
                <MaterialButton 
                    size='small'
                    variant='contained'
                    color='info'
                    style={{maxWidth: '115px', maxHeight: '35px', 
                        minWidth: '95px', minHeight: '25px'}
                    }
                    disableElevation
                >
                    <PlayCircleOutlineIcon style={{padding:'2px'}}/> Preview
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
                    style={{margin:'5px', maxWidth: '70px', 
                        maxHeight: '35px', minWidth: '80px', 
                        minHeight: '25px'}
                    }
                    disableElevation
                >
                    <SaveAltIcon style={{padding:'2px'}}/> JSON
                </MaterialButton>
            </div>
        </div>
    );
};