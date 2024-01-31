import { Box, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import bgDots from '../../assets/bgDots.svg'
import ButtonPurple from "../buttons/buttonPurple";
import styled from "@emotion/styled";

const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: '1440px',
    // display: 'flex', flexDirection: 'column',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))


const WhatsSection = () => {
    return (
        <Box sx={{
            // backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: BG_URL(PUBLIC_URL(`${bgDots}`)),
        }}>
            <Wrapper>
                <Box sx={{ px: { xs: 0, md: '60px' } }}>

                    <Box sx={{
                        py: { xs: '80px', sm: '75px' },
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" sx={{
                            color: 'primary.text', margin: 0, fontWeight: 500,
                            fontSize: { xs: '30px', md: '32px' }
                        }}>What Is NFT ?</Typography>
                        <Typography variant="p" sx={{
                            lineHeight:'35px',
                            color: 'primary.text', margin: 0, my: { xs: '54px', md: '45px' }, px: { xs: '20px', sm: '30px', md: 10 },
                            fontSize: { xs: '16px', sm: '16px', }, fontWeight: 400, fontFamily: "Inter", textTransform: 'capitalize'
                        }}>
                            An NFT (Non-Fungible Token) is a digital asset that can come in the form of art, music, in-game items, videos, picture, art or Physical item and more. They are bought and sold and transferred online, it would have a value according to the trend and market after being created by any User.There will always be a royalty to the Creator of The NFT until it is burned (cashed out) Although NFT has been around since 2014 but this is the first time it is being presented to the Public all around the world, make trading much easier and more accessible This is a new Dimension in social media, convert your assets or goods or talent in to a NFT and present or use it as you please and all with cryptography.
                            Highest privacy security with the best Block Chain Technology. 256k encryption for connection to your Wallet.</Typography>
                        <ButtonPurple text={'enjoy your own nft'} w={'max-content'} px={'25px'} />
                    </Box>
                </Box>
            </Wrapper >
        </Box>
    );
}

export default WhatsSection;