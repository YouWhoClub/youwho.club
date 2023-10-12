import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import yCoin from '../../assets/yCoin.svg'

const DecorSection = () => {
    return (
        <Box sx={{
            borderRadius: { xs: '0 100px 0 100px', md: '0px 200px 0px 200px' }, width: '100%', height: { xs: '250px', md: '450px' }, bgcolor: 'primary.middle', mt: 5, position: 'relative'
        }}>
            <Box
                sx={{
                    width: { xs: '100px', md: '250px' }, height: { xs: '100px', md: '250px' },
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