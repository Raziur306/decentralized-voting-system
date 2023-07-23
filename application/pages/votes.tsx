import React, { useState, useContext, useEffect } from 'react'
import { Box, Grid, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material'
import { VoteCounterCard } from '../components'
import { StyledList, StyledTextField, StyledListItem, StyledTitleTypography, StyledVotingBox, StyledVerifyBtn } from '../styles/stylesVotes'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { AuthorityContext } from '../context/AuthorityContext';
const Votes = () => {
    const { selectedElectionData, getElectionCandidate } = useContext(AuthorityContext);
    const [inputHash, setInputHash] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const { electionHash, electionName, startTime, endTime } = selectedElectionData;
    const [candidates, setCandidates] = useState([]);
    const currentTimestamp = Date.now();


    useEffect(() => {
        const data = getElectionCandidate(electionHash);
        setCandidates(data);
    }, [])




    const handleOnVerifyBtnClick = () => {
        if (!inputHash) {
            return setErrorStatus(true);
        }
        setErrorStatus(false);
    }
    const handleInputFieldChange = (e) => {
        setInputHash(e.target.value.trim());
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Grid container justifyContent={'center'} >
                <Grid xs={5} item>
                    <StyledVotingBox>
                        <StyledTitleTypography>Cast your vote for {electionName}</StyledTitleTypography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            <StyledTextField onChange={handleInputFieldChange} value={inputHash} error={errorStatus} placeholder='Enter your your hash..' disabled={(startTime > currentTimestamp) || (endTime < currentTimestamp)} />
                            <StyledVerifyBtn disabled={(startTime > currentTimestamp) || (endTime < currentTimestamp)} onClick={handleOnVerifyBtnClick}>Verify</StyledVerifyBtn>
                        </Box>
                        <StyledList>
                            <ListItem>
                                <Box sx={{ color: 'red', display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                                    <WarningAmberRoundedIcon sx={{ fontSize: 50 }} />
                                    <Typography fontWeight={'bold'} variant='h5'>Be careful.</Typography>
                                </Box>
                            </ListItem>
                            <StyledListItem>
                                <ListItemText>Exercise caution and careful deliberation before casting your vote.</ListItemText>
                            </StyledListItem>
                            <StyledListItem>
                                <ListItemText>Choose candidate to vote.</ListItemText>
                            </StyledListItem>
                            <StyledListItem>
                                <ListItemText>Once you confirm your selection, it cannot be modified.</ListItemText>
                            </StyledListItem>
                            <StyledListItem>
                                <ListItemText>The final results will be available after the voting period ends.</ListItemText>
                            </StyledListItem>
                        </StyledList>
                    </StyledVotingBox>
                </Grid>

                <Grid xs={5} item sx={{ display: 'flex', margin: 'auto' }}>
                    {
                        candidates?.length == 0 && <Typography>No data Found</Typography>

                    }

                    {(endTime < currentTimestamp && candidates?.length > 0) && <>
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


                    </>}

                    {(endTime > currentTimestamp) && <>
                        <Typography variant='h4' sx={{ color: 'orange', fontWeight: 'bold', textAlign: 'center' }}>
                            After the voting hours are over, the result will be announced.
                        </Typography>

                    </>
                    }
                </Grid>

            </Grid>
        </Box >
    )
}

export default Votes