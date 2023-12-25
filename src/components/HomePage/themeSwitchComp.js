import { Box } from "@mui/material";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import image from '../../assets/dayNnight.svg'

const ThemeSwitcher = ({ theme, switchTheme, left, right, top, bottom, isModalOpen, m, size }) => {
    return (
        <>
            <Box sx={{
                position: 'absolute',
                right: right ? right : 'unset', left: left ? left : 'unset',
                bottom: bottom ? bottom : 'unset', top: top ? top : 'unset',
                display: { xs: 'none', sm: 'flex' }, boxSizing: 'border-box', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.25)', padding: '6px', borderRadius: '10px',
                cursor: "pointer", bgcolor: '#7C42C7', m: m ? m : 'unset'
            }} onClick={switchTheme} >
                <Box sx={{
                    backgroundImage: BG_URL(PUBLIC_URL(`${image}`)),
                    backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center',
                    width: size ? size : '40px',
                    height: size ? size : '40px',
                }}>
                </Box>
            </Box >
            <Box sx={{
                display: isModalOpen ? { xs: 'flex', sm: 'none' } : 'none', boxSizing: 'border-box', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.25)', padding: '6px', borderRadius: '10px',
                cursor: "pointer", bgcolor: '#7C42C7'
            }} onClick={switchTheme} >
                <Box sx={{
                    backgroundImage: BG_URL(PUBLIC_URL(`${image}`)),
                    backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center',
                    width: '28px',
                    height: '28px',
                }}>
                </Box>
            </Box>
        </>
    );
}

export default ThemeSwitcher;