import React from 'react'
import { Box, Grid, TextField, Button } from '@mui/material'
import { VoteCounterCard } from '../components'
const Votes = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <Grid container justifyContent={'center'}>
                <Grid xs={5} item>
                    <Box>
                        <TextField />
                        <Button>Give Vote</Button>
                    </Box>
                </Grid>

                <Grid xs={5} item>
                    <Box>
                        <Grid container spacing={10} justifyContent={'center'}>
                            <Grid item>
                                <VoteCounterCard />
                            </Grid>
                            <Grid item>
                                <VoteCounterCard />
                            </Grid>
                            <Grid item>
                                <VoteCounterCard />
                            </Grid>
                        </Grid>


                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}

export default Votes