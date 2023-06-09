import styled from "@emotion/styled";
import { List, Box, ListItem, Typography, TextField, Button } from '@mui/material';

export const StyledList = styled(List)({
    listStyleType: 'disc',
    color: 'white',
    fontSize: 10,
});

export const StyledListItem = styled(ListItem)({
    display: 'list-item',
});

export const StyledVotingBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: 50
});

export const StyledTitleTypography = styled(Typography)({
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
});

export const StyledTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        color: 'white'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
        '&:hover fieldset': {
            borderColor: 'gray',
        },

    }
});

export const StyledVerifyBtn = styled(Button)({
    width: '20%',
    color: 'white',
    backgroundColor: 'green',
    '&:hover': {
        background: 'red',
    }
});