import { Box, TextField, Typography } from "@mui/material";
import { RelationCard, SubTab, SubTabs } from "../utils";
import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { AUTH_API } from "../../utils/data/auth_api";
import { useSelector } from "react-redux";
import ButtonPurpleLight from "../buttons/buttonPurpleLight";
import { useNavigate } from "react-router";
import generateSignature from "../../utils/signatureUtils";
import { API_CONFIG } from "../../config";
import API from "../../utils/api";
const FilterSelectionBox = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'start',
    border: '1px solid #DEDEDE',
    borderRadius: '18px',
    overflow: 'hidden',
    // height: '20px',
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.secondary.bg,
    width: '100%'
}))

const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center'
}))
const RelationsTab = ({ user }) => {
    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)
    const [activeTab, setActiveTab] = useState('my-allies')
    const [friendsLoading, setFriendsLoading] = useState(true)
    const [friends, setFriends] = useState([{ cid: '0xdd1bff2e074ddd0fbc8940fb01d3c8381be55609', username: 'javad' }])
    const [fans, setFans] = useState([
        { cid: '0xed2b3bdae27c24480f0676f43228a7981c42fdea', username: 'narni' },
        { cid: '0xf7cfcead481272b4a59d591cc1f6d97bf3ae470e', username: 'narnia' },
        { cid: '0xed2b3bdae27c24480f0676f43228a7981c42fdea', username: 'narni' },
        { cid: '0xf7cfcead481272b4a59d591cc1f6d97bf3ae470e', username: 'narnia' },
        { cid: '0xed2b3bdae27c24480f0676f43228a7981c42fdea', username: 'narni' },
        { cid: '0xf7cfcead481272b4a59d591cc1f6d97bf3ae470e', username: 'narnia' },
        { cid: '0xed2b3bdae27c24480f0676f43228a7981c42fdea', username: 'narni' },
        { cid: '0xf7cfcead481272b4a59d591cc1f6d97bf3ae470e', username: 'narnia' },
    ])
    const [suggestions, setSuggestions] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {user.username}'s relation tab

        </Box>
    );
}

export default RelationsTab;