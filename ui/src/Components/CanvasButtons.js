import { Button, Stack } from '@mui/material';

/**
 * A component for buttons 'Simulate' and 'Generate'.
 * @returns Buttons 'Simulate' and 'Generate'.
 */
export default function CanvasButtons() {
    
    const simulate = "Wow! Such simulate!"
    const generate = "Nice generation bro!"

    return (
        /** A stack for holding buttons. */
        <Stack spacing={2} direction="row" >
            {/** A 'Simulate' button. */}
            <Button 
                variant='outlined' 
                onClick={() => {alert(simulate)}}            
            > Simulate
            </Button>
            {/** A 'Generate' button. */}
            <Button 
                variant='outlined'
                onClick={() => {alert(generate)}}
            > Generate
            </Button>
        </Stack>
    )
}
