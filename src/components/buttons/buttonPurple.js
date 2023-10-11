import styled from "@emotion/styled";


const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    // width: '100px',
    height: '35px',
    borderRadius: '12px',
    outline: 'none',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold',
    '&:hover': {
        color: theme.palette.primary.light,
        borderRadius: '15px',
        cursor: 'pointer'
    }
}))
const ButtonPurple = ({ onClick, text, w }) => {
    return (
        <Button onClick={onClick} style={{ width: w ? w : '100px' }}>
            {text}
        </Button>
    );
}

export default ButtonPurple;