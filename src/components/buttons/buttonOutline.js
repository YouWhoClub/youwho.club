import styled from "@emotion/styled";
import { Box } from "@mui/material";


const Button = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '12px',
    outline: 'none',
    cursor: 'pointer',
    textTransform: 'capitalize',
    border: 'none',
    fontWeight: 500,
    outline: 'none',
    color: theme.palette.secondary.text,
    backgroundColor: theme.palette.secondary.bg,
    // boxShadow: theme.palette.secondary.boxShadow,
    // '&:hover': {
    //     color: theme.palette.primary.text,
    //     boxShadow: theme.palette.primary.boxShadowInset,
    //     cursor: 'pointer'
    // }
}))
const ButtonOutline = ({ onClick, text, w, px, disabled, icon, mt, height, prevIcon, nextIcon, fontSize, br }) => {
    return (
        <Button onClick={onClick}
            sx={(theme) => ({
                height: height ? height : '40px',
                mt: mt ? mt : undefined, fontSize: fontSize ? fontSize : '14px',
                backgroundColor: disabled ? '#ccc' : 'secondary.bg',
                width: w ? w : '100px', px: px ? px : 'unset',
                boxShadow: disabled ? theme.palette.primary.boxShadowInset : theme.palette.primary.boxShadow,
            })}>
            {prevIcon ? prevIcon : undefined}
            &nbsp;{text}&nbsp;
            {nextIcon ? nextIcon : undefined}
        </Button>
    );
}

export default ButtonOutline;