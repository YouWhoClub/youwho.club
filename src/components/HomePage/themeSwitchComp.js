import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import image from '../../assets/dayNnight.svg'

const ThemeSwitcher = ({ theme, switchTheme }) => {
    return (
        <Box sx={{
            width: '50px',
            height: '50px',
            backgroundImage: BG_URL(PUBLIC_URL(`${image}`)),
            backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center',
            position: 'sticky',
            right: '10px', top: '55px', display: { xs: 'none', sm: 'block' },
            cursor: "pointer"
        }} onClick={switchTheme} />
    );
}

export default ThemeSwitcher;