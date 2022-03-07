import { Button } from '@mui/material';

/**
 * A component for canvas clear button.
 * @returns A canvas clear button.
 */
export default function ClearCanvasButton(props) {
    /** Call clear method in parent component. */
    const clearCanvas = () => {
        props.clear()
    }

    return (
        /** A 'Clear' button. */
        <Button 
            variant='outlined' 
            onClick={clearCanvas}            
        > Clear
        </Button>
    )
}