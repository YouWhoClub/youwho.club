import styled from "@emotion/styled";
import { Box } from "@mui/material";


const Button = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    outline: 'none',
    border: '1px solid #dedede',
    textTransform: 'capitalize',
    fontWeight: 500,
    // cursor: 'pointer',
    // backgroundColor: theme.palette.secondary.main,
    // boxShadow: theme.palette.secondary.boxShadow,
}))
const ButtonBorder = ({ onClick, text, w, px, py, disabled, icon, mt, height, prevIcon, nextIcon, fontSize, br, bgcolor, fontColor }) => {
    return (
        <Button
            onClick={onClick}
            sx={(theme) => ({
                height: height ? height : '40px',
                mt: mt ? mt : undefined, fontSize: fontSize ? fontSize : '14px',
                backgroundColor: disabled ? 'primary.disabled' : bgcolor,
                color: fontColor ? fontColor : theme.palette.secondary.text,
                width: w ? w : '100px',
                px: px ? px : 'unset',
                py: py ? py : 'unset',
                cursor: disabled ? 'auto' : 'pointer', borderRadius: br ? br : '12px',
            })}>
            {prevIcon ? prevIcon : undefined}
            {text ? <span>&nbsp;{text}&nbsp;</span> : undefined}
            {nextIcon ? nextIcon : undefined}
        </Button>
    );
}

export default ButtonBorder;