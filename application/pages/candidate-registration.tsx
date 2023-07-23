import React, { useContext, useState } from 'react'
import { Backdrop, MenuItem, Select, Grid, TextField, CircularProgress, Button, Typography, List, ListItem, ListItemText, Slide } from '@mui/material'
import { VoteCounterCard } from '../components'
import { StyledList, StyledTextField, StyledListItem, StyledMenuItem, StyledSuccessBox } from '../styles/newElectionStyle'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { StyledSelect, StyledChildBox, StyledSubmitBtn, StyledTypography } from '../styles/newElectionStyle';
import { AuthorityContext } from '../context/AuthorityContext';
import CancelIcon from '@mui/icons-material/Cancel';

function CandidateRegistration() {
    const { upComingElection, isCandidateRegistered, registerCandidateCall, isCandidateRegistrationLoading } = useContext(AuthorityContext);
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
                            onChange={handleOnChange}
                            value={candidateDetails.electionID}
                            name='electionID'
                            displayEmpty
                        >
                            <StyledMenuItem value={""} disabled><em>Please Select one Election</em></StyledMenuItem>
                            {
                                upComingElection.map((elections: any, index: any) => {
                                    const { election, electionId } = elections
                                    const { name } = election
                                    return <StyledMenuItem value={electionId} key={index}>{name}</StyledMenuItem>
                                })
                            }
                        </StyledSelect>
                    </StyledChildBox>

                    <StyledChildBox>
                        <StyledTypography>Candidate&apos;s Name</StyledTypography>
                        <StyledTextField onChange={handleOnChange} name='name' placeholder='Enter candidate name' type='text' />
                    </StyledChildBox>
                    <StyledChildBox>
                        <StyledTypography>Enter Candidate NID</StyledTypography>
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

            <Slide direction="up" in={isCandidateRegistered} mountOnEnter unmountOnExit>
                <StyledSuccessBox>
                    <Typography color={'white'}>Successful</Typography>
                    <CancelIcon sx={{ cursor: 'pointer' }} />
                </StyledSuccessBox>
            </Slide>



            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isCandidateRegistrationLoading}>
                <CircularProgress sx={{ color: "gray" }} />
            </Backdrop>
        </>
    )
}

export default CandidateRegistration