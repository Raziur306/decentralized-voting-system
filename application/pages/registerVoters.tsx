import React, { useContext, useState, useEffect } from 'react'
import { Backdrop, Select, Grid, CircularProgress, Button, Typography, List, ListItem, ListItemText, Slide } from '@mui/material'
import { VoteCounterCard } from '../components'
import { StyledList, StyledTextField, StyledListItem, StyledMenuItem, StyledSuccessBox } from '../styles/newElectionStyle'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { StyledSelect, StyledChildBox, StyledSubmitBtn, StyledTypography } from '../styles/newElectionStyle';
import { AuthorityContext } from '../context/AuthorityContext';
import CancelIcon from '@mui/icons-material/Cancel';

const RegisterVoters = () => {
    const { setIsVoterEmailSent, isVoterEmailSent, upComingElection, isVoterRegistered, registerVoterCall, isVoterRegistrationLoading } = useContext(AuthorityContext)
    const [voterDetails, setVoterDetails] = useState({
        electionID: "",
        name: '',
        nid: null,
        email: ''
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setVoterDetails({
            ...voterDetails,
            [name]: value,
        })
    }

    const handleOnSubmit = (e) => {
        registerVoterCall(voterDetails);
    }
    const handleNotificationCancel = () => {
        setIsVoterEmailSent(false);
    }



    return (
        <>
            <Grid sx={{ justifyContent: 'space-around', paddingTop: 8 }} container>
                <Grid item md={12}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: 'white', paddingBottom: 10 }} variant='h5'> Register Voter</Typography>
                </Grid>
                <Grid item mx={6}>
                    <StyledList>
                        <StyledListItem sx={{ listStyle: 'none' }}><WarningAmberRoundedIcon sx={{ fontSize: 70, color: 'red' }} /><Typography variant='h4' sx={{ fontWeight: 'bold', color: 'red' }}>Be careful</Typography></StyledListItem>
                        <StyledListItem>
                            <ListItemText>Please be sure before register voters</ListItemText>
                        </StyledListItem>
                        <StyledListItem>
                            <ListItemText>You can&apos;t modify after confirmation.</ListItemText></StyledListItem>
                        <StyledListItem>
                            <ListItemText>Only authorized person have rights to register voters.</ListItemText>
                        </StyledListItem>
                    </StyledList>
                </Grid>
                <Grid item mx={6}>
                    <StyledChildBox>
                        <StyledTypography>Please select an election</StyledTypography>
                        <StyledSelect
                            onChange={handleOnChange}
                            value={voterDetails.electionID}
                            displayEmpty
                            name='electionID'
                        >
                            <StyledMenuItem value={""} disabled><em>Please Select</em></StyledMenuItem>
                            {
                                upComingElection?.map((electionList: any, index: any) => {
                                    const { election, electionId } = electionList
                                    const { name: electionName } = election
                                    return <StyledMenuItem value={electionId} key={index}>{electionName}</StyledMenuItem>
                                })
                            }
                        </StyledSelect>
                    </StyledChildBox>

                    <StyledChildBox>
                        <StyledTypography>Voter&apos;s Name</StyledTypography>
                        <StyledTextField autoComplete='off
                        ' onChange={handleOnChange} name='name' placeholder='Enter Election name' type='text' />
                    </StyledChildBox>
                    <StyledChildBox>
                        <StyledTypography>Enter Voter NID</StyledTypography>
                        <StyledTextField autoComplete='off' onChange={handleOnChange} name='nid' type='number' placeholder='NID number' />
                    </StyledChildBox>
                    <StyledChildBox>
                        <StyledTypography>Enter Voter Email</StyledTypography>
                        <StyledTextField autoComplete='off
                        ' name='email' onChange={handleOnChange} type='email' placeholder='example@email.com' />
                    </StyledChildBox>
                    <StyledSubmitBtn onClick={handleOnSubmit} sx={{ bgcolor: 'green!important' }}>Register Voter</StyledSubmitBtn>
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isVoterRegistrationLoading}>
                <CircularProgress sx={{ color: "gray" }} />
            </Backdrop>
            <Slide direction="up" in={isVoterEmailSent} mountOnEnter unmountOnExit>
                <StyledSuccessBox>
                    <Typography color={'white'}>Successful</Typography>
                    <CancelIcon onClick={handleNotificationCancel} sx={{ cursor: 'pointer' }} />
                </StyledSuccessBox>
            </Slide>
        </>)
}

export default RegisterVoters