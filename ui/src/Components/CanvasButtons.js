import {Button, Stack} from '@mui/material';

export default function CanvasButtons() {
    
    const simulate = "Wow! Such simulate!"
    const generate = "Nice generation bro!"

    return (
        <Stack spacing={2} direction="row" >
            <Button 
                variant='outlined' 
                onClick={() => {alert(simulate)}}            
            > Simulate
            </Button>
            <Button 
                variant='outlined'
                onClick={() => {alert(generate)}}
            > Generate
            </Button>
        </Stack>
    )
}
