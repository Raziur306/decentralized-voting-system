import { Box, Button, Radio, RadioGroup, Typography } from '@mui/material'
import { MediaRenderer } from '@thirdweb-dev/react'
import React from 'react'
import { StyledRadio } from '../styles/candidateStyle'

function CandidateCardComponent({ candidateName, symbolName, symbolImg }) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", alignItems: 'center', width: 500 }}>
            <MediaRenderer style={{ maxWidth: "150px", maxHeight: '150px' }} src={symbolImg} />

            <Typography sx={{ color: 'white', fontWeight: 'bold' }}>{symbolName}</Typography>
        </Box >
    )
}

export default CandidateCardComponent