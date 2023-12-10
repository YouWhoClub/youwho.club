import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { TickSquare } from "iconsax-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_CONFIG } from "../../config";
import { Face } from "@mui/icons-material";
import profileFace from '../../assets/face-pro.svg'
import { BG_URL, PUBLIC_URL } from "../../utils/utils";


const ProPic = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'center',
    borderRadius: '50%', justifyContent: 'center', backgroundRepeat: 'no-repeat', transition: '500ms ease'
}))
const ProBanner = styled(Box)(({ theme }) => ({
    borderRadius: '24px',
    display: 'flex', alignItems: 'center', boxSizing: 'border-box',
    boxShadow: theme.palette.primary.boxShadow, transition: '500ms ease'
}))
const ProfileCard = ({ user, }) => {
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
        id='profile-card-user'
        sx={{
            // width: '100%',
            height: { xs: '150px', md: '250px' },
            // px: 3, py: { xs: 2, md: 0 },
            padding: '20px',
            flexDirection: { xs: 'row' },
            background: () => user && user.banner ? `url('${API_CONFIG.API_URL}/${user.banner}') no-repeat center` : '#0Cb2B1',
            backgroundSize: 'cover'
        }}>
        <ProPic
            id='profile-pic-user'
            sx={{
                background: () => user && user.avatar ? `url('${API_CONFIG.API_URL}/${user.avatar}') no-repeat center` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                backgroundSize: 'cover', width: { xs: '100px', md: '200px' },
                height: { xs: '100px', md: '200px' },
            }}
        />
        &nbsp;
        &nbsp;
        &nbsp;
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
            <Typography sx={{
                fontWeight: 700, color: 'white', fontSize: { xs: '18px', md: '20px' }
            }}>
                {user && user.YouWhoID ? user.username : user && user.identifier}
            </Typography>
            {user.YouWhoID ?
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: { xs: '14px', md: '16px' } }}>YouWho ID :</Typography>
                    <Typography onClick={() => copyIdToClipBoard(user.YouWhoID)}
                        sx={{ cursor: 'pointer', fontSize: { xs: '12px', md: '14px' }, display: { xs: 'none', md: 'block' } }}>
                        {user.YouWhoID}
                    </Typography>
                    <Typography onClick={() => copyIdToClipBoard(user.YouWhoID)}
                        sx={{ cursor: 'pointer', fontSize: { xs: '12px', md: '14px' }, display: { xs: 'block', md: 'none' } }}>
                        {shorten(user.YouWhoID)}
                    </Typography>
                    <TickSquare style={{ size: { xs: '10px', md: '16px' }, display: idCopied ? 'block' : 'none', color: '#0Cb2B1' }} />
                </Box>
                : undefined}
        </Box>
    </ProBanner>);
}

export default ProfileCard;