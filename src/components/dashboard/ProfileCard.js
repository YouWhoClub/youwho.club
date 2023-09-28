import styled from "@emotion/styled";
import { Box } from "@mui/material";

const ProPic = styled(Box)(({ theme }) => ({
    borderRadius: '50%', borderColor: theme.palette.primary.dark, width: '150px', height: '150px', border: '1px solid'
}))
const ProfileCard = ({ username, youwhoID }) => {
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
                <p style={{ fontSize: '14px' }}>
                    YouWho ID : {youwhoID}
                </p>
                : undefined}
        </Box>
    </Box>);
}

export default ProfileCard;