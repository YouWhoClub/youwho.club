import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";


const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex', width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))
const YouWhoIcon = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/w-outline.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '50px',
    height: '50px'
}))
const YouWhoIconPurple = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    backgroundImage: "url('/p-outline.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '50px',
    height: '50px'
}))

const MobileMenu = ({ openMenu, setOpenMenu, theme, switchTheme }) => {
    return (
        <Modal
            open={openMenu}
            onClose={() => {
                setOpenMenu(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableScrollLock={true}
        >
            <Box sx={{
                width: '100%',
                height: '100%',
                display: { xs: 'flex', sm: 'none' }, alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)'
            }}>
                <Box sx={{
                    borderRadius: '24px',
                    width: '100%', height: '100%',
                    backgroundColor: 'secondary.bg',
                    display: 'flex', flexDirection: 'column',
                    px: '30px',
                    py: '30px',
                    justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <FlexRow>
                        {theme == 'light' ?
                            <YouWhoIconPurple />
                            : <YouWhoIcon />
                        }
                        <div style={{ cursor: 'pointer' }} onClick={() => setOpenMenu(false)}>
                            <Close />
                        </div>

                    </FlexRow>
                </Box>
            </Box>


        </Modal>
    );
}

export default MobileMenu;