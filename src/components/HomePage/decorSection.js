import { Box, Typography } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import yCoin from '../../assets/yCoin.svg'
import ButtonPurple from "../buttons/buttonPurple";

const DecorSection = () => {
    return (
        <Box sx={{
            borderRadius: { xs: '0 100px 0 100px', md: '0px 200px 0px 200px' },
            width: '100%', height: { xs: 'auto', md: '450px' },
            bgcolor: 'primary.middle',
            mt: 5, position: 'relative',
            display: 'flex', justifyContent: 'end',
        }}>
            <Box sx={{
                height: '100%', width: { xs: '100%', sm: '50%' },
                px: 6, py: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
                <Typography variant="h4" sx={{ color: 'primary.text', margin: 0, mb: 1, fontWeight: 500, fontSize: { xs: '22px', md: '24px' } }}>Earn, Even More Than Spend ?!</Typography>
                <Typography variant="h6" sx={{ color: 'primary.text', margin: 0, mb: 3, fontWeight: 500, fontSize: { xs: '18px', md: '20px' } }}>this is a subtitle</Typography>
                <Typography variant="p" sx={{ color: 'primary.text', textAlign: 'justify', margin: 0, mb: 3, fontSize: { xs: '14px', sm: '16px', }, fontWeight: 400 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </Typography>
                <Box sx={{ alignSelf: { xs: 'center', sm: 'end' } }}>
                    <ButtonPurple text={'join now'} w={'max-content'} px={'50px'} />
                </Box>
            </Box>
            <Box
                sx={{
                    width: { xs: '100px', sm: '150px', md: '250px' }, height: { xs: '100px',sm: '150px', md: '250px' },
                    backgroundImage: BG_URL(PUBLIC_URL(`${yCoin}`)), backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'absolute', borderRadius: '50%',
                    left: '40px',
                    top: { xs: '-50px', md: '-150px' }
                }}>
            </Box>


        </Box>
    );
}

export default DecorSection;