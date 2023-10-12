import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import ButtonPurple from "../buttons/buttonPurple";
import { ArrowDown2 } from "iconsax-react";
const Wrapper = styled(Box)(({ theme }) => ({
    height: 'calc(100vh - 55px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,

}))
const IntroNew = ({ theme }) => {
    return (
        <Wrapper sx={{ px: { xs: '30px', sm: '60px' } }}>
            <Box sx={{
                width: '40%', height: '100%',
                justifyContent: 'center',
                // alignItems:'center',
                display: 'flex', flexDirection: 'column',
            }}>
                <Typography variant="h4" sx={{ color: 'primary.text', margin: 0, fontSize: '35px', fontWeight: 500 }}>YOUWHO</Typography>
                <Typography variant="h6" sx={{ color: 'secondary.text', margin: 0, mb: 10, fontWeight: 600 }}>A Life Magic For You</Typography>
                <Typography variant="p" sx={{ color: 'primary.gray', margin: 0, mb: 2,  }}>Youwho is a NFT market place with
                    new unique features.</Typography>
                <ButtonPurple text={`explore nfts`} w={'60%'} />

            </Box>
            <Box sx={{
                width: '40%', height: '100%',
                backgroundImage: "url('/introGroup.svg')", backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
            }}>
            </Box>
        </Wrapper >

    );
}

export default IntroNew;