import { Box, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AuthorityContext } from '../context/AuthorityContext';
import { OngoingElectionCard, PreviousElectionCard, UpcomingElectionCard } from '../components';


const Dashboard = () => {
    const { previousElection, onGoingElection, upComingElection } = useContext(AuthorityContext);

    return (
        <>
            <Grid sx={{ color: 'white', pt: 10, gap: 20 }} container justifyContent={"center"} >

                <Grid item xs={3} justifyContent={'center'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant='h4' fontWeight={'bold'}>Previous Elections</Typography>
                        {
                            previousElection?.map((electionList: any, index: any) => {
                                const { election, electionId } = electionList;
                                const { name, startTime, endTime } = election;
                                return <PreviousElectionCard electionId={electionId} electionName={name} startTime={startTime} endTime={endTime} key={index} />
                            })
                        }
                    </Box>
                </Grid>


                <Grid item xs={3} justifyContent={'center'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant='h4' fontWeight={'bold'}>Ongoing Election</Typography>
                        {
                            onGoingElection?.map((electionList: any, index: any) => {
                                const { election, electionId } = electionList;
                                const { name, startTime, endTime } = election;
                                return <OngoingElectionCard electionId={electionId} electionName={name} startTime={startTime} endTime={endTime} key={index} />
                            })
                        }
                    </Box>
                </Grid>

                <Grid item xs={3} justifyContent={'center'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant='h4' >Upcoming Elections</Typography>
                        {
                            upComingElection?.map((electionList: any, index: any) => {
                                const { election, electionId } = electionList;
                                const { name, startTime, endTime } = election;
                                return <UpcomingElectionCard electionId={electionId} electionName={name} startTime={startTime} endTime={endTime} key={index} />
                            })
                        }
                    </Box>
                </Grid>


            </Grid>
        </>)
}

export default Dashboard