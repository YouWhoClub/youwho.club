import styled from "@emotion/styled";


const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.primary.gray,
    width: '100px',
    height: '35px',
    borderRadius: '30px',
    outline: 'none',
    color: theme.palette.primary.darkGray,
    cursor: 'pointer',
    border: 'none',
    fontWeight:'bold',
    '&:hover': {
        color: theme.palette.primary.main,
        borderRadius: '15px',
        cursor: 'pointer'
    }
}))
const ButtonOutline = ({ onClick, text }) => {
    return (
        <Button onClick={onClick}>
            {text}
        </Button>
    );
}

export default ButtonOutline;