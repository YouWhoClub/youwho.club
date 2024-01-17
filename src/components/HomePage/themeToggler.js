import { Box } from "@mui/material";
import { Moon, Sun, Sun1 } from "iconsax-react";

const ThemeToggler = ({ theme, switchTheme }) => {
    return (<Box
        sx={{
            width: '65px', height: '28px', borderRadius: '60px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '0.1px solid',
            borderColor: 'secondary.middle',
            boxSizing: 'border-box', bgcolor: theme == 'light' ? '#EFF6FB' : '#001423', position: 'relative'
        }}>
        <Box sx={{
            cursor: 'pointer',
            bgcolor: 'secondary.bg', width: '26px', height: '26px', borderRadius: '50%', border: '2px solid',
            borderColor: 'primary.middle', boxShadow: '0px 0px 5px 1px rgba(227,209,231,0.7)', transition: '1000ms ease',
            position: 'absolute', left: theme == 'light' ? 0 : 'unset', right: theme == 'dark' ? 0 : 'unset'
        }} onClick={switchTheme} />
        <Box sx={{
            width: '50%', height: '100%', borderRadius: '60px 0 0 60px',
            // bgcolor: '#ACCBE1',
            display: 'flex', alignItems: 'center', justifyContent: 'start', boxSizing: 'border-box', pl: '6px'
        }}>
            <Moon size='18px' variant="Bold" color="#FFFDD5" />
        </Box>
        <Box sx={{
            width: '50%', height: '100%', borderRadius: '0 60px  60px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'end', boxSizing: 'border-box', pr: '6px',
            // bgcolor: '#091E2D'
        }}>
            <Sun1 size='18px' variant="Bold" color="#FFD966" />
        </Box>


    </Box>);
}

export default ThemeToggler;