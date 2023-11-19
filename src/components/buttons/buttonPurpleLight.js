import styled from "@emotion/styled";
import { Box } from "@mui/material";


const Button = styled('button')(({ theme }) => ({
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.light,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    outline: 'none',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    textTransform: 'capitalize',
    fontWeight: 500,
    boxShadow: theme.palette.primary.boxShadow,
}))
const ButtonPurpleLight = ({ onClick, text, w, px, disabled, icon, mt, height, br }) => {
    return (
        <Button onClick={onClick} style={{
            height: height ? height : '40px',
            marginTop: mt ? mt : undefined, borderRadius: br ? br : '12px',
            backgroundColor: disabled ? '#ccc' : 'secondary.main',
            width: w ? w : '100px', paddingLeft: px ? px : 'unset', paddingRight: px ? px : 'unset',
            boxShadow: disabled ? 'inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25)' : 'secondary.boxShadow',
        }}>
            {text}
            {icon ? icon : undefined}
        </Button>
    );
}

export default ButtonPurpleLight;