import { Grid, Button } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import './ObjectsMenu.css'

const ObjectsMenu = props => {
    return (
        <Grid className="grid" container spacing={0} xs={6}>
            <Grid item xs={6}>
                <Button 
                    onClick={() => {
                        props.testLog()
                    }}
                >
                    One
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    onClick={() => {
                        props.other()
                    }}
                >
                    Two
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    onClick={() => {
                        props.btn()
                    }}
                >
                    <CheckBoxOutlineBlankIcon fontsize='small'/>
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button>Four</Button>
            </Grid>
            <Grid item xs={6}>
                <Button>Five</Button>
            </Grid>
            <Grid item xs={6}>
                <Button>Six</Button>
            </Grid>
        </Grid>
    );
}

export default ObjectsMenu