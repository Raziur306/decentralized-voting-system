import styled from "@emotion/styled";
import { Typography, Box, Button } from '@mui/material';
import { green, } from '@mui/material/colors';

export const StyledCardTypography = styled(Typography)({
    background: green[400],
    color: 'white',
    padding: 10,
    borderRadius: 50,
});

export const StyledBox = styled(Box)({
    background: '#242B2E',
    padding: 20,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
});

export const StyledViewBtn = styled(Button)({
    color: 'white',
    borderRadius: 100,
    '&:hover': {
        color: green[100]
    }

});