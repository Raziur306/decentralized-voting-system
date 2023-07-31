import React, { useState, useContext, useEffect } from 'react'
import { Backdrop, CircularProgress, ButtonBase, Box, Grid, Button, Typography, List, ListItem, ListItemText, Dialog, Slide } from '@mui/material'
import { CandidateCardComponent, VoteCounterCard } from '../components'
import { StyledList, StyledTextField, StyledListItem, StyledTitleTypography, StyledVotingBox, StyledVerifyBtn } from '../styles/stylesVotes'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { AuthorityContext } from '../context/AuthorityContext';
import CloseIcon from '@mui/icons-material/Close';
import { StyledRadio } from '../styles/candidateStyle';
import { StyledSuccessBox } from '../styles/newElectionStyle';
import CancelIcon from '@mui/icons-material/Cancel';

const Votes = () => {
    const { selectedElectionData, getElectionCandidate, selectedElectionCandidate, giveVoteCall, voteCountStatus, setVoteCountStatus, isGivingVoteProcessLoading } = useContext(AuthorityContext);
    const [inputHash, setInputHash] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const { electionId, electionName, startTime, endTime } = selectedElectionData;
    const currentTimestamp = Date.now();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCandidateHash, setSelectedCandidateHash] = useState('');


    useEffect(() => {
        getElectionCandidate(electionId);
    }, [electionId])




    const handleOnVerifyBtnClick = () => {
        if (!inputHash) {
            setIsOpen(!isOpen);
            return setErrorStatus(true);
        }
        setErrorStatus(false);
    }
    const handleInputFieldChange = (e) => {
        setInputHash(e.target.value.trim());
    }

    const handleOnCloseBtn = () => {
        setIsOpen(!isOpen);
    }


    const handleOnSubmitBtn = () => {
        setIsLoading(true);
        giveVoteCall(electionId, inputHash, selectedCandidateHash)
    }

    const handleNotificationCancel = () => {
        setVoteCountStatus(false);
    }




    return (<>
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
                        selectedElectionCandidate?.length == 0 && <Typography>No data Found</Typography>

                    }

                    {(endTime < currentTimestamp && selectedElectionCandidate?.length > 0) && <>
                        <Grid container spacing={10} justifyContent={'center'}>
                            {
                                selectedElectionCandidate?.map((candidate: any, index: number) => {
                                    const { votes, name: candidateName, symbolImg } = candidate;
                                    return <Grid key={index} item>
                                        <VoteCounterCard key={index} candidateName={candidateName} symbolImage={symbolImg} votes={votes} />
                                    </Grid>
                                })
                            }
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



            <Dialog open={isOpen}>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 5, borderRadius: 5 }}>
                    <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'white' }}>Please Select Candidate to Vote</Typography>
                        <CloseIcon onClick={handleOnCloseBtn} sx={{ cursor: 'pointer', color: 'white' }} />
                    </Box>

                    {
                        selectedElectionCandidate?.map((candidate: any, index: number) => {
                            const { name: candidateName, hash, symbolName, symbolImg } = candidate;

                            return <Box key={index} sx={{ marginTop: 2, overflow: 'hidden', cursor: 'pointer', borderRadius: 2, boxShadow: '1px 0px 11px black' }}>
                                <ButtonBase onClick={() => { setSelectedCandidateHash(hash) }} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 2 }} component="div">
                                    <StyledRadio checked={hash == selectedCandidateHash} />
                                    <CandidateCardComponent candidateName={candidateName} symbolName={symbolName} symbolImg={symbolImg} />
                                </ButtonBase>
                            </Box>
                        })
                    }


                    <Button sx={{
                        marginTop: 10, color: 'white', bgcolor: 'red', padding: 1, '&:hover': {
                            bgcolor: 'rgb(223, 32, 32)'
                        }
                    }} onClick={handleOnSubmitBtn}>Submit</Button>
                </Box>

            </Dialog >


        </Box >
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isGivingVoteProcessLoading}>
            <CircularProgress sx={{ color: "gray" }} />
        </Backdrop>
        <Slide direction="up" in={voteCountStatus} mountOnEnter unmountOnExit>
            <StyledSuccessBox>
                <Typography color={'white'}>Successful</Typography>
                <CancelIcon onClick={handleNotificationCancel} sx={{ cursor: 'pointer' }} />
            </StyledSuccessBox>
        </Slide>
    </>
    )
}

export default Votes