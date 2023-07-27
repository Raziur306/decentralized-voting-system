import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { StyledCounterBox } from '../styles/voterStyles'
import { MediaRenderer } from '@thirdweb-dev/react'


function VoteCounterCard({ votes, candidateName, symbolImage }) {
    return (
        <StyledCounterBox>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                <MediaRenderer style={{ width: 100, height: 100, borderRadius: '50%' }} src={symbolImage} />
                <Typography variant='h5' sx={{ color: 'white' }} >{candidateName}</Typography>
            </Box>
            <Typography variant='h5' sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{votes.toNumber()}</Typography>
        </StyledCounterBox >
    )
}

export default VoteCounterCard