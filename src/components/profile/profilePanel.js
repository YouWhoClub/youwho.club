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
    // overflowY: 'scroll',
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

const ProfilePanel = ({ user, isFriend, sendFriendRequest, isFollowing }) => {
    const [activeTab, setActiveTab] = useState(window.location.hash ? window.location.hash.replace('#', '') : 'private-gallery-tab')
    // useEffect(() => {
    //     let dashbar = window.document.getElementById('profile-bar-user')

    //     if (activeTab == "private-gallery-tab" || activeTab == "public-gallery-tab") {
    //         dashbar.classList.add("dashbarAfterScroll")
    //     } else {
    //         dashbar.classList.remove("dashbarAfterScroll")
    //     }
    // }, [activeTab])
    return (
        <Panel id="user-profile-panel">
            <Tabs
                mb={'24px'}
                jc={{ xs: 'start', md: 'center' }}
            >
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
                {/* <Tab id={"reactions-tab"} onClick={(e) => {setActiveTab(e.target.id)
                window.location.hash = `#${e.target.id}`}} text={'Reactions'} selected={activeTab == 'reactions-tab'} /> */}
            </Tabs>
            <ScrollablePanel id="scrollable-profile-panel-inside-user" className="insidePanelUserBeforeScroll"
                sx={{
                    // height: {
                    //     xs: 'calc(100vh - 572px)',
                    //     sm: 'calc(100vh - 382px)',
                    //     md: 'calc(100vh - 334px)',
                    //     // lg: 'calc(100vh - 334px)',
                    // },
                    display: 'flex', justifyContent: 'center', alignItems: 'start',
                    p: {
                        xs: '4px 4px 40px',
                        sm: '4px 4px 20px',
                    },
                    boxSizing: 'border-box'
                }}>
                {activeTab == 'assets-tab' &&
                    <OthersProfieAssetTab
                        sendFriendRequest={sendFriendRequest}
                        user={user} isFriend={isFriend} />}
                {activeTab == 'private-gallery-tab' &&
                    <PrivateGallery sendFriendRequest={sendFriendRequest}
                        user={user} isFriend={isFriend} isFollowing={isFollowing} />}
                {activeTab == 'public-gallery-tab' &&
                    <PublicGallery user={user} isFriend={isFriend} />}
                {activeTab == 'relations-tab' &&
                    <RelationsTab
                        sendFriendRequest={sendFriendRequest}
                        user={user} isFriend={isFriend} />}
                {/* {activeTab == 'reactions-tab' && <ReactionsTab />} */}
            </ScrollablePanel>
        </Panel>
    );
}

export default ProfilePanel;