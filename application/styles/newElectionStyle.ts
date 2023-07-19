import styled from "@emotion/styled";
import { Select, Box, Button, ListItem, TextField, Typography, List, MenuItem } from "@mui/material";

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

export const StyledSuccessBox = styled(Box)({
    background: 'green',
    width: 200,
    height: 50,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    margin: 'auto',
    color: 'white',
});


//voters registration style
export const StyledSelect = styled(Select)({
    width: 500,
    color: 'white',
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'green!important'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white'
    },
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
        },
    },
    "::-moz-selection": {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
        },
    }
});

export const StyledMenuItem = styled(MenuItem)({
    color: 'white'
})