import { Box } from "@mui/material";
import { Tab, TabSimple, Tabs, TabsSimple } from "../utils";
import { useState } from "react";
import GiftSlides from "./giftSlides";
import GallerySlide from "./gallerySlide";
import NewestSlide from "./newestSlide";
import ButtonPurple from "../buttons/buttonPurple";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))



const NFTSlides = () => {
    const [state, setState] = useState('nfts')
    const navigate = useNavigate()
    const globalUser = useSelector(state => state.userReducer)

    return (
        <Wrapper>
            <Box sx={{ px: { xs: 0, md: '60px' } }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column', mb: '90px'
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            flexDirection: 'column', py: '70px',
                            // px:'20px'
                        }}
                        id="nft-examples">
                        <TabsSimple mb={{ xs: '44px', md: '33px' }}>
                            <TabSimple text={'Top NFTs'} onClick={() => setState('nfts')} selected={state == 'nfts'} />
                            <TabSimple text={'Newest NFTs'} onClick={() => setState('news')} selected={state == 'news'} />
                        </TabsSimple>
                        {state == 'news' ?
                            <NewestSlide /> : <GallerySlide />}
                    </Box>

                    <Box sx={{
                        display: 'flex', color: 'primary.text',
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        width: '100%', my: '30px'
                    }}>
                        <ButtonPurple  text={'View All'} onClick={() => navigate(globalUser.isLoggedIn ? '/gallery' : '/main-gallery')} px={'10px'} />
                    </Box>
                </Box>
            </Box>
        </Wrapper>
    );
}

export default NFTSlides;