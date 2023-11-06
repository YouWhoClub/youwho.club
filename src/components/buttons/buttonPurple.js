import styled from "@emotion/styled";
import { Box } from "@mui/material";


const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    display:'flex',alignItems:'center',justifyContent:'center',
    // width: '100px',
    height: '35px',
    borderRadius: '12px',
    outline: 'none',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 500,
    boxShadow:theme.palette.secondary.boxShadow,
    // '&:hover': {
    //     boxShadow: theme.palette.primary.boxShadowInset,
    //     color: theme.palette.primary.light,
    //     // borderRadius: '15px',
    //     cursor: 'pointer'
    // }
}))
const ButtonPurple = ({ onClick, text, w, px, disabled, icon }) => {
    return (
        <Button onClick={onClick} style={{
            backgroundColor: disabled ? '#d6d6d6' : 'secondary.main',
            width: w ? w : '100px', paddingLeft: px ? px : 'unset', paddingRight: px ? px : 'unset'
        }}>
            {text}
            {icon ? icon : undefined}
        </Button>
    );
}

export default ButtonPurple;