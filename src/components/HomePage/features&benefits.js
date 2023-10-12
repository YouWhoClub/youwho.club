import { Box, Typography } from "@mui/material";
import benfitsPic from '../../assets/complimentPhotos.svg'
import { BG_URL, PUBLIC_URL } from "../../utils/utils";

const FABSection = () => {
    return (
        <Box
            sx={{
                display: 'flex', px: { xs: '20px', sm: '60px' }, justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column-reverse', sm: 'row' }
            }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column'
            }}>
                <Typography variant="h6" sx={{ color: 'primary.text', margin: 0, fontWeight: 500, fontSize: { xs: '20px', sm: '20px', md: '22px' } }}>Features and Benefits</Typography>
                <Typography variant="p" sx={{ color: 'primary.text', margin: 0, mb: 3, fontSize: { xs: '14px', sm: '16px', md: '18px' }, fontWeight: 400 }}>A Life Magic For You</Typography>
                <Typography variant="p" sx={{ color: 'primary.text', margin: 0, mb: 2, fontSize: { xs: '10px', sm: '14px', md: '16px' } }}>Youwho is a NFT market place with
                    new unique features.
                </Typography>
            </Box>
            <Box
                sx={{
                    width: { xs: '250px', md: '350px' }, height: { xs: '250px', md: '350px' },
                    backgroundImage: BG_URL(PUBLIC_URL(`${benfitsPic}`)), backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',

                }}>
            </Box>
        </Box>
    );
}

export default FABSection;