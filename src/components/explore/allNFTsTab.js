import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { PUBLIC_API } from "../../utils/data/public_api"
import styled from "@emotion/styled"
import { Box, Skeleton, Typography } from "@mui/material"
import NFTCard from "../nft market/nftCard"
import Pagination from "../pagination"
import { SearchNormal1 } from "iconsax-react"
import { Close } from "@mui/icons-material"

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: 'border-box',
    display: 'flex', columnGap: '10px',
    rowGap: '24px',
    flexWrap: 'wrap',
}))
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
const AllNFTsTab = () => {
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(30)
    const [pgTabs, setPgTabs] = useState([1])
    const [selectedTab, setSelectedTab] = useState(1)
    const globalUser = useSelector(state => state.userReducer)
    const [err, setErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const [NFTs, setNFTs] = useState(undefined)
    const getMainNFTs = async () => {
        setErr(undefined)
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/get-all-minted-nfts/?from=${from}&to=${to}`,
                method: "get",
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            // setNFTs(response.data.data)


            let nftsArr = response.data.data.slice((selectedTab - 1) * 15, ((selectedTab - 1) * 15) + 15)
            setNFTs(nftsArr)
            if (response.data.data.length >= 15) {
                let pagTabs = []
                let tabNums = response.data.data.length / 15
                for (let i = 0; i < tabNums; i++) {
                    pagTabs.push(i + 1)
                }
                setPgTabs(pagTabs)
                console.log(tabNums)
                console.log(pagTabs)
            } else {
                console.log('getting nfts !')
            }
        }
        catch (err) {
            setErr(err.statusText)
        }
    }
    useEffect(() => {
        // setFrom((selectedTab - 1) * 15)
        setTo((((selectedTab - 1) * 15) + 15) + 15)
    }, [selectedTab])
    useEffect(() => {
        getMainNFTs()
    }, [to])
    useEffect(() => {
        getMainNFTs()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])
    const [searchResults, setsearchResults] = useState(undefined)
    const [searchQ, setSearchQ] = useState('')

    const search = async (q, from, to) => {
        if (searchQ == '') {
            setsearchResults(undefined)
            return
        }
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/search/?q=${q}&from=${from}&to=${to}`,
                method: 'get',
            });
            let response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            console.log(response)
            setsearchResults(response.data.data.nfts)
        }
        catch (err) {
            if (err.status == 404) {
                setsearchResults([])
            } else {
                setsearchResults(undefined)
            }
        }

    }

    return (<Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        boxSizing: 'border-box', gap: '24px'
    }}>
        <FilterSelectionBox sx={{ padding: '8px 16px', maxWidth: '480px' }}>
            <span style={{ width: 'max-content', fontSize: '14px' }}>
                Search:
            </span>
            <input style={{
                marginLeft: '5px',
                height: '20px',
                backgroundColor: 'transparent', border: 'none', outline: 'none',
                color: '#c2c2c2', width: '100%'
            }}
                value={searchQ}
                onChange={(e) => {
                    search(e.target.value, 0, 50)
                    setSearchQ(e.target.value)
                }} />
            {searchQ == undefined || searchQ == '' ?
                <SearchNormal1 cursor={'pointer'} size={'20px'} />
                : <Close sx={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => setSearchQ('')} />}
        </FilterSelectionBox>
        <Gallery sx={{
            boxSizing: 'border-box', justifyContent: { xs: 'center', lg: 'center' }
        }}>
            {searchResults ? <>{searchResults.length > 0 ?
                <>
                    {searchResults.map((nft) => (<NFTCard key={nft.nfts_data.id} nft={nft.nfts_data} col_data={nft.col_data} getNFTs={getMainNFTs} />
                    ))}
                </>
                :
                <Box sx={{ width: '100%', height: '180px', display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: 'secondary.text', fontSize: '13px', textAlign: 'center', width: '100%' }}>
                        No result
                    </Typography>
                </Box>
            }</>
                :
                <>
                    {NFTs ?
                        <>
                            {NFTs.length > 0 ?
                                <>
                                    {NFTs.map((nft) => (<NFTCard key={nft.nfts_data.id} nft={nft.nfts_data} col_data={nft.col_data} getNFTs={getMainNFTs} />
                                    ))}
                                </>
                                :
                                <Box sx={{ width: '100%', height: '180px', display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ color: 'secondary.text', fontSize: '13px', textAlign: 'center', width: '100%' }}>
                                        No NFTs Yet
                                    </Typography>
                                </Box>
                            }
                        </>
                        :
                        <>
                            <Box sx={{ width: '280px', height: '220px', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ borderRadius: '16px', }} width={'280px'} height={'220px'} />
                            </Box>
                            <Box sx={{ width: '280px', height: '220px', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ borderRadius: '16px', }} width={'280px'} height={'220px'} />
                            </Box>
                            <Box sx={{ width: '280px', height: '220px', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ borderRadius: '16px', }} width={'280px'} height={'220px'} />
                            </Box>
                            <Box sx={{ width: '280px', height: '220px', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ borderRadius: '16px', }} width={'280px'} height={'220px'} />
                            </Box>
                            <Box sx={{ width: '280px', height: '220px', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ borderRadius: '16px', }} width={'280px'} height={'220px'} />
                            </Box>
                            <Box sx={{ width: '280px', height: '220px', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ borderRadius: '16px', }} width={'280px'} height={'220px'} />
                            </Box>
                            <Box sx={{ width: '280px', height: '220px', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ borderRadius: '16px', }} width={'280px'} height={'220px'} />
                            </Box>
                            <Box sx={{ width: '280px', height: '220px', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ borderRadius: '16px', }} width={'280px'} height={'220px'} />
                            </Box>
                        </>
                    }</>}
        </Gallery>
        {NFTs && NFTs.length > 0 ?
            <Pagination tabs={pgTabs} selected={selectedTab} setSelectedTab={setSelectedTab} />
            : undefined}
    </Box>

    );
}

export default AllNFTsTab;