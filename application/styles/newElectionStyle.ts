import styled from "@emotion/styled";
import { Box, Button, ListItem, TextField, Typography, List } from "@mui/material";

export const StyledTextField = styled(TextField)({
    width: 500,
    color: 'white',
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

    },
    '::-webkit-calendar-picker-indicator': {
        filter: 'invert(1)'
    }

});

export const StyledTypography = styled(Typography)({
    color: 'white',
    marginBottom: 5,
    fontWeight: 700
});

export const StyledChildBox = styled(Box)({
    margin: 20
});

export const StyledSubmitBtn = styled(Button)({
    color: 'white',
    textTransform: 'none',
    background: 'red',
    width: 500,
    padding: 10,
    display: 'flex',
    margin: 'auto',
    '&:hover': {
        background: 'rgb(255, 70, 70)'
    }
});

export const StyledListItem = styled(ListItem)({
    display: 'list-item'
});

export const StyledList = styled(List)({
    listStyle: 'disc',
    color: "white",
    fontsize: 10,
});