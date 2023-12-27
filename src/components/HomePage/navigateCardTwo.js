import styled from "@emotion/styled";
import { Box, Typography, keyframes } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Link } from "react-router-dom";

const shake = keyframes`
  0% {
    transform: rotate(2deg);
  }
  50%{
    transform: rotate(-3deg);
  }
  100%{
    transform: rotate(0);
  }
`

const Card = styled(Box)(({ theme }) => ({
  width: '250px',
  boxSizing: 'border-box',
  height: '300px',
  padding: '25px',
  display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
  backdropFilter: 'blur(20px)',
  borderRadius: '28px', backgroundColor: theme.palette.secondary.bg,
  boxShadow: theme.palette.primary.boxShadowLarge,
  zIndex: 1,
  position: 'relative',
  '&:hover': {
    animation: `${shake} 1s linear`,
  }
}))
const UnderCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:after': {
    content: '""',
    width: '247px',
    height: '70px',
    transform: 'rotate(5.5deg)',
    bottom: '-5px',
    flexShrink: 0,
    borderRadius: '0px 20px 28px 28px',
    background: theme.palette.primary.bg,
    zIndex: '-1', position: 'absolute'
  }
}))
const Image = styled(Box)(({ theme }) => ({
  width: '80px', height: '80px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',

}))

const NavigateCardTwo = ({ image, title, content, link }) => {
  return (
    <Link style={{
      textDecoration: 'none', color: 'inherit',
      position: 'relative', zIndex: 1, cursor: 'auto'
    }}
    // to={link}
    >
      <Card>
        <Image sx={{ backgroundImage: BG_URL(PUBLIC_URL(`${image}`)), }} />
        <Typography sx={{ color: 'primary.text', my: '30px', fontSize: '20px', fontWeight: 400 }}>{title}</Typography>
        <Typography sx={{
          color: 'secondary.text',
          textAlign: 'justify',
          fontFamily: "Inter", textTransform: 'capitalize',
          fontSize: '10px',
        }}>{content}</Typography>
      </Card>
      <UnderCard />
    </Link>
  );
}

export default NavigateCardTwo;