import styled from "@emotion/styled";


const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.secondary.bg,
    // width: '100px',
    height: '35px',
    borderRadius: '12px',
    outline: 'none',
    color: theme.palette.primary.gray,
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold',
    boxShadow: 'inset 0px 0px 9px -2px rgba(227,209,231,0.9)',
    '&:hover': {
        color: theme.palette.primary.text,
        borderRadius: '15px',
        cursor: 'pointer'
    }
}))
const ButtonOutlineInset = ({ onClick, text, w, px }) => {
    return (
        <Button onClick={onClick} style={{ width: w ? w : '100px', paddingLeft: px ? px : 'unset', paddingRight: px ? px : 'unset' }}>
            {text}
        </Button>
    );
}

export default ButtonOutlineInset;