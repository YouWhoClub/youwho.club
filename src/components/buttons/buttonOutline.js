import styled from "@emotion/styled";


const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.secondary.bg,
    // borderRadius: '12px',
    outline: 'none',
    padding: '10px 22px',
    color: theme.palette.secondary.text,
    fontFamily: 'inter',
    cursor: 'pointer',
    border: 'none',
    fontSize: '14px',
    boxShadow: theme.palette.secondary.boxShadow,
    transition: 'color 0.2s',
    '&:hover': {
        color: theme.palette.primary.text,
        boxShadow: theme.palette.primary.boxShadowInset,
        cursor: 'pointer'
    }
}))
const ButtonOutline = ({ onClick, text, w, px, br }) => {
    return (
        <Button onClick={onClick}
            style={{
                width: w ? w : 'unset', paddingLeft: px ? px : '22px',
                paddingRight: px ? px : '22px', borderRadius: br ? br : '12px'
            }}>
            {text}
        </Button>
    );
}

export default ButtonOutline;