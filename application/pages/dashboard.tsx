import { Box, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AuthorityContext } from '../context/AuthorityContext';
import { PreviousElectionCard, UpcomingElectionCard } from '../components';


const Dashboard = () => {
    const { previousElection, onGoingElection, upComingElection } = useContext(AuthorityContext);



    return (
        <>
            <Grid sx={{ color: 'white', pt: 10, gap: 20 }} container justifyContent={"center"} >
                <Grid item xs={5} justifyContent={'center'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant='h3' >Ongoing Elections</Typography>
                        <UpcomingElectionCard />
                        <UpcomingElectionCard />
                        <UpcomingElectionCard />
                    </Box>
                </Grid>
                <Grid item xs={5} justifyContent={'center'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant='h3' fontWeight={'bold'}>Previous Elections</Typography>
                        {
                            previousElection?.map((election: any, index: any) => {
                                const { name, hash, startTime, endTime } = election;
                                return <PreviousElectionCard electionHash={hash} electionName={name} startTime={startTime} endTime={endTime} key={index} />
                            })
                        }
                    </Box>
                </Grid>

            </Grid>
        </>)
}

export default Dashboard