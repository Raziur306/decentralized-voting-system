import React, { useContext, useState } from 'react'
import { Backdrop, MenuItem, Select, Grid, TextField, CircularProgress, Button, Typography, List, ListItem, ListItemText } from '@mui/material'
import { VoteCounterCard } from '../components'
import { StyledList, StyledTextField, StyledListItem, StyledMenuItem } from '../styles/newElectionStyle'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { StyledSelect, StyledChildBox, StyledSubmitBtn, StyledTypography } from '../styles/newElectionStyle';
import { AuthorityContext } from '../context/AuthorityContext';
function CandidateRegistration() {
    const { isCandidateRegistrationLoading, isCandidateRegistered, registerCandidateCall } = useContext(AuthorityContext);
    const [file, setFile] = useState(null);
    const [candidateDetails, setCandidateDetails] = useState({
        name: "",
        nid: "",
        symbolName: "",
        email: "",
        electionID: ""
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setCandidateDetails({
            ...candidateDetails,
            [name]: value
        })
    }

    const handleOnFileUpload = (e) => {
        setFile(e.target.files[0]);
    }


    const handleOnSubmit = () => {
        registerCandidateCall(candidateDetails, file);
    }



    return (
        <>
            <Grid sx={{ justifyContent: 'space-around', paddingTop: 8 }} container>
                <Grid item md={12}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: 'white', paddingBottom: 10 }} variant='h5'> Register Candidates</Typography>
                </Grid>
                <Grid item mx={6}>
                    <StyledList>
                        <StyledListItem sx={{ listStyle: 'none' }}><WarningAmberRoundedIcon sx={{ fontSize: 70, color: 'red' }} /><Typography variant='h4' sx={{ fontWeight: 'bold', color: 'red' }}>Be careful</Typography></StyledListItem>
                        <StyledListItem>
                            <ListItemText>Please be sure before register Candidates</ListItemText>
                        </StyledListItem>
                        <StyledListItem>
                            <ListItemText>You can&apos;t modify after confirmation.</ListItemText></StyledListItem>
                        <StyledListItem>
                            <ListItemText>Only authorized person have rights to register Candidates.</ListItemText>
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
                        <StyledTypography>Choose Symbol PNG</StyledTypography>
                        <StyledTextField onChange={handleOnFileUpload} type='file' />
                    </StyledChildBox>
                    <StyledChildBox>
                        <StyledTypography>Enter Symbol Name</StyledTypography>
                        <StyledTextField onChange={handleOnChange} name='symbolName' type='text' placeholder='Enter symbol name' />
                    </StyledChildBox>
                    <StyledSubmitBtn onClick={handleOnSubmit} sx={{ bgcolor: 'green!important' }}>Register Voter</StyledSubmitBtn>
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isCandidateRegistrationLoading}>
                <CircularProgress sx={{ color: "gray" }} />
            </Backdrop>
        </>
    )
}

export default CandidateRegistration