import { Box } from "@mui/material";
import { Tab, Tabs } from "../utils";
import { useState } from "react";
import GiftSlides from "./giftSlides";
import GallerySlide from "./gallerySlide";

const NFTSlides = () => {
    const [state, setState] = useState('gifts')
    return (<Box sx={{
        height: '100vh',
        bgcolor: 'primary.bg',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        // px:'20px'
    }}>
        <Tabs>
            <Tab text={'Most Popular NFTs'} onClick={() => setState('nfts')} selected={state == 'nfts'} />
            <Tab text={'Gift Cards'} onClick={() => setState('gifts')} selected={state == 'gifts'} />
        </Tabs>
        {state == 'gifts' ?
            <GiftSlides /> : <GallerySlide />}
    </Box>);
}

export default NFTSlides;