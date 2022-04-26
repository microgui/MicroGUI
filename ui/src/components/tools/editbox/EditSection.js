import { useNode } from '@craftjs/core'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Divider,
} from '@mui/material'

export const EditSection = ({ title, props, summary, children }) => {
    const { nodeProps } = useNode((node) => ({
        nodeProps: props && props.reduce((res, key) => {
            res[key] = node.data.props[key] || null
            return res
        }, {}),
    }))

    return (
        <Accordion
            sx={{
                width: '100%',
                background: 'transparent',
                boxShadow: 'none'
            }}
        >
            <AccordionSummary >
                <Grid
                    container
                    alignItems='center'
                >
                    <Grid item xs={4}>
                        <h5 style={{ textAlign: 'left' }}>
                            {title}
                        </h5>
                    </Grid>
                    {summary && props ? (
                        <Grid item xs={8}>
                            <h5 style={{ color: 'grey', textAlign: 'right' }}>
                                {summary(
                                    props.reduce((acc, key) => {
                                        acc[key] = nodeProps[key]
                                        return acc
                                    }, {})
                                )}
                            </h5>
                        </Grid>
                    ) :
                        <Grid item xs={8}>
                            <h5 style={{ color: 'grey', textAlign: 'right' }}>
                                {summary}
                            </h5>
                        </Grid>
                    }
                </Grid>
            </AccordionSummary>
            <AccordionDetails >
                <Divider />
                <Grid
                    container
                    spacing={1}
                >
                    {children}
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}