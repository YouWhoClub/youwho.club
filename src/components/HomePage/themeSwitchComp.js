import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import image from '../../assets/dayNnight.svg'

const ThemeSwitcher = ({ theme, switchTheme, left, right, top }) => {
    return (
        <Box sx={{
            // width: { xs: '30px', md: '50px' },
            // height: { xs: '30px', md: '50px' },
            width: '50px',
            height: '50px',        
            backgroundImage: BG_URL(PUBLIC_URL(`${image}`)),
            backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center',
            position: 'absolute',
            right: right ? right : 'unset', left: left ? left : 'unset', top: top ? top : '55px', display: { xs: 'none', sm: 'block' },
            cursor: "pointer"
        }} onClick={switchTheme} />
    );
}

export default ThemeSwitcher;