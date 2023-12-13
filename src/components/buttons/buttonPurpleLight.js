import styled from "@emotion/styled";
import { Box } from "@mui/material";


const Button = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    outline: 'none',
    color: 'white',
    border: 'none',
    textTransform: 'capitalize',
    fontWeight: 500,
    // cursor: 'pointer',
    // backgroundColor: theme.palette.secondary.main,
    // boxShadow: theme.palette.secondary.boxShadow,
}))
const ButtonPurpleLight = ({ onClick, text, w, px, disabled, icon, mt, height, prevIcon, nextIcon, fontSize, br }) => {
    return (
        <Button onClick={onClick}
            sx={(theme) => ({
                height: height ? height : '40px',
                mt: mt ? mt : undefined, fontSize: fontSize ? fontSize : { xs: '12px', sm: '14px' }, borderRadius: br ? br : '12px',
                backgroundColor: disabled ? 'primary.gray' : 'secondary.middle',
                width: w ? w : '100px', px: px ? px : 'unset', cursor: disabled ? 'auto' : 'pointer',
                boxShadow: disabled ? theme.palette.primary.boxShadowInset : theme.palette.primary.boxShadow,
            })}>
            {prevIcon ? prevIcon : undefined}
            &nbsp;{text}&nbsp;
            {nextIcon ? nextIcon : undefined}

        </Button>
    );
}

export default ButtonPurpleLight;