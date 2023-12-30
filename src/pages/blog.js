import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import imgbg from '../assets/Y-HUG-COIN.svg'
import { blogContents, shorten } from "../components/utils";
import Footer from "../components/Footer";
import { useParams } from "react-router";
const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))
const TopPic = styled(Box)(({ theme }) => ({
    width: '100%', height: '700px', borderRadius: '28px', position: 'relative',
    backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
    //  filter: 'blur(1px)',
    backgroundPosition: 'center',

    "@media (max-width: 600px)": {
        height: '330px', borderRadius: '16px',
    },

}))
const TitleWrapper = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    gap: '32px', backdropFilter: 'blur(5px)',
    width: 'max-content', padding: '24px 32px', borderRadius: '28px 28px 0px 0px', position: 'absolute',
    backgroundColor: theme.palette.primary.bgOp, bottom: 0, left: '50%', transform: 'translate(-50%, 0)',
    "@media (max-width: 600px)": {
        height: '100%', width: '100%', borderRadius: '16px',
    },

}))

const BlogSingle = ({ theme, switchTheme }) => {
    const params = useParams()
    const id = params.id
    const blog = blogContents.find(blg => blg.id == id)
    console.log(blog)

    console.log(id)
    return (
        <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg'
        }}>
            <Navbar navbarType={'radius'} theme={theme} switchTheme={switchTheme} />
            <Wrapper>
                <Box sx={{
                    width: '100%',
                    boxSizing: 'border-box', padding: { xs: '32px 4px 0px 4px', md: '38px 38px 0px 38px' },
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.bg',
                    gap: { xs: '50px', md: '100px' }
                }}>
                    <TopPic sx={{
                        overflow: 'hidden',
                        backgroundImage: localStorage.getItem('theme') == 'light' ? BG_URL(PUBLIC_URL(`${blog.imageLight}`)) : BG_URL(PUBLIC_URL(`${blog.imageDark}`)),
                        bgcolor: 'primary.gray',
                        display: 'flex', alignItems: 'center',
                    }}>
                        <TitleWrapper>
                            <Typography sx={{ color: 'white', fontSize: { xs: '22px', sm: '32px', md: '64px' } }}>
                                {blog.title}
                            </Typography>
                            <Typography sx={{
                                display: { xs: 'none', md: 'block' },
                                color: 'white', fontSize: { xs: '18px', sm: '22px', md: '32px' }
                            }}>
                                {shorten(blog.subtitle, 45)}
                            </Typography>
                            <Typography sx={{
                                display: { xs: 'none', sm: 'block', md: 'none' },
                                color: 'white', fontSize: { xs: '18px', sm: '22px', md: '32px' }
                            }}>
                                {shorten(blog.subtitle, 50)}
                            </Typography>
                            <Typography sx={{
                                display: { xs: 'block', sm: 'none' },
                                color: 'white', fontSize: { xs: '18px', sm: '22px', md: '32px' }
                            }}>
                                {blog.subtitle}
                            </Typography>
                        </TitleWrapper>
                    </TopPic>
                    <Typography sx={{
                        color: 'primary.text', width: '100%', textAlign: 'justify', fontFamily: 'Inter',
                        textTransform: 'capitalize'
                    }}>
                        {blog.content}
                    </Typography>
                    <Footer />
                </Box>
            </Wrapper>
        </Box>
    );
}

export default BlogSingle;