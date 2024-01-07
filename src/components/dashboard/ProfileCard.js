import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Setting2, TickSquare } from "iconsax-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_CONFIG } from "../../config";
import { Face } from "@mui/icons-material";
import profileFace from '../../assets/face-pro.svg'
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import ButtonBorder from "../buttons/buttonBorder";


const ProPic = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'center',
    borderRadius: '50%', justifyContent: 'center', backgroundRepeat: 'no-repeat', transition: '500ms ease'
}))
const ProBanner = styled(Box)(({ theme }) => ({
    borderRadius: '24px',
    display: 'flex', alignItems: 'center', boxSizing: 'border-box',
    boxShadow: theme.palette.primary.boxShadow, transition: '500ms ease'
}))
const Line = styled(Box)(({ theme }) => ({
    borderRadius: '24px',
    width: '100%', boxSizing: 'border-box',
    backgroundColor: 'white', transition: '500ms ease', height: '1px'
}))

const ProfileCard = ({ username, YouWhoID, progressBarOpen, setProgressBarOpen }) => {
    const globalUser = useSelector(state => state.userReducer)

    const copyIdToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIdCopied('Copied!');
        } catch (err) {
            setIdCopied('Failed to copy!');
        }
    };
    const [idCopied, setIdCopied] = useState(false)
    const shorten = (str) => {
        if (str)
            return str.length > 15 ? str.substring(0, 15) + '...' : str;
        return 'undefined'
    }

    return (<ProBanner
        id='profile-card'
        sx={{
            // width: '100%',
            height: { xs: '150px', md: '250px' },
            // px: 3, py: { xs: 2, md: 0 },
            padding: '20px',
            flexDirection: { xs: 'row' },
            background: () => globalUser.banner ? `url('${API_CONFIG.API_URL}/${globalUser.banner}') no-repeat center` : '#0Cb2B1',
            backgroundSize: 'cover'
        }}>
        <ProPic
            id='profile-pic'
            sx={{
                background: () => globalUser.avatar ? `url('${API_CONFIG.API_URL}/${globalUser.avatar}') no-repeat center` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                backgroundSize: 'cover', width: { xs: '80px', md: '200px' },
                height: { xs: '80px', md: '200px' },
            }}
        />
        &nbsp;
        &nbsp;
        &nbsp;
        <Box sx={{
            // width: `calc(100% - ${window.document.getElementById('profile-pic').offsetWidth}px)`,
            width: { xs: 'calc(100% - 150px)', md: `calc(100% - 200px)` },
            display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white'
        }}>
            <Typography sx={{
                fontWeight: 700, color: 'white', fontSize: { xs: '16px', md: '20px' }
            }}>
                {globalUser.cid ? globalUser.username : globalUser.identifier}
            </Typography>
            {YouWhoID ?
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: { xs: '12px', md: '16px' } }}>YouWho ID :</Typography>
                    <Typography onClick={() => copyIdToClipBoard(YouWhoID)}
                        sx={{ cursor: 'pointer', fontSize: { xs: '12px', md: '14px' }, display: { xs: 'none', md: 'block' } }}>
                        {YouWhoID}
                    </Typography>
                    <Typography onClick={() => copyIdToClipBoard(YouWhoID)}
                        sx={{ cursor: 'pointer', fontSize: { xs: '10px', md: '14px' }, display: { xs: 'block', md: 'none' } }}>
                        {shorten(YouWhoID)}
                    </Typography>
                    <TickSquare style={{ size: { xs: '10px', md: '16px' }, display: idCopied ? 'block' : 'none', color: '#0Cb2B1' }} />
                </Box>
                : undefined}
            <Line sx={{ my: '12px' }} id='line-profile-user' />
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'end' }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <ButtonBorder onClick={() => setProgressBarOpen(!progressBarOpen)} bgcolor={'primary.main'}
                        fontColor={'white'}
                        prevIcon={<Setting2 size='16px' />}
                        text={'Progressive'} px={'26px'} br={'30px'} height={'25px'} w={'max-content'} />
                </Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <ButtonBorder onClick={() => setProgressBarOpen(!progressBarOpen)} bgcolor={'primary.main'}
                        prevIcon={<Setting2 size='16px' />}
                        fontColor={'white'}
                        px={'4px'}
                        py={'4px'}
                        br={'30px'} height={'25px'} w={'max-content'} />
                </Box>
            </Box>

        </Box>
    </ProBanner>);
}

export default ProfileCard;