import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { PUBLIC_API } from "../../utils/data/public_api"
import styled from "@emotion/styled"
import { Box, Skeleton, Typography } from "@mui/material"
import NFTCard from "../nft market/nftCard"

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: 'border-box',
    display: 'flex', columnGap: '10px',
    rowGap: '24px',
    flexWrap: 'wrap',
}))

const AllNFTsTab = () => {
    const globalUser = useSelector(state => state.userReducer)
    const [err, setErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const [NFTs, setNFTs] = useState(undefined)
    const getMainNFTs = async () => {
        setErr(undefined)
        try {
            apiCall.current = PUBLIC_API.request({
                path: `/get-all-minted-nfts/?from=0&to=30`,
                method: "get",
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            setNFTs(response.data.data)
        }
        catch (err) {
            setErr(err.statusText)
        }
    }

    useEffect(() => {
        getMainNFTs()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])



    return (
        <Gallery sx={{
            boxSizing: 'border-box', justifyContent: { xs: 'center', lg: 'start' }
        }}>
            {NFTs ?
                <>
                    {NFTs.length > 0 ?
                        <>
                            {NFTs.map((nft) => (<NFTCard nft={nft.nfts_data} col_data={nft.col_data} getNFTs={getMainNFTs} />
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
                </>
            }
        </Gallery>

    );
}

export default AllNFTsTab;