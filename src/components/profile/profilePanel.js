import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PrivateGallery from "./privateGallery";
import PublicGallery from "./publicGallery";
import { Tab, Tabs } from "../utils";
import RelationsTab from "./relationsTab";
import ReactionsTab from "./reactionsTab";
import OthersProfieAssetTab from "./assets";
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

const ProfilePanel = ({ user }) => {
    const [activeTab, setActiveTab] = useState('create-tab')
    useEffect(() => {
        let dashbar = window.document.getElementById('profile-bar')

        if (activeTab == "private-gallery-tab" || activeTab == "public-gallery-tab") {
            dashbar.classList.add("dashbarAfterScroll")
        } else {
            dashbar.classList.remove("dashbarAfterScroll")
        }
    }, [activeTab])
    return (
        <Panel>
            <Tabs
                mb={'32px'}
                jc={{ xs: 'center', md: 'center' }}
            >
                <Tab id={"private-gallery-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Private Gallery'} selected={activeTab == 'private-gallery-tab'} />
                <Tab id={"public-gallery-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Public Gallery'} selected={activeTab == 'public-gallery-tab'} />
                <Tab id={"assets-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Assets'} selected={activeTab == 'assets-tab'} />
                <Tab id={"relations-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Relations'} selected={activeTab == 'relations-tab'} />
                {/* <Tab id={"reactions-tab"} onClick={(e) => setActiveTab(e.target.id)} text={'Reactions'} selected={activeTab == 'reactions-tab'} /> */}
            </Tabs>
            <ScrollablePanel id="scrollable-profile-panel-inside"
                sx={{
                    height: {
                        xs: activeTab == 'private-gallery-tab' || activeTab == 'public-gallery-tab' ? 'calc(100vh - 351px)' : 'calc(100vh - 479px)',
                        sm: activeTab == 'private-gallery-tab' || activeTab == 'public-gallery-tab' ? 'calc(100vh - 366px)' : 'calc(100vh - 494px)',
                        md: 'calc(100vh - 350px)'
                    },
                    p: {
                        xs: '4px 4px 40px',
                        sm: '4px 4px 20px',
                    },
                    boxSizing: 'border-box'
                }}>
                {activeTab == 'assets-tab' && <OthersProfieAssetTab user={user} />}
                {activeTab == 'private-gallery-tab' && <PrivateGallery user={user} />}
                {activeTab == 'public-gallery-tab' && <PublicGallery user={user} />}
                {activeTab == 'relations-tab' && <RelationsTab user={user} />}
                {/* {activeTab == 'reactions-tab' && <ReactionsTab />} */}
            </ScrollablePanel>
        </Panel>
    );
}

export default ProfilePanel;