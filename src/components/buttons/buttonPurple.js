import styled from "@emotion/styled";
import { Box } from "@mui/material";


const Button = styled('button')(({ theme }) => ({
    boxSizing:'border-box',
    backgroundColor: theme.palette.secondary.main,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    // width: '100px',
    // height: '35px',
    borderRadius: '12px',
    outline: 'none',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    textTransform: 'capitalize',
    fontWeight: 500,
    boxShadow: theme.palette.secondary.boxShadow,
    // '&:hover': {
    //     boxShadow: theme.palette.primary.boxShadowInset,
    //     color: theme.palette.primary.light,
    //     // borderRadius: '15px',
    //     cursor: 'pointer'
    // }
}))
const ButtonPurple = ({ onClick, text, w, px, disabled, icon, mt, height }) => {
    return (
        <Button onClick={onClick} style={{
            height: height ? height : '40px',
            marginTop: mt ? mt : undefined,
            backgroundColor: disabled ? '#ccc' : 'secondary.main',
            width: w ? w : '100px', paddingLeft: px ? px : 'unset', paddingRight: px ? px : 'unset',
            boxShadow: disabled ? 'inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25)' : 'secondary.boxShadow',
        }}>
            {text}
            {icon ? icon : undefined}
        </Button>
    );
}

export default ButtonPurple;