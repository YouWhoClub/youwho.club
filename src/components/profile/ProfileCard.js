import styled from "@emotion/styled";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Setting, Setting2, TickSquare } from "iconsax-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_CONFIG } from "../../config";
import { Face } from "@mui/icons-material";
import profileFace from '../../assets/face-pro.svg'
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import ButtonBorder from "../buttons/buttonBorder";


const ProPic = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'center',
    borderRadius: '50%', justifyContent: 'center', backgroundRepeat: 'no-repeat', transition: '500ms ease'
}))
const ProBanner = styled(Box)(({ theme }) => ({
    borderRadius: '24px',
    display: 'flex', alignItems: 'center', boxSizing: 'border-box',
    boxShadow: theme.palette.primary.boxShadow, transition: '500ms ease'
}))
const Line = styled(Box)(({ theme }) => ({
    borderRadius: '24px',
    boxSizing: 'border-box',
    backgroundColor: 'white', transition: '500ms ease', height: '1px'
}))
const ProfileCard = ({ user, isFriend, setProgressBarOpen, progressBarOpen, sendFriendRequest, isFollowing }) => {
    const globalUser = useSelector(state => state.userReducer)
    console.log(isFollowing)
    const copyIdToClipBoard = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIdCopied('Copied!');
        } catch (err) {
            setIdCopied('Failed to copy!');
        }
    };
    const [idCopied, setIdCopied] = useState(false)
    const shorten = (str) => {
        if (str)
            return str.length > 15 ? str.substring(0, 15) + '...' : str;
        return 'undefined'
    }
    const year = new Date(user.created_at).getFullYear()
    const month = new Date(user.created_at).toLocaleString('default', { month: 'short' });

    return (<ProBanner
        id='profile-card-user'
        sx={{
            // width: '100%',
            gap: '20px',
            height: { xs: '150px', md: '200px' },
            // px: 3, py: { xs: 2, md: 0 },
            padding: '20px',
            flexDirection: { xs: 'row' },
            background: () => user && user.banner ? `url('${API_CONFIG.API_URL}/${user.banner}') no-repeat center` : '#0Cb2B1',
            backgroundSize: 'cover'
        }}>
        <ProPic
            id='profile-pic-user'
            sx={{
                background: () => user && user.avatar ? `url('${API_CONFIG.API_URL}/${user.avatar}') no-repeat center` : BG_URL(PUBLIC_URL(`${profileFace}`)),
                backgroundSize: 'cover', width: { xs: '80px', md: '170px' },
                height: { xs: '80px', md: '170px' },
            }}
        />
        <Box sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white',
            width: { xs: 'calc(100% - 100px)', md: `calc(100% - 200px)` },
        }}>
            <Typography sx={{
                fontWeight: 700, color: 'white', fontSize: { xs: '12px', sm: '20px', md: '32px' }
            }}>
                {user && user.YouWhoID ? user.username : user && user.identifier}
            </Typography>
            {user.YouWhoID ?
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: { xs: '10px', md: '16px' } }}>YouWho ID :</Typography>
                    <Typography onClick={() => copyIdToClipBoard(user.YouWhoID)}
                        sx={{
                            cursor: 'pointer', fontSize: { xs: '8px', sm: '12px', md: '18px' },
                            display: { xs: 'none', sm: 'block' }
                        }}>
                        {user.YouWhoID}
                    </Typography>
                    <Typography onClick={() => copyIdToClipBoard(user.YouWhoID)}
                        sx={{
                            cursor: 'pointer',
                            fontSize: { xs: '8px', sm: '12px', md: '18px' },
                            display: { xs: 'block', sm: 'none' }
                        }}>
                        {shorten(user.YouWhoID)}
                    </Typography>
                    <TickSquare style={{
                        size: { xs: '8px', sm: '12px', md: '18px' }
                        , display: idCopied ? 'block' : 'none', color: '#0Cb2B1'
                    }} />
                </Box>
                : undefined}
            <Line sx={{ my: '12px' }} id='line-profile-user' />
            <Box sx={{
                display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <ButtonBorder bgcolor={'secondary.bg'}
                    fontSize={{ xs: '8px', sm: '10px', md: '12px' }}
                    w={'max-content'}
                    text={`From ${month + year}`}
                    px={{ xs: '8px', sm: '12px', md: '26px' }} br={'30px'} height={{ xs: '12px', sm: '20px', md: '25px' }} />
                {isFriend && isFriend == 'true' ?
                    <>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <ButtonBorder onClick={() => setProgressBarOpen(!progressBarOpen)} bgcolor={'primary.main'}
                                fontColor={'white'}
                                prevIcon={<Setting2 size='16px' />}
                                text={'Progressive'}
                                px={'26px'} br={'30px'}
                                height={'25px'} w={'max-content'} />
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}>
                            <ButtonBorder onClick={() => setProgressBarOpen(!progressBarOpen)} bgcolor={'primary.main'}
                                prevIcon={<Setting2 size='16px' />}
                                fontColor={'white'}
                                px={'4px'}
                                py={'4px'}
                                br={'30px'} height={'25px'} w={'max-content'} />
                        </Box>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <ButtonBorder onClick={() => setProgressBarOpen(!progressBarOpen)} bgcolor={'primary.main'}
                                prevIcon={<Setting2 size='10px' />}
                                fontColor={'white'}
                                px={'4px'}
                                py={'4px'}
                                br={'30px'} height={'18px'} w={'max-content'} />
                        </Box>
                    </>
                    : isFriend && isFriend == 'false' ?
                        <>
                            {isFollowing == 'false' &&
                                <ButtonBorder bgcolor={'primary.main'}
                                    fontColor={'white'} onClick={() => sendFriendRequest(user.YouWhoID, globalUser.cid)}
                                    text={'Follow Request'} px={'26px'} br={'30px'} height={'25px'} w={'max-content'} />}
                            {isFollowing == 'pending' &&
                                <ButtonBorder bgcolor={'primary.main'}
                                    fontColor={'white'} disabled={true}
                                    text={'Pending'} px={'26px'} br={'30px'} height={'25px'} w={'max-content'} />
                            }
                        </>
                        :
                        <CircularProgress />
                }

            </Box>
        </Box>
    </ProBanner>);
}

export default ProfileCard;