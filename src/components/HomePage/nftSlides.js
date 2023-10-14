import { Box } from "@mui/material";
import { Tab, TabSimple, Tabs, TabsSimple } from "../utils";
import { useState } from "react";
import GiftSlides from "./giftSlides";
import GallerySlide from "./gallerySlide";

const NFTSlides = () => {
    const [state, setState] = useState('gifts')
    return (<Box sx={{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',my:4,
        // px:'20px'
    }}>
        <TabsSimple>
            <TabSimple text={'Most Popular NFTs'} onClick={() => setState('nfts')} selected={state == 'nfts'} />
            <TabSimple text={'Gift Cards'} onClick={() => setState('gifts')} selected={state == 'gifts'} />
        </TabsSimple>
        {state == 'gifts' ?
            <GiftSlides /> : <GallerySlide />}
    </Box>);
}

export default NFTSlides;