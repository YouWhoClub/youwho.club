import styled from "@emotion/styled";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowDown2 } from "iconsax-react";
import { useNavigate } from "react-router";
import { Close } from "@mui/icons-material";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import profileBar from '../assets/profileBar.png'
import walletBar from '../assets/walletBar.png'
import exploreBarImg from '../assets/exploreBar.png'
import createColGuide from '../assets/createColGuide.png'
import walletGuide from '../assets/walletGuide.png'
import pvGallGuide from '../assets/pvgallGuide.png'
import pbGallGuide from '../assets/pbgallGuide.png'
import sendReqGuide from '../assets/sendReqGuide.png'
import accReqGuide from '../assets/accReqGuide.png'
import resendReqGuide from '../assets/resendReqGuide.png'
import reactionGuide from '../assets/reactionGuide.png'
const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))
const Container = styled(Box)(({ theme }) => ({
    display: 'flex', boxSizing: 'border-box', flexDirection: 'column',
    padding: '10px 10px 42px 10px',
    borderRadius: '12px', width: '100%',
    backgroundColor: theme.palette.secondary.bg,
    boxShadow: theme.palette.primary.boxShadow,
}))
const Image = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.bgOp,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // backgroundSize: 'contain',
    // height: '250px',
    borderRadius: '15px', transition: '500ms ease',
}))


const GuidePage = ({ switchTheme, theme }) => {
    const navigate = useNavigate()
    return (
        <Box sx={{
            height: '100vh',
            width: '100%', display: 'flex', flexDirection: 'column',
            // justifyContent: 'center',
            bgcolor: 'primary.bg',
            boxSizing: 'border-box', padding: { xs: '0px 12px 10px 12px', md: '0px 12px 52px 12px' }
        }}>
            <Box sx={{ width: '100%', display: 'flex', height: { xs: '52px', md: '62px' }, alignItems: 'center', justifyContent: 'end' }}>
                <Close sx={{ color: 'primary.text', fontSize: { xs: '24px', md: '32px' }, cursor: 'pointer' }}
                    onClick={() => navigate(-1)} />
            </Box>
            {/* <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} /> */}
            <Wrapper>
                <Box sx={{
                    width: '100%',
                    boxSizing: 'border-box',
                    // padding: { xs: '12px 12px 0px 12px', md: '38px 38px 0px 38px' },
                    display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'primary.bg',
                    gap: { xs: '20px', md: '32px' }
                }}>
                    <Typography sx={{ color: 'primary.text', fontSize: { xs: '20px', md: '32px' } }}>Guide Page</Typography>
                    <Container sx={{
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        height: 'auto', maxHeight: '80vh',
                    }}>
                        <Accordion
                            sx={{
                                bgcolor: 'secondary.bg',
                                color: 'primary.text',
                                boxShadow: 'none !important',
                                borderRadius: '0px !important',
                            }}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 size='18px' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    borderBottom: '1px solid', borderColor: 'primary.gray', display: 'flex',
                                    alignItems: 'center', justifyContent: { xs: 'space-between', md: 'center !important' },
                                    height: { xs: '40px', md: '60px' }
                                }}
                            >
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: { xs: '12px', sm: '14px', md: '18px' }, }}>Explore Tab</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    borderRight: '1px solid', borderLeft: '1px solid', borderBottom: '1px solid', borderColor: 'primary.gray',
                                    transition: '500ms ease', borderRadius: '0px 0px 12px 12px', padding: { xs: '10px', md: '22px 16px' }, boxSizing: 'border-box'
                                }}
                            >
                                <Box sx={{
                                    width: '100%', gap: { xs: '14px', md: '22px' }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                }}>
                                    <Image sx={{
                                        width: { xs: '100%', md: '280px' },
                                        height: { xs: '250px', md: '280px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${exploreBarImg}`)),
                                        backgroundSize: 'contain',
                                        '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }

                                    }} />

                                    <Typography sx={{ fontFamily: 'Inter' }}>
                                        In this section, you can view active users and top-selling NFTs on YouWho, connect with them, and explore the most valuable world of NFTs. This section includes All NFTs, Top NFTs, New NFTs and Top YouWho Users.
                                    </Typography>
                                </Box>

                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            sx={{
                                bgcolor: 'secondary.bg',
                                color: 'primary.text',
                                boxShadow: 'none !important',
                                borderRadius: '0px !important',
                            }}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 size='18px' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    borderBottom: '1px solid', borderColor: 'primary.gray', display: 'flex',
                                    alignItems: 'center', justifyContent: { xs: 'space-between', md: 'center !important' },
                                    height: { xs: '40px', md: '60px' }
                                }}
                            >
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: { xs: '12px', sm: '14px', md: '18px' }, }}>Wallet Tab</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    borderRight: '1px solid', borderLeft: '1px solid', borderBottom: '1px solid', borderColor: 'primary.gray',
                                    transition: '500ms ease', borderRadius: '0px 0px 12px 12px', padding: { xs: '10px', md: '22px 16px' }, boxSizing: 'border-box'
                                }}
                            >
                                <Box sx={{
                                    width: '100%', gap: { xs: '14px', md: '22px' }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                }}>
                                    <Image sx={{
                                        width: { xs: '100%', md: '280px' },
                                        height: { xs: '250px', md: '280px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${walletBar}`)),
                                        backgroundSize: 'contain'
                                    }} />

                                    <Typography sx={{ fontFamily: 'Inter' }}>
                                        The process of creating a wallet has only one step: choose a username for yourself, and your wallet will be created.
                                    </Typography>
                                    <Image sx={{
                                        width: { xs: '100%', md: '300px' },
                                        height: { xs: '250px', md: '300px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${walletGuide}`)),
                                        backgroundSize: 'cover', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                </Box>

                            </AccordionDetails>
                        </Accordion>


                        <Accordion
                            sx={{
                                bgcolor: 'secondary.bg',
                                color: 'primary.text',
                                boxShadow: 'none !important',
                                borderRadius: '0px !important',
                            }}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 size='18px' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    borderBottom: '1px solid', borderColor: 'primary.gray', display: 'flex',
                                    alignItems: 'center', justifyContent: { xs: 'space-between', md: 'center !important' },
                                    height: { xs: '40px', md: '60px' }
                                }}
                            >
                                <Typography
                                    sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: { xs: '12px', sm: '14px', md: '18px' }, }}>
                                    Profile Tab
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    borderRight: '1px solid', borderLeft: '1px solid', borderBottom: '1px solid', borderColor: 'primary.gray',
                                    transition: '500ms ease', borderRadius: '0px 0px 12px 12px', padding: { xs: '10px', md: '22px 16px' }, boxSizing: 'border-box'
                                }}
                            >
                                <Box sx={{
                                    width: '100%', gap: { xs: '14px', md: '22px' }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                }}>
                                    <Image sx={{
                                        width: { xs: '100%', md: '280px' },
                                        height: { xs: '250px', md: '280px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${profileBar}`)),
                                        backgroundSize: 'contain', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                    <Typography sx={{ fontFamily: 'Inter' }}>
                                        Create artwork tab has two main sections: creating a collection and creating an NFT. In any case, you should start with creating a collection. To create a collection, you need to fill out the following fields:
                                        <br />Name:
                                        <br />Name of the NFT contract. Cannot be changed later.
                                        <br />symbol
                                        <br />Symbol of the NFT contract. Cannot be changed later.
                                        <br />owner_address
                                        <br />The contract owner address. If you wish to own the contract, then set it as your wallet address
                                        <br />Royalty share:
                                        <br />Enter the perpetual royalty percentage you want to receive from each NFT sale. It is advisable to consider a percentage between 1% up to 5%.
                                        <br />Royalties Address:
                                        <br />Enter your or the collection creator public key in this section.
                                    </Typography>
                                    <Image sx={{
                                        width: { xs: '100%', md: '300px' },
                                        height: { xs: '250px', md: '300px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${createColGuide}`)),
                                        backgroundSize: 'cover', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                </Box>

                            </AccordionDetails>
                        </Accordion>

                        <Accordion
                            sx={{
                                bgcolor: 'secondary.bg',
                                color: 'primary.text',
                                boxShadow: 'none !important',
                                borderRadius: '0px !important',
                            }}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 size='18px' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    borderBottom: '1px solid', borderColor: 'primary.gray', display: 'flex',
                                    alignItems: 'center', justifyContent: { xs: 'space-between', md: 'center !important' },
                                    height: { xs: '40px', md: '60px' }
                                }}
                            >
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: { xs: '12px', sm: '14px', md: '18px' }, }}>Profile Tab,Private Gallery</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    borderRight: '1px solid', borderLeft: '1px solid', borderBottom: '1px solid', borderColor: 'primary.gray',
                                    transition: '500ms ease', borderRadius: '0px 0px 12px 12px', padding: { xs: '10px', md: '22px 16px' }, boxSizing: 'border-box'
                                }}
                            >
                                <Box sx={{
                                    width: '100%', gap: { xs: '14px', md: '22px' }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                }}>
                                    <Image sx={{
                                        width: { xs: '100%', md: '280px' },
                                        height: { xs: '250px', md: '280px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${profileBar}`)),
                                        backgroundSize: 'contain', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                    <Typography sx={{ fontFamily: 'Inter' }}>
                                        only friends joined by invitation link or by paying entrance fee will be able to view the desired gallery.
                                    </Typography>
                                    <Image sx={{
                                        width: { xs: '100%', md: '300px' },
                                        height: { xs: '250px', md: '300px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${pvGallGuide}`)),
                                        backgroundSize: 'contain', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                </Box>

                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            sx={{
                                bgcolor: 'secondary.bg',
                                color: 'primary.text',
                                boxShadow: 'none !important',
                                borderRadius: '0px !important',
                            }}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 size='18px' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    borderBottom: '1px solid', borderColor: 'primary.gray', display: 'flex',
                                    alignItems: 'center', justifyContent: { xs: 'space-between', md: 'center !important' },
                                    height: { xs: '40px', md: '60px' }
                                }}
                            >
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: { xs: '12px', sm: '14px', md: '18px' }, }}>Profile Tab,Public Gallery</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    borderRight: '1px solid', borderLeft: '1px solid', borderBottom: '1px solid', borderColor: 'primary.gray',
                                    transition: '500ms ease', borderRadius: '0px 0px 12px 12px', padding: { xs: '10px', md: '22px 16px' }, boxSizing: 'border-box'
                                }}
                            >
                                <Box sx={{
                                    width: '100%', gap: { xs: '14px', md: '22px' }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                }}>

                                    <Typography sx={{ fontFamily: 'Inter' }}>Collections whose NFTs have been minted by the owner or others are displayed here.
                                    </Typography>
                                    <Image sx={{
                                        width: { xs: '100%', md: '300px' },
                                        height: { xs: '250px', md: '300px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${pbGallGuide}`)),
                                        backgroundSize: 'contain', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                </Box>

                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            sx={{
                                bgcolor: 'secondary.bg',
                                color: 'primary.text',
                                boxShadow: 'none !important',
                                borderRadius: '0px !important',
                            }}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 size='18px' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    borderBottom: '1px solid', borderColor: 'primary.gray', display: 'flex',
                                    alignItems: 'center', justifyContent: { xs: 'space-between', md: 'center !important' },
                                    height: { xs: '40px', md: '60px' }
                                }}
                            >
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: { xs: '12px', sm: '14px', md: '18px' }, }}>Profile Tab,Relations</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    borderRight: '1px solid', borderLeft: '1px solid', borderBottom: '1px solid', borderColor: 'primary.gray',
                                    transition: '500ms ease', borderRadius: '0px 0px 12px 12px', padding: { xs: '10px', md: '22px 16px' }, boxSizing: 'border-box'
                                }}
                            >
                                <Box sx={{
                                    width: '100%', gap: { xs: '14px', md: '22px' }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                }}>

                                    <Typography sx={{ fontFamily: 'Inter' }}>
                                        This section is a prerequisite for entering the NFT minting world and can only be done by you and your friends. In YoWho, you become friends with someone only when both of you have gone through these three stages. By sending and accepting a mutual friend request, you become friends, allowing you to enter each other's private galleries and subsequently view and respond to each other's NFTs. This process can be done like so:
                                    </Typography>
                                    <Image sx={{
                                        width: { xs: '100%', md: '300px' },
                                        height: { xs: '250px', md: '300px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${sendReqGuide}`)),
                                        backgroundSize: 'contain', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                    <Image sx={{
                                        width: { xs: '100%', md: '300px' },
                                        height: { xs: '250px', md: '300px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${accReqGuide}`)),
                                        backgroundSize: 'contain', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                    <Image sx={{
                                        width: { xs: '100%', md: '300px' },
                                        height: { xs: '250px', md: '300px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${resendReqGuide}`)),
                                        backgroundSize: 'contain', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                </Box>

                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            sx={{
                                bgcolor: 'secondary.bg',
                                color: 'primary.text',
                                boxShadow: 'none !important',
                                borderRadius: '0px !important',
                            }}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 size='18px' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    borderBottom: '1px solid', borderColor: 'primary.gray', display: 'flex',
                                    alignItems: 'center', justifyContent: { xs: 'space-between', md: 'center !important' },
                                    height: { xs: '40px', md: '60px' }
                                }}
                            >
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: { xs: '12px', sm: '14px', md: '18px' }, }}>Profile Tab,Reactions</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    borderRight: '1px solid', borderLeft: '1px solid', borderBottom: '1px solid', borderColor: 'primary.gray',
                                    transition: '500ms ease', borderRadius: '0px 0px 12px 12px', padding: { xs: '10px', md: '22px 16px' }, boxSizing: 'border-box'
                                }}
                            >
                                <Box sx={{
                                    width: '100%', gap: { xs: '14px', md: '22px' }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                }}>

                                    <Typography sx={{ fontFamily: 'Inter' }}>
                                        All your interactions with your friends and also their reactions are displayed in this section. Actions include likes, comments, requests, invitations, and other engagements between you and your friends.                                    </Typography>
                                    <Image sx={{
                                        width: { xs: '100%', md: '300px' },
                                        height: { xs: '250px', md: '300px' },
                                        backgroundImage: BG_URL(PUBLIC_URL(`${reactionGuide}`)),
                                        backgroundSize: 'contain', '&:hover': {
                                            width: { xs: '100%', md: '400px' }, height: { xs: '100%', md: '400px' }
                                        }
                                    }} />
                                </Box>

                            </AccordionDetails>
                        </Accordion>

                    </Container>
                    {/* <Footer /> */}

                </Box>
            </Wrapper >
        </Box >
    );
}

export default GuidePage;