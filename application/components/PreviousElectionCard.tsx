import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Typography } from "@mui/material"
import { StyledCardTypography, StyledPreviousElectionBox } from '../styles/electionCardStyle'
import { useRouter } from 'next/router'
import { getTimeLeft } from '../utils/timeCalulation'
import { AuthorityContext } from '../context/AuthorityContext'

const PreviousElectionCard = ({ electionId, electionName, startTime, endTime }) => {
    const { setSelectedElection } = useContext(AuthorityContext)
    const router = useRouter();
    const startTimeTimestamp = startTime.toNumber();
    const endTimeTimestamp = endTime.toNumber();

    const handleOnClick = () => {
        setSelectedElection({ electionId, electionName, startTime: startTime.toNumber(), endTime: endTime.toNumber() });
        router.push('/votes')
    }


    //starts in time state
    const [startTimeLeft, setStartTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    //ends in time state
    const [endTimeLeft, setEndTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });


    //starts in
    useEffect(() => {
        const interval = setInterval(() => {
            const timeLeft = getTimeLeft(startTimeTimestamp)
            const { days, hours, minutes, seconds } = timeLeft;
            setStartTimeLeft({ days, hours, minutes, seconds })

        }, 1000)
        return () => clearInterval(interval);
    }, [startTimeTimestamp]);


    //ends in
    useEffect(() => {
        const interval = setInterval(() => {
            const timeLeft = getTimeLeft(endTimeTimestamp);
            const { days, hours, minutes, seconds } = timeLeft;
            setEndTimeLeft({ days, hours, minutes, seconds });
        })
        return () => clearInterval(interval);
    }, [endTimeTimestamp])





    return (
        <StyledPreviousElectionBox onClick={handleOnClick}>
            <Typography sx={{ textAlign: 'center', marginBottom: 2 }} variant='h6'>{electionName}</Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>Starts in: </Typography>
                    <Typography>{startTimeLeft.days}d : {startTimeLeft.hours}h : {startTimeLeft.minutes}m : {startTimeLeft.seconds}s </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>Ends in: </Typography>
                    <Typography>{endTimeLeft.days}d : {endTimeLeft.hours}h : {endTimeLeft.minutes}m : {endTimeLeft.seconds}s </Typography>
                </Box>
            </Box>
        </StyledPreviousElectionBox>
    )
}

export default PreviousElectionCard