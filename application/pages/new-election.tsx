import { Grid, ListItem, List, Box, TextField, Typography, ListItemText } from '@mui/material'
import React from 'react'
import { StyledChildBox, StyledList, StyledListItem, StyledSubmitBtn, StyledTextField, StyledTypography } from '../styles/newElectionStyle'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

function NewElection() {
    return (
        <Grid sx={{ justifyContent: 'space-around' }} container>
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
                <Typography>Initialize Ballot</Typography>
                <StyledChildBox>
                    <StyledTypography>Election Name:</StyledTypography>
                    <StyledTextField placeholder='Enter Election name' type='text' />
                </StyledChildBox>
                <StyledChildBox>
                    <StyledTypography>Enter Election start Date & Time</StyledTypography>
                    <StyledTextField type='datetime-local' />
                </StyledChildBox>
                <StyledChildBox>
                    <StyledTypography>Enter Election end Date & Time</StyledTypography>
                    <StyledTextField type='datetime-local' />
                </StyledChildBox>
                <StyledSubmitBtn>Initialize</StyledSubmitBtn>
            </Grid>
        </Grid>
    )
}

export default NewElection