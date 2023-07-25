import styled from "@emotion/styled";
import { Radio } from "@mui/material";

export const StyledRadio = styled(Radio)({
    color: 'white',

    '&.Mui-checked': {
        color: 'green'
    }
});