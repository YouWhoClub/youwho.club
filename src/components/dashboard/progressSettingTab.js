import { Box, TextField, Typography } from "@mui/material";
import { ReactionCard, RelationCard, SubTab, SubTabs } from "../utils";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import FilterSelection from "../filterSelection";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DashBar from "./DashBar";


const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center'
}))

const ProgSettTab = () => {
    const globalUser = useSelector(state => state.userReducer)

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <DashBar username={globalUser.username} w={'100%'} />
        </Box>
    );
}

export default ProgSettTab;