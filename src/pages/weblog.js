import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgimg from '../assets/xtrPageBanner.svg'
import styled from "@emotion/styled";
import img from '../assets/cardBackground.png'
import Pagination from "../components/pagination";
import { useState } from "react";
import ButtonPurple from "../components/buttons/buttonPurple";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { blogContents, shorten } from "../components/utils";
const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))
const FlexRow = styled(Box)(({ theme }) => ({
    width: '100%', boxSizing: 'border-box', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
}))
const BlogImage = styled(Box)(({ theme }) => ({
    // width: '50%',
    // height: '400px',
    backgroundColor: theme.palette.secondary.bg,
    boxSizing: 'border-box',
    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
}))
const BlogDetails = styled(Box)(({ theme }) => ({
    // width: '50%',
    padding: '50px',
    boxSizing: 'border-box', display: 'flex', alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'column',
    "@media (max-width: 600px)": {
        padding: '4px 10px 18px 10px', gap: '18px',
    },

}))
const BlogCardMobile = styled(Box)(({ theme }) => ({
    width: '100%', borderRadius: '12px',
    boxSizing: 'border-box', display: 'flex', alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary.bg, cursor: 'pointer',
    boxShadow: theme.palette.primary.boxShadow,
}))
const Title = styled(Typography)(({ theme }) => ({
    fontSize: '32px',
    color: theme.palette.primary.text,
    "@media (max-width: 1000px)": {
        fontSize: '24px'
    },
    "@media (max-width: 768px)": {
        fontSize: '16px'
    },
}))
const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: '22px',
    color: theme.palette.secondary.text,
    "@media (max-width: 1000px)": {
        fontSize: '18px'
    },
    "@media (max-width: 768px)": {
        fontSize: '14px'
    },
}))
const Description = styled(Typography)(({ theme }) => ({
    fontSize: '16px', width: '100%', textAlign: 'justify',
    color: theme.palette.primary.darkGray, fontFamily: 'Inter',
    "@media (max-width: 1000px)": {
        fontSize: '14px'
    },
    "@media (max-width: 768px)": {
        fontSize: '12px'
    },
}))
const DateOfArticle = styled(Typography)(({ theme }) => ({
    fontSize: '14px', width: '100%', textAlign: 'start',
    color: theme.palette.primary.gray, fontFamily: 'Inter',
    "@media (max-width: 768px)": {
        fontSize: '10px'
    },

}))

const Weblog = ({ switchTheme, theme }) => {
    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState(1)
    let pagTabs = []
    let tabNums = blogContents.length / 4
    for (let i = 0; i < tabNums; i++) {
        pagTabs.push(i + 1)
    }
    console.log(tabNums)
    return (
        <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg'
        }}>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <Wrapper sx={{textTransform:'capitalize'}}>
                <Box sx={{
                    width: '100%',
                    boxSizing: 'border-box', padding: { xs: '12px 12px 0px 12px', md: '38px 38px 0px 38px' },
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg', gap: { xs: '50px', md: '100px' }
                }}>
                    <Box sx={{
                        width: '100%', borderRadius: '24px',
                        height: { xs: '250px', md: '452px' },
                        backgroundImage: BG_URL(PUBLIC_URL(`${bgimg}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                        display: 'flex', alignItems: 'end', justifyContent: 'end',
                        boxSizing: 'border-box', pb: { xs: '25px', sm: '50px', md: '80px' }, pr: { xs: '30px', sm: '80px', md: '100px' }
                    }}>
                        <Typography variant="h1"
                            sx={{
                                textTransform: 'capitalize',
                                color: 'primary.text', fontWeight: 400, fontSize: { xs: '30px', sm: '40px', md: '96px' }
                            }}>
                            Weblogs
                        </Typography>
                    </Box>
                    <Box sx={{
                        boxSizing: 'border-box', width: '100%',
                        display: { xs: 'none', sm: 'flex' }, flexDirection: 'column',
                        alignItems: 'center', borderTop: '1px solid', borderColor: 'primary.gray', pt: '32px'
                    }}>
                        {blogContents.slice((selectedTab * 4) - 4, selectedTab * 4).map((cntnt, index) => (
                            <FlexRow sx={{ flexDirection: (index % 2 == 0) ? 'row' : 'row-reverse' }}>
                                <BlogImage sx={{
                                    backgroundImage: localStorage.getItem('theme') == 'light' ? BG_URL(PUBLIC_URL(`${cntnt.imageLight}`)) : BG_URL(PUBLIC_URL(`${cntnt.imageDark}`)),
                                    height: '415px', width: '50%',
                                    borderRadius: index == 0 ? '48px 48px 0px 48px' :
                                        (((index + 1) % 4 == 0) || (((index + 1) + (4 * (selectedTab - 1))) == blogContents.length)) ? '0px 48px 48px 48px' :
                                            (index % 2 == 0) ? '48px 0px 0px 48px' :
                                                '0px 48px 48px 0px'
                                }} />
                                <BlogDetails sx={{ width: '50%', justifyContent: 'space-between', gap: '12px' }}>
                                    <Title>
                                        {cntnt.title}
                                        {/* {((index + 1) + (4 * (selectedTab - 1)))} */}
                                    </Title>
                                    <Subtitle>
                                        {cntnt.subtitle}
                                    </Subtitle>
                                    <Description >
                                        {shorten(cntnt.shortDes, 100)}
                                    </Description>
                                    <DateOfArticle>
                                        {cntnt.date}
                                    </DateOfArticle>
                                    <FlexRow sx={{ justifyContent: 'end !important' }}>
                                        <ButtonPurple text={'Read More'} nextIcon={<ArrowForward />}
                                            w={'max-content'} onClick={() => navigate(`/blogs/${cntnt.id}/${cntnt.title}`)}
                                            px={'24px'} />
                                    </FlexRow>
                                </BlogDetails>
                            </FlexRow>
                        ))}
                    </Box>
                    <Box sx={{
                        boxSizing: 'border-box', width: '100%',
                        display: { xs: 'flex', sm: 'none' }, flexDirection: 'column',
                        alignItems: 'center', borderTop: '1px solid', borderColor: 'primary.gray', pt: '32px', gap: '18px'
                    }}>
                        {blogContents.slice((selectedTab * 4) - 4, selectedTab * 4).map((cntnt, index) => (
                            <BlogCardMobile onClick={() => navigate(`/blogs/${cntnt.id}/${cntnt.title}`)}>
                                <BlogImage sx={{
                                    backgroundImage: localStorage.getItem('theme') == 'light' ? BG_URL(PUBLIC_URL(`${cntnt.imageLight}`)) : BG_URL(PUBLIC_URL(`${cntnt.imageDark}`)),
                                    width: '100%', height: '150px',
                                    borderRadius: '12px 12px 0px 0px',
                                    borderBottom: '1px solid', borderColor: 'primary.gray'
                                }} />
                                <BlogDetails sx={{
                                    width: '100%', gap: '12px'
                                }}>
                                    <DateOfArticle>
                                        {cntnt.date}
                                    </DateOfArticle>
                                    <Title>
                                        {cntnt.title}
                                        {/* {((index + 1) + (4 * (selectedTab - 1)))} */}
                                    </Title>

                                </BlogDetails>
                            </BlogCardMobile>
                        ))}
                    </Box>
                    <FlexRow>
                        <Pagination tabs={pagTabs} selected={selectedTab} setSelectedTab={setSelectedTab} />
                    </FlexRow>
                    <Footer />
                </Box>
            </Wrapper>
        </Box >
    );
}

export default Weblog;



