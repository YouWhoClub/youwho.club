import styled from "@emotion/styled";
import { Box, Typography, keyframes } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Link } from "react-router-dom";

const shake = keyframes`
  0% {
    transform: rotate(5deg);
  }
  50%{
    transform: rotate(-5deg);
  }
  100%{
    transform: rotate(0);
  }
`

const Card = styled(Box)(({ theme }) => ({
    width: '250px', height: '280px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backdropFilter: 'blur(20px)',
    borderRadius: '24px', backgroundColor: theme.palette.secondary.bgOp, margin: '10px',
    '&:hover': {
        // width: '253px', height: '283px',
        animation: `${shake} 1s linear`,
    }
}))
const Image = styled(Box)(({ theme }) => ({
    width: '80px', height: '80px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',

}))

const NavigateCard = ({ image, title, content, link }) => {
    return (
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={link}>
            <Card>
                <Image sx={{ backgroundImage: BG_URL(PUBLIC_URL(`${image}`)) }} />
                <Typography sx={{ color: 'primary.text', mb: 2, mt: 1, fontWeight: 500 }}>{title}</Typography>
                <Typography sx={{ color: 'secondary.text', fontSize: '10px', textAlign: 'center', px: 2 }}>{content}</Typography>
            </Card>
        </Link>
    );
}

export default NavigateCard;