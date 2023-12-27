import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import bgimg from '../assets/bgBlg.png'
import styled from "@emotion/styled";
import img from '../assets/cardBackground.png'
import Pagination from "../components/pagination";
import { useState } from "react";
import ButtonPurple from "../components/buttons/buttonPurple";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router";

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
    boxSizing: 'border-box',
    backgroundImage: BG_URL(PUBLIC_URL(`${img}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
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
    "@media (max-width: 768px)": {
        fontSize: '16px'
    },
}))
const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: '22px',
    color: theme.palette.secondary.text,
    "@media (max-width: 768px)": {
        fontSize: '14px'
    },
}))
const Description = styled(Typography)(({ theme }) => ({
    fontSize: '16px', width: '100%', textAlign: 'justify',
    color: theme.palette.primary.darkGray, fontFamily: 'Inter',
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
    const blogContents = [1, 2, 3, 4, 5, 6,]
    const [selectedTab, setSelectedTab] = useState(1)
    let pagTabs = []
    let tabNums = blogContents.length / 4
    for (let i = 0; i < tabNums; i++) {
        pagTabs.push(i + 1)
    }
    console.log(pagTabs)
    return (
        <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg'
        }}>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <Wrapper>
                <Box sx={{
                    width: '100%',
                    boxSizing: 'border-box', padding: { xs: '12px 12px 0px 12px', md: '38px 38px 0px 38px' },
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg', gap: { xs: '50px', md: '100px' }
                }}>
                    <Box sx={{
                        width: '100%',
                        height: { xs: '250px', md: '452px' },
                        backgroundImage: BG_URL(PUBLIC_URL(`${bgimg}`)), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                        display: 'flex', alignItems: 'end', justifyContent: 'end',
                        boxSizing: 'border-box', pb: { xs: '20px', sm: '80px' }, pr: { xs: '40px', sm: '100px' }
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
                                    height: '415px', width: '50%',
                                    borderRadius: index == 0 ? '48px 48px 0px 48px' :
                                        (((index + 1) % 4 == 0) || (((index + 1) + (4 * (selectedTab - 1))) == blogContents.length)) ? '0px 48px 48px 48px' :
                                            (index % 2 == 0) ? '48px 0px 0px 48px' :
                                                '0px 48px 48px 0px'
                                }} />
                                <BlogDetails sx={{ width: '50%', justifyContent: 'space-between', gap: '12px' }}>

                                    <Title >
                                        Title  {((index + 1) + (4 * (selectedTab - 1)))}
                                    </Title>
                                    <Subtitle>
                                        subtitle
                                    </Subtitle>
                                    <Description >
                                        content content content contentcontent contentcontent contentcontent contentcontent contentcontent contentcontent content
                                    </Description>
                                    <DateOfArticle>
                                        {new Date().toDateString()}
                                    </DateOfArticle>
                                    <FlexRow sx={{ justifyContent: 'end !important' }}>
                                        <ButtonPurple text={'Read More'} nextIcon={<ArrowForward />}
                                            w={'max-content'} onClick={() => navigate('/blogs/title')}
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
                            <BlogCardMobile onClick={() => navigate('/blogs/title')}>
                                <BlogImage sx={{
                                    width: '100%', height: '140px',
                                    borderRadius: '12px 12px 0px 0px'
                                }} />
                                <BlogDetails sx={{
                                    width: '100%', gap: '12px'
                                }}>
                                    <DateOfArticle>
                                        {new Date().toDateString()}
                                    </DateOfArticle>
                                    <Title>Title   {((index + 1) + (4 * (selectedTab - 1)))}</Title>

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



