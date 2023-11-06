import { Box } from "@mui/material";
import { Tab, TabSimple, Tabs, TabsSimple } from "../utils";
import { useState } from "react";
import GiftSlides from "./giftSlides";
import GallerySlide from "./gallerySlide";
import NewestSlide from "./newestSlide";

const NFTSlides = () => {
    const [state, setState] = useState('nfts')
    return (<Box
        sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column', my: 4,
            // px:'20px'
        }}
        id="nft-examples">
        <TabsSimple>
            <TabSimple text={'Top NFTs'} onClick={() => setState('nfts')} selected={state == 'nfts'} />
            <TabSimple text={'Newest NFTs'} onClick={() => setState('news')} selected={state == 'news'} />
        </TabsSimple>
        {state == 'news' ?
            <NewestSlide /> : <GallerySlide />}
    </Box>);
}

export default NFTSlides;