import { Grid, ListItem, List, Box, TextField, Typography, ListItemText, Backdrop, CircularProgress, Slide } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { StyledChildBox, StyledList, StyledListItem, StyledSubmitBtn, StyledSuccessBox, StyledTextField, StyledTypography } from '../styles/newElectionStyle'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { AuthorityContext } from '../context/AuthorityContext';
import CancelIcon from '@mui/icons-material/Cancel';


function NewElection() {
    const { isBallotInitialized, isBallotLoading, initializeBallot, } = useContext(AuthorityContext)
    const [backDropState, setBackDRopState] = useState(false);
    const [electionState, steElectionState] = useState({
        name: '',
        startTime: null,
        endTime: null
    });

    const handleNameChange = (e) => {
        const { value, name } = e.target;
        steElectionState({
            ...electionState,
            [name]: value
        })
    }

    const handleTimeChange = (e) => {
        const { value, name } = e.target;
        const dateValue = new Date(value);
        steElectionState({
            ...electionState,
            [name]: dateValue.getTime(),
        })

    }

    const handleOnSubmitBtn = () => {
        initializeBallot(electionState);
    }



    return (
        <>
            <Grid sx={{ justifyContent: 'space-around', paddingTop: 8 }} container>
                <Grid item md={12}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: 'white', paddingBottom: 10 }} variant='h5'> Initialize Ballot</Typography>
                </Grid>
                <Grid item mx={6}>
                    <StyledList>
                        <StyledListItem sx={{ listStyle: 'none' }}><WarningAmberRoundedIcon sx={{ fontSize: 70, color: 'red' }} /><Typography variant='h4' sx={{ fontWeight: 'bold', color: 'red' }}>Be careful</Typography></StyledListItem>
                        <StyledListItem>
                            <ListItemText>Please be sure before Initialize Ballot</ListItemText>
                        </StyledListItem>
                        <StyledListItem>
                            <ListItemText>You can&apos;t modify after confirmation.</ListItemText></StyledListItem>
                        <StyledListItem>
                            <ListItemText>Only authorized person have rights to Initialize Ballot.</ListItemText>
                        </StyledListItem>
                    </StyledList>
                </Grid>
                <Grid item mx={6}>
                    <StyledChildBox>
                        <StyledTypography>Election Name:</StyledTypography>
                        <StyledTextField value={electionState.name} autoComplete='off' name='name' onChange={handleNameChange} placeholder='Enter Election name' type='text' />
                    </StyledChildBox>
                    <StyledChildBox>
                        <StyledTypography>Enter Election start Date & Time</StyledTypography>
                        <StyledTextField name='startTime' onChange={handleTimeChange} type='datetime-local' inputProps={{
                            min: new Date().toISOString().slice(0, 16),
                        }} />
                    </StyledChildBox>
                    <StyledChildBox>
                        <StyledTypography>Enter Election end Date & Time</StyledTypography>
                        <StyledTextField onChange={handleTimeChange} name='endTime' type='datetime-local' inputProps={{
                            min: new Date().toISOString().slice(0, 16),
                        }} />
                    </StyledChildBox>
                    <StyledSubmitBtn onClick={handleOnSubmitBtn}>Initialize</StyledSubmitBtn>
                </Grid>
            </Grid>


            <Slide direction="up" in={isBallotInitialized} mountOnEnter unmountOnExit>
                <StyledSuccessBox>
                    <Typography color={'white'}>Successful</Typography>
                    <CancelIcon sx={{ cursor: 'pointer' }} />
                </StyledSuccessBox>
            </Slide>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isBallotLoading}>
                <CircularProgress sx={{ color: "gray" }} />
            </Backdrop>
        </>
    )
}

export default NewElection