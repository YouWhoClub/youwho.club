import styled from "@emotion/styled";
import { Box, Typography, keyframes } from "@mui/material";
import ButtonPurple from "../buttons/buttonPurple";
import { ArrowDown2 } from "iconsax-react";
const changeBG = keyframes`
  0% {
    backgroundImage: "url('/Y-HUG-COIN.svg')",
  }
  50%{
    backgroundImage: "url('/youwho-hugcoin.svg')",
  }
  100%{
    backgroundImage: "url('/Y-HUG-COIN.svg')",
  }
`

const Wrapper = styled(Box)(({ theme }) => ({
    height: 'calc(100vh - 55px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
}))
const YouWhoPic = styled(Box)(({ theme }) => ({
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
    backgroundImage: "url('/youwho-hugcoin.svg')",
    '&:hover': {
        backgroundImage: "url('/Y-HUG-COIN.svg')",
        // animation: `${changeBG} 3s linear infinite`,
    }
}))
const IntroNew = ({ theme }) => {
    return (
        <Wrapper sx={{ px: { xs: '30px', sm: '60px' }, flexDirection: { xs: 'column', sm: 'row' }, my: 3 }}>
            <Box sx={{
                width: { xs: '100%', sm: '40%' },
                // height: '100%',
                justifyContent: 'center',
                alignItems: { xs: 'center', sm: 'start' },
                display: 'flex', flexDirection: 'column',
            }}>
                <Typography variant="h4" sx={{ color: 'primary.text', margin: 0, fontSize: { xs: '20px', sm: '30px' }, fontWeight: 500 }}>YOUWHO</Typography>
                <Typography variant="h6" sx={{ color: 'secondary.text', margin: 0, mb: { xs: 3, sm: 10 }, fontWeight: 600 }}>A Life Magic For You</Typography>
                <Typography variant="p" sx={{ color: 'primary.gray', margin: 0, mb: 2, textAlign: { xs: 'center', sm: 'start' } }}>Youwho is a NFT market place with
                    new unique features.</Typography>
                <ButtonPurple text={`explore nfts`} w={'60%'} />
            </Box>
            <YouWhoPic sx={{
                width: { xs: '100%', sm: '40%' },
            }}>
            </YouWhoPic>
        </Wrapper >

    );
}

export default IntroNew;