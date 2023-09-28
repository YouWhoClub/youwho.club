import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { TickSquare } from "iconsax-react";
import { useState } from "react";

const ProPic = styled(Box)(({ theme }) => ({
    borderRadius: '50%',
    // borderColor: theme.palette.primary.gray, 
    //  border: '1px solid',
    width: '150px', height: '150px',
    background: theme.palette.primary.bgGradient
}))
const ProfileCard = ({ username, youwhoID }) => {
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
            bgcolor: 'secondary.middle',
            borderRadius: '24px',
            display: 'flex', alignItems: 'center', px: 3,
        }}>
        <ProPic />
        &nbsp;
        &nbsp;
        &nbsp;
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p>
                Welcome <span style={{ fontWeight: 500 }}>{username}</span>
            </p>
            {youwhoID ?
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography>YouWho ID :</Typography> <Typography onClick={() => copyIdToClipBoard(youwhoID)} sx={{ cursor: 'pointer', fontSize: { xs: '10px', sm: '14px' } }}>{shorten(youwhoID)}</Typography>
                    <TickSquare style={{ size: { xs: '10px', sm: '14px' }, display: idCopied ? 'block' : 'none', color: 'green' }} />
                </Box>
                : undefined}        </Box>
    </Box>);
}

export default ProfileCard;