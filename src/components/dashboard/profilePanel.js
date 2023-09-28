import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useState } from "react";
import MintNFTs from "./mintNFTs";
import PrivateGallery from "./privateGallery";
import PublicGallery from "./publicGallery";
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
    margin: '1px 3px',
    padding: '0 10px',
    width: 'max-content',
    height: '30px', textAlign: 'center',
    display: 'flex', alignItems: 'center',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    }
}))
const ProfilePanel = () => {
    const [activeTab, setActiveTab] = useState('mint-tab')
    return (
        <Panel sx={{ p: { xs: 'unset', sm: 1 } }}>
            <Tabs
                sx={{ py: 1 }}
            >
                <Tab id="mint-tab" onClick={(e) => setActiveTab(e.target.id)}>Mint NFT</Tab>
                <Tab id="private-gallery-tab" onClick={(e) => setActiveTab(e.target.id)}>Private Gallery</Tab>
                <Tab id="public-gallery-tab" onClick={(e) => setActiveTab(e.target.id)}>Public Gallery</Tab>
                <Tab id="relations-tab" onClick={(e) => setActiveTab(e.target.id)}>Relations</Tab>
                <Tab id="reactions-tab" onClick={(e) => setActiveTab(e.target.id)}>Reactions</Tab>
            </Tabs>
            <Box sx={{ width: '100%' }}>
                {activeTab == 'mint-tab' ? <MintNFTs /> :
                    activeTab == 'private-gallery-tab' ? <PrivateGallery />
                        : activeTab == 'public-gallery-tab' ? <PublicGallery /> :
                            <div>{activeTab}</div>
                }
            </Box>
        </Panel>
    );
}

export default ProfilePanel;