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
    borderRadius: '50%', justifyContent: 'center', backgroundRepeat: 'no-repeat',transition:'500ms ease'
}))
const ProBanner = styled(Box)(({ theme }) => ({
    borderRadius: '24px',
    display: 'flex', alignItems: 'center',
    boxShadow: theme.palette.primary.boxShadow,transition:'500ms ease'
}))
const ProfileCard = ({ username, youwhoID }) => {
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
            height: { xs: '150px', sm: '250px' },
            px: 3, py: { xs: 2, sm: 0 }, flexDirection: { xs: 'row' },
            background: () => globalUser.banner ? `url('${API_CONFIG.API_URL}/${globalUser.banner}') no-repeat center` : '#0Cb2B1',
            backgroundSize: 'cover'
        }}>
        <ProPic
            id='profile-pic'
            sx={{
                background: () => globalUser.avatar ? `url('${API_CONFIG.API_URL}/${globalUser.avatar}') no-repeat center` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                backgroundSize: 'cover', width: { xs: '70px', sm: '150px' },
                height: { xs: '70px', sm: '150px' },
            }}
        />
        &nbsp;
        &nbsp;
        &nbsp;
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
            <p style={{
                //  textShadow: '4px 5px 6px rgba(231,193,255,1)',
                fontWeight: 600, color: 'white'
            }}>
                Welcome <span style={{ fontWeight: 700, fontSize: '20px' }}>{globalUser.cid ? globalUser.username : globalUser.identifier}</span>
            </p>
            {youwhoID ?
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 700 }}>YouWho ID :</Typography> <Typography onClick={() => copyIdToClipBoard(youwhoID)}
                        sx={{ cursor: 'pointer', fontSize: { xs: '12px', sm: '14px' } }}>{youwhoID}</Typography>
                    <TickSquare style={{ size: { xs: '10px', sm: '16px' }, display: idCopied ? 'block' : 'none', color: '#0Cb2B1' }} />
                </Box>
                : undefined}
        </Box>
    </ProBanner>);
}

export default ProfileCard;