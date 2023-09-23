import styled from "@emotion/styled";
import { Box } from "@mui/material";
const Panel = styled(Box)(({ theme }) => ({
    color: 'primary.text',
    // marginLeft: { xs: '0', sm: '20px' },
    width: '100%', borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    // boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',
}))
const Tabs = styled(Box)(({ theme }) => ({
    borderBottom: '1px solid', borderColor: theme.palette.primary.gray,
    width: '100%', display: 'flex', flexWrap: 'wrap',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
    },
    '&::-webkit-scrollbar-button': {
    },

}))
const Tab = styled(Box)(({ theme }) => ({
    boxShadow: 'inset 0px 0px 9px -2px rgba(227,209,231,0.9)', cursor: 'pointer',
    borderRadius: '40px', color: theme.palette.secondary.text, fontSize: '12px',
    margin: 1,
    padding: '0 10px',
    width: 'max-content',
    height: '30px', textAlign: 'center',
    display: 'flex', alignItems: 'center',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    }
}))
const ProfilePanel = () => {
    return (
        <Panel sx={{ p: { xs: 'unset', sm: 1 } }}>
            <Tabs
                sx={{ py: 1 }}
            >
                <Tab>Mint NFT</Tab>
                <Tab>Private Gallery</Tab>
                <Tab>Public Gallery</Tab>
                <Tab>Relations</Tab>
                <Tab>Reactions</Tab>
            </Tabs>
        </Panel>
    );
}

export default ProfilePanel;