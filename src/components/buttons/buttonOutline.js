import styled from "@emotion/styled";


const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.secondary.bg,
    display:'flex',alignItems:'center',justifyContent:'center',
    height: '35px',
    borderRadius: '12px',
    outline: 'none',
    color: theme.palette.secondary.text,
    cursor: 'pointer',
    border: 'none',
    fontWeight: 500,
    boxShadow:theme.palette.secondary.boxShadow,
    outline: 'none',
    // '&:hover': {
    //     color: theme.palette.primary.text,
    //     boxShadow: theme.palette.primary.boxShadowInset,
    //     cursor: 'pointer'
    // }
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