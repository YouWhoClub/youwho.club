import styled from "@emotion/styled";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowDown2 } from "iconsax-react";
import { useNavigate } from "react-router";
import { Close } from "@mui/icons-material";

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

const GuidePage = ({ switchTheme, theme }) => {
    const navigate = useNavigate()
    return (
        <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg',
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
                    <Container>
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
                                <Typography sx={{ display: "flex", alignItems: "center", color: 'primary.text', fontSize: { xs: '12px', sm: '14px', md: '18px' }, }}>Dashboard Tab</Typography>
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
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
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
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
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
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
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
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
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
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
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
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
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
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
                                    <Typography>Image</Typography>
                                    <Typography>Content Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content ContentContent Content Content</Typography>
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