import styled from "@emotion/styled";
import { Typography, Box, Button } from '@mui/material';
import { green, } from '@mui/material/colors';

export const StyledCardTypography = styled(Typography)({
    background: green[400],
    color: 'white',
    padding: 10,
    borderRadius: 50,
});




export const StyledPreviousElectionBox = styled(Box)({
    background: 'rgb(255, 63, 63)',
    padding: 20,
    borderRadius: 20,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'transform .2s',
    ':hover': {
        background: 'rgb(255, 91, 91)',
        transform: 'scale(1.05)'
    }
});

export const StyledOngoingElectionBox = styled(Box)({
    background: 'rgb(59, 92, 253)',
    padding: 20,
    borderRadius: 20,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'transform .2s',
    ':hover': {
        background: 'rgb(77, 106, 250 )',
        transform: 'scale(1.05)'
    }
});

export const StyledUpcomingElectionBox = styled(Box)({
    background: 'rgb(37, 191, 84)',
    padding: 20,
    borderRadius: 20,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'transform .2s',
    ':hover': {
        background: 'rgb(67, 196, 106 )',
        transform: 'scale(1.05)'
    }
})

export const StyledViewBtn = styled(Button)({
    color: 'white',
    borderRadius: 100,
    '&:hover': {
        color: green[100]
    }

});

export const StyledElectionTypography = styled(Typography)({
    WebkitLineClamp: 2,


})