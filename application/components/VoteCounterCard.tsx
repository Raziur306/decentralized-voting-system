import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { StyledCounterBox } from '../styles/voterStyles'
function VoteCounterCard() {
    return (
        <StyledCounterBox>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Avatar />
                <Typography variant='h5' sx={{ color: 'white' }} >Candidate Name</Typography>
            </Box>
            <Typography variant='h5' sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>32154</Typography>
        </StyledCounterBox >
    )
}

export default VoteCounterCard