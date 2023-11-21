import styled from "@emotion/styled";
import { Box } from "@mui/material";


const Button = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '12px',
    outline: 'none',
    color: 'white',
    border: 'none',
    textTransform: 'capitalize',
    fontWeight: 500,
    // cursor: 'pointer',
    // backgroundColor: theme.palette.secondary.main,
    // boxShadow: theme.palette.secondary.boxShadow,
}))
const ButtonPurple = ({ onClick, text, w, px, disabled, icon, mt, height, prevIcon, nextIcon, fontSize }) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                height: height ? height : '40px',
                mt: mt ? mt : undefined, fontSize: fontSize ? fontSize : '14px',
                backgroundColor: disabled ? '#ccc' : 'secondary.main',
                width: w ? w : '100px', px: px ? px : 'unset', cursor: disabled ? 'auto' : 'pointer',
                boxShadow: disabled ? 'inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25)' : '0px 0px 4px 1px rgba(0, 0, 0, 0.25)',
            }}>
            {prevIcon ? prevIcon : undefined}
            &nbsp;{text}&nbsp;
            {nextIcon ? nextIcon : undefined}
        </Button>
    );
}

export default ButtonPurple;