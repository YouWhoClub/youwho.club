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
import TheirAllies from "./TheirAllies";
import TheirFriends from "./TheirFriends";
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
    const [activeTab, setActiveTab] = useState('their-allies')
    const [suggestions, setSuggestions] = useState([])
    const [err, setErr] = useState(undefined)
    const navigate = useNavigate()
    const getRelations = async () => {
        console.log(user)
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/fan/get/relations/for/${user.YouWhoID}/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log('relations', response)

        if (!response.is_error) {
            console.log('relations', response)
        } else {
            console.log('relations', response)
        }
    }
    useEffect(() => {
        if (globalUser.token && user && user.YouWhoID) {
            getRelations()
        }
    }, [globalUser.token, user, user.YouWhoID])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <SubTabs jc={'center'}>
                <SubTab id={"their-allies"}
                    onClick={(e) => setActiveTab(e.target.id)}
                    text={'Allies'} selected={activeTab == 'their-allies'} />
                <SubTab id={"their-friends"}
                    onClick={(e) => setActiveTab(e.target.id)}
                    text={'Friends'} selected={activeTab == 'their-friends'} />
            </SubTabs>
            <FilterSelectionBox sx={{ padding: '8px 16px', my: '24px' }}>
                <span style={{ width: '180px', fontSize: '14px' }}>
                    Search Username:
                </span>
                <input style={{
                    height: '20px',
                    backgroundColor: 'transparent', border: 'none', outline: 'none',
                    color: '#c2c2c2', width: '100%'
                }} />
            </FilterSelectionBox>
            {activeTab == 'Allies' && <TheirAllies />}
            {activeTab == 'Friends' && <TheirFriends />}
        </Box>
    );
}

export default RelationsTab;