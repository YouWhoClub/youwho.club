import { Box, Typography } from "@mui/material";
import Bar from "../components/Bar";
import PanelLayout from "../components/PanelLayout";
import blueNft from '../assets/blue-nft.svg'
import pinkNFT from '../assets/pink-nft.svg'
import purpleNFT from '../assets/purple-nft.svg'
import creamNFT from '../assets/cream-nft.svg'
import sorkhabiNFT from '../assets/sokhabi-nft.svg'
import torqNFT from '../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import NFTCard from "../components/nft market/nftCard";
import GiftCard from "../components/nft market/giftCard";
import { useEffect, useState } from "react";
// import { Title } from "../components/utils";
import ButtonOutline from "../components/buttons/buttonOutline";
import { useNavigate } from "react-router";
import { Profile, Wallet, Wallet2 } from "iconsax-react";
import ButtonPurpleLight from "../components/buttons/buttonPurpleLight";
import { Tab, Tabs } from "../components/utils";
import AllNFTsTab from "../components/explore/allNFTsTab";
import TopNFTsTab from "../components/explore/topNFTsTab";
import TopUsersTab from "../components/explore/topUsersTab";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
    // height: '100%',
    // overflowX: 'hidden',
    // overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
        width: '8px',
        background: 'white',
        border: '0.5px solid #846894',
        borderRadius: '20px !important'
    },

}))
const Outer = styled(Box)(({ theme }) => ({
    // height: 'calc(100vh - 55px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
const ShowPanel = styled(Box)(({ theme }) => ({
    transition: '500ms ease',
    display: 'flex',
    justifyContent: 'space-between',
}))
const Panel = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text,
    transition: '500ms ease', boxSizing: 'border-box',
    width: '100%',
    // borderRadius: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',


}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    alignItems: 'center',

}))

const TeachingBox = styled(Box)(({ theme }) => ({
    padding: '24px', boxSizing: 'border-box', height: '250px', width: '100%',
    display: 'flex', borderRadius: '24px', boxShadow: theme.palette.primary.boxShadow,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px'
}))
const EventBox = styled(Box)(({ theme }) => ({
    padding: '24px', boxSizing: 'border-box', height: '250px', width: '100%',
    display: 'flex', borderRadius: '24px', boxShadow: theme.palette.primary.boxShadow,
    color: theme.palette.primary.text,
    justifyContent: 'center',
    alignItems: 'center',

}))
const MainGallery = ({ switchTheme, theme }) => {
    const [dollarValue, setDollarValue] = useState(undefined)
    const [irrValue, setIrrValue] = useState(undefined)
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(window.location.hash ? window.location.hash.replace('#', '') : 'all-nfts')
    const globalUser = useSelector(state => state.userReducer)
    const listenScrollEvent = e => {
        let card = window.document.getElementById('commercials-box')
        let insidePanel = window.document.getElementById('scrollable-explore-panel-inside')
        let outsidePanel = window.document.getElementById('explore')
        if (window.document.getElementById("scrollable-explore-panel-inside").scrollTop > 0 || window.document.getElementById("scrollable-gallery-panel").scrollTop > 0) {
            card.classList.add("profileBannerAfterScroll")
            insidePanel.classList.remove("insidePanelExploreBeforeScroll")
            insidePanel.classList.add("insidePanelExploreAfterScroll")
        }
        else {
            card.classList.remove("profileBannerAfterScroll")
            insidePanel.classList.add("insidePanelExploreBeforeScroll")
            insidePanel.classList.remove("insidePanelExploreAfterScroll")
        }
    }
    const [progressBarOpen, setProgressBarOpen] = useState(false)

    useEffect(() => {
        if (window.document.getElementById("scrollable-gallery-panel") && window.document.getElementById("scrollable-explore-panel-inside")) {

            window.document.getElementById("scrollable-gallery-panel").addEventListener('scroll', listenScrollEvent)
            window.document.getElementById("scrollable-explore-panel-inside").addEventListener('scroll', listenScrollEvent)
        }
    }, [window.document.getElementById("scrollable-gallery-panel"), window.document.getElementById("scrollable-explore-panel-inside")])

    return (
        <PanelLayout progressBarOpen={progressBarOpen}
            setProgressBarOpen={setProgressBarOpen}
            switchTheme={switchTheme} theme={theme} id={"scrollable-gallery-panel"}>
            <Box
                id="explore"
                sx={{
                    ml: { xs: 'none', sm: '50px' },
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', sm: 'calc(100% - 50px)' },
                    height: 'calc(100vh - 55px)',
                    gap: { xs: '22px', md: '24px' },
                    boxSizing: 'border-box', padding: '20px 15px 40px'
                }}>
                <Box id="commercials-box"
                    sx={{
                        width: '100%',
                        flexDirection: { xs: 'column', md: 'row' },
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: { xs: '10px', md: '30px' }
                    }}>
                    {globalUser.bio && globalUser.avatar ?
                        <TeachingBox sx={{ bgcolor: 'primary.success' }} >
                            <Profile size={'150px'} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography sx={{ color: 'black', fontSize: { xs: '20px', md: '32px' }, mb: '18px' }}>
                                        1st Step
                                    </Typography>
                                    <Typography sx={{ color: 'black', fontSize: { xs: '16px', md: '20px' }, mb: '14px' }}>
                                        Complete Your Profile
                                    </Typography>
                                    <Typography sx={{
                                        color: 'black',
                                        fontWeight: 600,
                                        fontSize: { xs: '16px', md: '20px' }, mb: '14px'
                                    }}>
                                        Completed
                                    </Typography>

                                    <Typography sx={{
                                        textTransform: 'capitalize',
                                        color: '#616265', fontSize: { xs: '12px', md: '14px' }, fontFamily: 'Inter'
                                    }}>
                                        & got one YouWho token as a gift
                                    </Typography>
                                </Box>
                            </Box>
                        </TeachingBox> :
                        <TeachingBox sx={{ bgcolor: 'primary.yellow' }} >
                            <Profile size={'150px'} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography sx={{ color: 'black', fontSize: { xs: '20px', md: '32px' }, mb: '18px' }}>
                                        1st Step
                                    </Typography>
                                    <Typography sx={{ color: 'black', fontSize: { xs: '16px', md: '20px' }, mb: '14px' }}>
                                        Complete Your Profile
                                    </Typography>
                                    <Typography sx={{
                                        textTransform: 'capitalize',
                                        color: '#616265', fontSize: { xs: '12px', md: '14px' }, fontFamily: 'Inter'
                                    }}>
                                        & get one YouWho token as a gift
                                    </Typography>
                                </Box>
                                <ButtonPurpleLight
                                    onClick={() => setProgressBarOpen(true)}
                                    text={'Lets go'}
                                    w={'max-content'} px={'20px'} />
                            </Box>
                        </TeachingBox>}
                    {globalUser.cid ?
                        <TeachingBox sx={{ bgcolor: 'secondary.success' }}>
                            <Wallet2 size={'150px'} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography sx={{ color: 'black', fontSize: { xs: '20px', md: '32px' }, mb: '18px' }}>
                                        2nd Step
                                    </Typography>
                                    <Typography sx={{ color: 'black', fontSize: { xs: '16px', md: '20px' }, mb: '14px' }}>
                                        Create YouWho Wallet
                                    </Typography>
                                    <Typography sx={{
                                        color: 'black',
                                        fontWeight: 600,
                                        fontSize: { xs: '16px', md: '20px' }, mb: '14px'
                                    }}>
                                        Completed
                                    </Typography>
                                    <Typography sx={{
                                        textTransform: 'capitalize',
                                        color: '#616265', fontSize: { xs: '12px', md: '14px' }, fontFamily: 'Inter'
                                    }}>
                                        & got one YouWho token as a gift
                                    </Typography>
                                </Box>
                            </Box>

                        </TeachingBox> :
                        <TeachingBox sx={{ bgcolor: 'primary.pink' }}>
                            <Wallet2 size={'150px'} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography sx={{ color: 'black', fontSize: { xs: '20px', md: '32px' }, mb: '18px' }}>
                                        2nd Step
                                    </Typography>
                                    <Typography sx={{ color: 'black', fontSize: { xs: '16px', md: '20px' }, mb: '14px' }}>
                                        Create YouWho Wallet
                                    </Typography>
                                    <Typography sx={{
                                        textTransform: 'capitalize',
                                        color: '#616265', fontSize: { xs: '12px', md: '14px' }, fontFamily: 'Inter'
                                    }}>
                                        & get one YouWho token as a gift
                                    </Typography>
                                </Box>
                                <ButtonPurpleLight onClick={() => navigate('/wallet')} text={'Lets go'} w={'max-content'} px={'20px'} />
                            </Box>

                        </TeachingBox>}
                    {/* {globalUser.cid && globalUser.avatar && globalUser.bio ?
                        <EventBox sx={{ bgcolor: 'primary.slider', gap: { xs: '20px', sm: '30px' } }}>
                            <Box sx={{
                                backgroundImage: theme == 'light' ? "url('/p-outline.svg')" : "url('/w-outline.svg')",
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center', width: '150px', height: '150px'
                            }} />
                            <FlexColumn>
                                <Typography sx={{ fontSize: { xs: '16px', sm: '20px', md: '32px' } }}>
                                    Chatroom Launchpad
                                </Typography>
                                <Typography sx={{ fontSize: { xs: '12px', sm: '16px', md: '18px' } }}>
                                    Coming Soon...
                                </Typography>
                            </FlexColumn>
                        </EventBox> : undefined} */}
                </Box>
                <ShowPanel sx={{
                    flexDirection: 'column', gap: { xs: '22px', md: '24px' }, boxSizing: 'border-box', width: '100%'
                }}>
                    <Panel>
                        <Tabs
                            mb={'24px'}
                            jc={{ xs: 'start', md: 'center' }}
                        >
                            <Tab
                                text={`All NFTs`}
                                id={"all-nfts"}
                                onClick={(e) => {
                                    setActiveTab(e.target.id)
                                    window.location.hash = `#${e.target.id}`
                                }}
                                selected={activeTab == 'all-nfts'}
                            />
                            <Tab
                                text={`Top NFTs`}
                                id={"top-nfts"}
                                onClick={(e) => {
                                    setActiveTab(e.target.id)
                                    window.location.hash = `#${e.target.id}`
                                }}
                                selected={activeTab == 'top-nfts'}
                            />
                            <Tab
                                text={`New NFTs`}
                                id={"new-nfts"}
                                onClick={(e) => {
                                    setActiveTab(e.target.id)
                                    window.location.hash = `#${e.target.id}`
                                }}
                                selected={activeTab == 'new-nfts'}
                            />
                            <Tab
                                text={`Top YouWho Users`}
                                id={"top-users"}
                                onClick={(e) => {
                                    setActiveTab(e.target.id)
                                    window.location.hash = `#${e.target.id}`
                                }}
                                selected={activeTab == 'top-users'}
                            />
                        </Tabs>


                        <ScrollablePanel id="scrollable-explore-panel-inside" className="insidePanelExploreBeforeScroll"
                            sx={{
                                transition: '500ms ease',
                                // height: {
                                //     xs: 'calc(100vh - 483px)',
                                //     md: 'calc(100vh - 541px)'
                                // },
                                boxSizing: 'border-box',
                                p: 1, pb: { xs: '55px', sm: '20px' }
                            }}>
                            {activeTab == 'all-nfts' &&
                                <AllNFTsTab />
                            }
                            {activeTab == 'top-nfts' && <TopNFTsTab />}
                            {activeTab == 'new-nfts' && <AllNFTsTab />}
                            {activeTab == 'top-users' && <TopUsersTab />}
                        </ScrollablePanel>

                    </Panel>
                </ShowPanel>
            </Box>

            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick pauseOnFocusLoss pauseOnHover />

        </PanelLayout>

    );
}

export default MainGallery;