import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CreateNFT from "./create";
import CreateMedia from "./createArtwork";
import PrivateGallery from "./privateGallery";
import PublicGallery from "./publicGallery";
import { Tab, Tabs } from "../utils";
import RelationsTab from "./relationsTab";
import ReactionsTab from "./reactionsTab";
import AssetsTab from "./assets";
import ProgSettTab from "./progressSettingTab";
const Panel = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text,
    transition: '500ms ease', boxSizing: 'border-box',
    width: '100%',
    // borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',

}))
const ScrollablePanel = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text,
    width: '100%', transition: '500ms ease',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
        width: '3px',
        background: 'transparent',
        border: 'none',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-thumb': {
        width: '3px',
        height: '3px',
        background: '#9747ff',
        border: '0.5px solid #9747ff',
        borderRadius: '20px !important'
    },
    '&::-webkit-scrollbar-button': {
        width: '1px',
        height: '1px',
        background: '#9747ff',
        border: '0.5px solid #C6BAC5',
        borderRadius: '50% !important'
    },
    "@media (max-width: 600px)": {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
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
    const [activeTab, setActiveTab] = useState(window.location.hash ? window.location.hash.replace('#', '') : 'create-tab')
    // useEffect(() => {
    //     let dashbar = window.document.getElementById('dash-bar')

    //     if (activeTab == "private-gallery-tab" || activeTab == "public-gallery-tab") {
    //         dashbar.classList.add("dashbarAfterScroll")
    //     } else {
    //         dashbar.classList.remove("dashbarAfterScroll")
    //     }
    // }, [activeTab])
    return (
        <Panel
            id="profile-panel-dash"
        // sx={{ py: { xs: 'unset', md: 1 }, px: { xs: 'unset', md: 2 } }}
        >
            <Tabs
                mb={'24px'}
                jc={{ xs: 'start', md: 'center' }}
            >
                <Tab id={"create-tab"} onClick={(e) => {
                    setActiveTab(e.target.id)
                    window.location.hash = `#${e.target.id}`
                }} text={'Create'} selected={activeTab == 'create-tab'} />
                {/* <Tab id={"create-media-tab"} onClick={(e) => {
                    setActiveTab(e.target.id)
                    window.location.hash = `#${e.target.id}`
                }} text={'Create Off-Chain Artwork'} selected={activeTab == 'create-media-tab'} /> */}
                <Tab id={"private-gallery-tab"} onClick={(e) => {
                    setActiveTab(e.target.id)
                    window.location.hash = `#${e.target.id}`
                }} text={'Private Gallery'} selected={activeTab == 'private-gallery-tab'} />
                <Tab id={"public-gallery-tab"} onClick={(e) => {
                    setActiveTab(e.target.id)
                    window.location.hash = `#${e.target.id}`
                }} text={'Public Gallery'} selected={activeTab == 'public-gallery-tab'} />
                <Tab id={"assets-tab"} onClick={(e) => {
                    setActiveTab(e.target.id)
                    window.location.hash = `#${e.target.id}`
                }} text={'Assets'} selected={activeTab == 'assets-tab'} />
                <Tab id={"relations-tab"} onClick={(e) => {
                    setActiveTab(e.target.id)
                    window.location.hash = `#${e.target.id}`
                }} text={'Relations'} selected={activeTab == 'relations-tab'} />
                <Tab id={"reactions-tab"} onClick={(e) => {
                    setActiveTab(e.target.id)
                    window.location.hash = `#${e.target.id}`
                }} text={'Reactions'} selected={activeTab == 'reactions-tab'} />
            </Tabs>
            <ScrollablePanel
                id="scrollable-profile-panel-inside"
                className="insidePanelBeforeScroll"
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'start',
                    p: {
                        xs: '4px 4px 40px',
                        sm: '4px 4px 20px',
                    },
                    boxSizing: 'border-box', transition: '500ms ease',
                }}>
                {activeTab == 'create-tab' && <CreateNFT setMainActiveTab={setActiveTab} />}
                {activeTab == 'create-media-tab' && <CreateMedia setMainActiveTab={setActiveTab} />}
                {activeTab == 'private-gallery-tab' && <PrivateGallery />}
                {activeTab == 'public-gallery-tab' && <PublicGallery />}
                {activeTab == 'assets-tab' && <AssetsTab />}
                {activeTab == 'relations-tab' && <RelationsTab />}
                {activeTab == 'reactions-tab' && <ReactionsTab />}
                {/* {activeTab == 'settings' && <ProgSettTab />} */}
            </ScrollablePanel>
        </Panel>
    );
}

export default ProfilePanel;