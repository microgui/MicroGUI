import { TextField, Stack, Button } from '@mui/material';

export default function CanvasSize(props) {
    
    var width=400, height=300

    const getValues = () => {
        props.resize(width,height)
    }

    return (
        <Stack spacing={2} direction="row" >
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
                onChange = {(event)=>{width = event.target.value}}
            />
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
                onChange = {(event)=>{height = event.target.value}}
            />
            <Button 
                variant='outlined' 
                onClick={getValues}            
            > Update
            </Button>
        </Stack>
    )
}