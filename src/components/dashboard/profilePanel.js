import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CreateNFT from "./createNFT";
import PrivateGallery from "./privateGallery";
import PublicGallery from "./publicGallery";
import { Tab, Tabs } from "../utils";
import RelationsTab from "./relationsTab";
import ReactionsTab from "./reactionsTab";
const Panel = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text,
    // marginLeft: { xs: '0', sm: '20px' },
    width: '100%', borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    // boxShadow: '0px 0px 9px -2px rgba(227,209,231,0.9)',

}))
const ScrollablePanel = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text,
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
    '&::-webkit-scrollbar': {
        // display: 'none',
        width: '5px',
        background: 'white',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-thumb': {
        width: '5px',
        height: '5px',
        background: '#846894',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-button': {
        width: '1px',
        height: '1px',
        background: '#846894',
        border: '0.5px solid #C6BAC5',
        borderRadius: '50% !important'

    },
}))

const ProfilePanel = () => {
    const [activeTab, setActiveTab] = useState('create-tab')
    return (
        <Panel sx={{ p: { xs: 'unset', md: 1 } }}>
            <Tabs
                mb={3}
                jc={{ xs: 'center', md: 'start' }}
            >
                <Tab id={"create-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Create Artwork'} selected={activeTab == 'create-tab'} />
                <Tab id={"private-gallery-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Private Gallery'} selected={activeTab == 'private-gallery-tab'} />
                <Tab id={"public-gallery-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Public Gallery'} selected={activeTab == 'public-gallery-tab'} />
                <Tab id={"relations-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Relations'} selected={activeTab == 'relations-tab'} />
                <Tab id={"reactions-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Reactions'} selected={activeTab == 'reactions-tab'} />
            </Tabs>
            <ScrollablePanel id="scrollable-profile-panel-inside"
                sx={{
                    height: {
                        xs: 'calc(100vh - 400px)',
                        md: 'calc(100vh - 300px)'
                    },
                    // height:'calc(100vh - 300px)',
                    mb: { xs: '50px', sm: 'unset' },
                    px: 1
                }}>
                {activeTab == 'create-tab' && <CreateNFT />}
                {activeTab == 'private-gallery-tab' && <PrivateGallery />}
                {activeTab == 'public-gallery-tab' && <PublicGallery />}
                {activeTab == 'relations-tab' && <RelationsTab />}
                {activeTab == 'reactions-tab' && <ReactionsTab />}
            </ScrollablePanel>
        </Panel>
    );
}

export default ProfilePanel;