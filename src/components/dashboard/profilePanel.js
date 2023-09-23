import styled from "@emotion/styled";
import { Box } from "@mui/material";
const Panel = styled(Box)(({ theme }) => ({
    color: 'primary.text',
    // marginLeft: { xs: '0', sm: '20px' },
    width: '100%', borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
}))
const ProfilePanel = () => {
    return (
        <Panel>
            <p>zadtan</p>
            <p>zadtan</p>
            <p>zadtan</p>
            <p>zadtan</p>
            <p>zadtan</p>
            <p>zadtan</p>
            <p>zadtan</p>
        </Panel>
    );
}

export default ProfilePanel;