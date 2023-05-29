import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { ElectionCard } from '../components'


function Dashboard() {
    return (
        <>
            <Grid sx={{ color: 'white', pt: 10, gap: 20 }} container justifyContent={"center"} >
                <Grid item xs={5} justifyContent={'center'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant='h3' >Ongoing Elections</Typography>
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                    </Box>
                </Grid>
                <Grid item xs={5} justifyContent={'center'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant='h3' fontWeight={'bold'}>Previous Elections</Typography>
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                        <ElectionCard />
                    </Box>
                </Grid>

            </Grid>
        </>)
}

export default Dashboard