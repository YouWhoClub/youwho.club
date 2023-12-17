import blueNft from '../../assets/blue-nft.svg'
import pinkNFT from '../../assets/pink-nft.svg'
import purpleNFT from '../../assets/purple-nft.svg'
import creamNFT from '../../assets/cream-nft.svg'
import sorkhabiNFT from '../../assets/sokhabi-nft.svg'
import torqNFT from '../../assets/torqua-nft.svg'
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import NFTCard from "../nft market/nftCard";
import FilterSelection from '../filterSelection'
import { useEffect, useState } from 'react'
import { AscSelect, PVGalleryCard } from '../utils'
import { useSelector } from 'react-redux'
import ButtonPurple from '../buttons/buttonPurple'
import { useNavigate } from 'react-router'
import ButtonPurpleLight from '../buttons/buttonPurpleLight'
import { API_CONFIG } from '../../config'

const Gallery = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: "border-box", gap: '16px',
    display: 'flex', alignItems: 'center',
    flexWrap: 'wrap', justifyContent: 'center'
}))
const FlexRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    //  width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
}))
const FlexColumn = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between',
    //  width: '100%',
    alignItems: 'center',
}))


const PrivateGallery = ({ user, isFriend, sendFriendRequest }) => {
    const globalUser = useSelector(state => state.userReducer)
    const [galleries, setGalleries] = useState([])
    const [galleriesLoading, setGalleriesLoading] = useState(true)
    const [cancelToken, setCancelToken] = useState(null);
    const [openedGallery, setOpenedGallery] = useState(undefined)

    const shorten = (str) => {
        if (str)
            return str.length > 15 ? str.substring(0, 15) + '...' : str;
        return 'undefined'
    }

    const getUserPVGalleries = async () => {
        let request = await fetch(`${API_CONFIG.AUTH_API_URL}/gallery/get/all/for/${user.YouWhoID}/?from=0&to=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalUser.token}`,
            }
        })
        let response = await request.json()
        console.log(response, '966666')
        if (response.is_error == false) {
            setGalleries(response.data)
            setGalleriesLoading(false)
        }
    }

    useEffect(() => {
        if (globalUser.isLoggedIn && globalUser.token && isFriend && user) {
            getUserPVGalleries()
        }
    }, [globalUser.isLoggedIn, globalUser.token, isFriend, user])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {isFriend ?
                <FlexColumn sx={{ gap: { xs: '20px', sm: '24px' }, width: '100%' }}>
                    <Typography sx={{
                        textAlign: 'center', color: 'primary.darkGray',
                        fontSize: '12px', textTransform: 'capitalize'
                    }}>
                        Only Friends who joined by invitation code or by requestion to join by entrance fee will be able to view the desired gallery
                    </Typography>
                    <FlexRow sx={{ flexWrap: 'wrap', width: '100%', gap: '16px', flexDirection: { xs: 'column', md: 'row' } }}>
                        {galleries.map((gallery, index) => (
                            <PVGalleryCard setOpenedGallery={setOpenedGallery} gallery={gallery} title={gallery.gal_name} image={gallery.gallery_background} />
                        ))}
                    </FlexRow>
                </FlexColumn>
                :
                <FlexColumn sx={{ gap: { xs: '20px', sm: '30px' }, mb: '24px' }}>
                    <Typography sx={{ color: 'primary.text', fontSize: { xs: '12px', sm: '14px' }, textTransform: 'capitalize' }}>
                        Dear
                        <b>
                            &nbsp;
                            {globalUser.username}
                            &nbsp;
                        </b>
                        to see {user.username}'s private galleries , you must be their friend first
                    </Typography>
                    <ButtonPurpleLight text={'Request Friendship'} onClick={() => sendFriendRequest(user.YouWhoID, globalUser.cid)}
                        w={'max-content'}
                        px={'12px'}
                        height='35px' />
                </FlexColumn>
            }
        </Box>);
}

export default PrivateGallery;