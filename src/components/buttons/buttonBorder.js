import styled from "@emotion/styled";
import { Box } from "@mui/material";


const Button = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    outline: 'none',
    color: theme.palette.secondary.text,
    border: '1px solid #dedede',
    textTransform: 'capitalize',
    fontWeight: 500,
    // cursor: 'pointer',
    // backgroundColor: theme.palette.secondary.main,
    // boxShadow: theme.palette.secondary.boxShadow,
}))
const ButtonBorder = ({ onClick, text, w, px, disabled, icon, mt, height, prevIcon, nextIcon, fontSize, br }) => {
    return (
        <Button
            onClick={onClick}
            sx={(theme) => ({
                height: height ? height : '40px',
                mt: mt ? mt : undefined, fontSize: fontSize ? fontSize : '14px',
                backgroundColor: disabled ? 'primary.disabled' : 'transparent',
                width: w ? w : '100px', px: px ? px : 'unset', cursor: disabled ? 'auto' : 'pointer', borderRadius: br ? br : '12px',
            })}>
            {prevIcon ? prevIcon : undefined}
            &nbsp;{text}&nbsp;
            {nextIcon ? nextIcon : undefined}
        </Button>
    );
}

export default ButtonBorder;