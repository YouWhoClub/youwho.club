import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { TickSquare } from "iconsax-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_CONFIG } from "../../config";


const ProPic = styled(Box)(({ theme }) => ({
    borderRadius: '50%',
    // borderColor: theme.palette.primary.gray, 
    //  border: '1px solid',
    width: '150px', height: '150px',
    // background: theme.palette.primary.bgGradient
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
            return str.length > 10 ? str.substring(0, 7) + '...' : str;
        return 'undefined'
    }

    return (<Box
        sx={{
            // width: '100%',
            height: '250px',
            // bgcolor: 'secondary.middle',
            borderRadius: '24px',
            display: 'flex', alignItems: 'center', px: 3, py: { xs: 2, sm: 0 }, flexDirection: { xs: 'column', sm: 'row' },
            background: () => globalUser.banner ? `url('${API_CONFIG.API_URL}/${globalUser.banner}') no-repeat center` : '#8D80AD',
            backgroundSize: 'cover'
        }}>
        <ProPic
            sx={{
                background: () => globalUser.avatar ? `url('${API_CONFIG.API_URL}/${globalUser.avatar}') no-repeat center` : 'linear-gradient(180deg, rgba(83,38,132,1) 0%, rgba(248,244,227,1) 100%);',
                backgroundSize: 'cover'
            }}
        />
        &nbsp;
        &nbsp;
        &nbsp;
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ textShadow: '4px 5px 6px rgba(231,193,255,1)',fontWeight:600 ,color:'white'}}>
                Welcome <span style={{ fontWeight: 700 }}>{globalUser.cid ? globalUser.username : globalUser.identifier}</span>
            </p>
            {youwhoID ?
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography>YouWho ID :</Typography> <Typography onClick={() => copyIdToClipBoard(youwhoID)} sx={{ cursor: 'pointer', fontSize: { xs: '10px', sm: '14px' } }}>{shorten(youwhoID)}</Typography>
                    <TickSquare style={{ size: { xs: '10px', sm: '14px' }, display: idCopied ? 'block' : 'none', color: 'green' }} />
                </Box>
                : undefined}
        </Box>
    </Box>);
}

export default ProfileCard;