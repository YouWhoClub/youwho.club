import styled from "@emotion/styled";
import { Box } from "@mui/material";


const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    // width: '100px',
    height: '35px',
    borderRadius: '12px',
    outline: 'none',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold',
    '&:hover': {
        color: theme.palette.primary.gray,
        borderRadius: '15px',
        cursor: 'pointer'
    }
}))
const ButtonPurple = ({ onClick, text, w, px, disabled }) => {
    return (
        <Button onClick={onClick} style={{ backgroundColor: disabled ? '#525252' : '#8B3BBC', width: w ? w : '100px', paddingLeft: px ? px : 'unset', paddingRight: px ? px : 'unset' }}>
            {text}
        </Button>
    );
}

export default ButtonPurple;