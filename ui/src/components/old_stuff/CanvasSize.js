import { TextField, Stack, Button } from '@mui/material';

/**
 * Creates textfields and a button for changing canvas size.
 * @returns A canvas resize component.
 */
export default function CanvasSize(props) {
    
    var width=400, height=300

    /** Call resize method from parent component. */
    const getValues = () => {
        props.resize(width,height)
    }

    return (
        /** Stack for holding textfields and button. */
        <Stack spacing={2} direction="row" >
            {/** Textfield for width input. */}
            <TextField
                id="outlined-number"
                label="Width (px)"
                type="number"
                placeholder='400'
                InputLabelProps={{
                    shrink: true,
                }}
                size = "small"
                sx = {{width:'13ch'}}
                onChange = {(event) => {width = event.target.value}}
            />
            {/** Textfield for height input. */}
            <TextField
                id="outlined-number"
                label="Height (px)"
                type="number"
                placeholder='300'
                InputLabelProps={{
                    shrink: true,
                }}
                size = "small"
                sx = {{width:'13ch'}}
                onChange = {(event) => {height = event.target.value}}
            />
            {/** Button that calls getValues method when clicked. */}
            <Button 
                variant='outlined' 
                onClick={getValues}            
            > Update
            </Button>
        </Stack>
    )
}