import React from 'react'
import { Box, Button, Typography } from "@mui/material"
import { StyledBox, StyledCardTypography, StyledViewBtn } from '../styles/electionCardStyle'
import { useRouter } from 'next/router'

const PreviousElectionCard = ({ electionHash, electionName, startTime, endTime }) => {
    const router = useRouter();
    const handleOnViewBtnClick = () => {
        router.push('/votes')
    }

    return (
        <StyledBox>
            <Typography variant='h6'>{electionName}</Typography>
            <StyledCardTypography variant='h6'>Coming</StyledCardTypography>
            <Typography variant='h6'>0d:0h:0s</Typography>
            <StyledViewBtn onClick={handleOnViewBtnClick}>View</StyledViewBtn>
        </StyledBox>
    )
}

export default PreviousElectionCard