import { Box, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import bgDots from '../../assets/bgDots.svg'
import ButtonPurple from "../buttons/buttonPurple";

const WhatsSection = () => {
    return (
        <Box sx={{
            px: { xs: 0, sm: 10 }, py: 10,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            backgroundSize: { xs: 'cover', sm: 'contain' },
            backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: BG_URL(PUBLIC_URL(`${bgDots}`)),
            textAlign: 'center'
        }}>
            <Typography variant="h6" sx={{ color: 'primary.text', margin: 0, mb: 3, fontWeight: 500, fontSize: { xs: '22px', md: '24px' } }}>What Is NFT ?</Typography>
            <Typography variant="p" sx={{ color: 'primary.text', margin: 0, mb: 3, fontSize: { xs: '14px', sm: '16px', }, fontWeight: 400 }}>
                An NFT (Non-Fungible Token) is a digital asset that can come in the form of art, music, in-game items, videos, picture, art or Physical item and more. They are bought and sold and transferred online, it would have a value according to the trend and market after being created by any User.There will always be a royalty to the Creator of The NFT until it is burned (cashed out) Although NFT has been around since 2014 but this is the first time it is being presented to the Public all around the world, make trading much easier and more accessible This is a new Dimension in social media, convert your assets or goods or talent in to a NFT and present or use it as you please and all with cryptography.
                Highest privacy security with the best Block Chain Technology. 256k encryption for connection to your Wallet.</Typography>
            <ButtonPurple text={'enjoy your own nft'} w={'max-content'} px={'25px'} />
        </Box>
    );
}

export default WhatsSection;