import React, { useContext, useState, useEffect } from 'react'
import { Backdrop, Select, Grid, CircularProgress, Button, Typography, List, ListItem, ListItemText } from '@mui/material'
import { VoteCounterCard } from '../components'
import { StyledList, StyledTextField, StyledListItem, StyledMenuItem } from '../styles/newElectionStyle'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { StyledSelect, StyledChildBox, StyledSubmitBtn, StyledTypography } from '../styles/newElectionStyle';
import { AuthorityContext } from '../context/AuthorityContext';

const RegisterVoters = () => {
    const { electionList, isVoterRegistered, registerVoterCall, isVoterRegistrationLoading } = useContext(AuthorityContext)
    const [voterDetails, setVoterDetails] = useState({
        electionID: null,
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
                        <StyledTypography>Please select one election</StyledTypography>
                        <StyledSelect
                            displayEmpty
                        >
                            <StyledMenuItem disabled><em>Please Select one Election</em></StyledMenuItem>
                        </StyledSelect>
                    </StyledChildBox>

                    <StyledChildBox>
                        <StyledTypography>Voter&apos;s Name</StyledTypography>
                        <StyledTextField onChange={handleOnChange} name='name' placeholder='Enter Election name' type='text' />
                    </StyledChildBox>
                    <StyledChildBox>
                        <StyledTypography>Enter Voter NID</StyledTypography>
                        <StyledTextField onChange={handleOnChange} name='nid' type='number' placeholder='NID number' />
                    </StyledChildBox>
                    <StyledChildBox>
                        <StyledTypography>Enter Voter Email</StyledTypography>
                        <StyledTextField name='email' onChange={handleOnChange} type='email' placeholder='example@email.com' />
                    </StyledChildBox>
                    <StyledSubmitBtn onClick={handleOnSubmit} sx={{ bgcolor: 'green!important' }}>Register Voter</StyledSubmitBtn>
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isVoterRegistrationLoading}>
                <CircularProgress sx={{ color: "gray" }} />
            </Backdrop>
        </>)
}

export default RegisterVoters