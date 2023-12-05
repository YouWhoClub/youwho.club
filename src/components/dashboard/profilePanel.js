import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CreateNFT from "./createNFT";
import PrivateGallery from "./privateGallery";
import PublicGallery from "./publicGallery";
import { Tab, Tabs } from "../utils";
import RelationsTab from "./relationsTab";
import ReactionsTab from "./reactionsTab";
import AssetsTab from "./assets";
const Panel = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text,
    transition: '500ms ease', boxSizing: 'border-box',
    width: '100%',
    // borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',

}))
const ScrollablePanel = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text,
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
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
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex', width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between', width: '100%',
    alignItems: 'center',
}))

const ProfilePanel = () => {
    const [activeTab, setActiveTab] = useState('create-tab')
    useEffect(() => {
        let dashbar = window.document.getElementById('dash-bar')

        if (activeTab == "private-gallery-tab" || activeTab == "public-gallery-tab") {
            dashbar.classList.add("dashbarAfterScroll")
        } else {
            dashbar.classList.remove("dashbarAfterScroll")
        }
    }, [activeTab])
    return (
        <Panel
        // sx={{ py: { xs: 'unset', md: 1 }, px: { xs: 'unset', md: 2 } }}
        >
            <Tabs
                mb={'24px'}
                jc={{ xs: 'center', md: 'center' }}
            >
                <Tab id={"create-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Create Artwork'} selected={activeTab == 'create-tab'} />
                <Tab id={"private-gallery-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Private Gallery'} selected={activeTab == 'private-gallery-tab'} />
                <Tab id={"public-gallery-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Public Gallery'} selected={activeTab == 'public-gallery-tab'} />
                <Tab id={"assets-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Assets'} selected={activeTab == 'assets-tab'} />
                <Tab id={"relations-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Relations'} selected={activeTab == 'relations-tab'} />
                <Tab id={"reactions-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Reactions'} selected={activeTab == 'reactions-tab'} />
            </Tabs>
            <ScrollablePanel id="scrollable-profile-panel-inside"
                sx={{
                    height: {
                        xs: activeTab == 'private-gallery-tab' || activeTab == 'public-gallery-tab' ? 'calc(100vh - 351px)' : 'calc(100vh - 486px)',
                        sm: activeTab == 'private-gallery-tab' || activeTab == 'public-gallery-tab' ? 'calc(100vh - 366px)' : 'calc(100vh - 481px)',
                        md: 'calc(100vh - 378px)',
                        lg: 'calc(100vh - 334px)',
                    },
                    // height:'100%',
                    p: {
                        xs: '4px 4px 40px',
                        sm: '4px 4px 20px',
                    },
                    // p: '4px 4px 20px', 
                    boxSizing: 'border-box'
                    // pb: { xs: '50px', sm: '10px' },
                    // px: { xs: 1, sm: '22px' }
                }}>
                {activeTab == 'create-tab' && <CreateNFT />}
                {activeTab == 'private-gallery-tab' && <PrivateGallery />}
                {activeTab == 'public-gallery-tab' && <PublicGallery />}
                {activeTab == 'assets-tab' && <AssetsTab />}
                {activeTab == 'relations-tab' && <RelationsTab />}
                {activeTab == 'reactions-tab' && <ReactionsTab />}
            </ScrollablePanel>
        </Panel>
    );
}

export default ProfilePanel;