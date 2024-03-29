import { Box } from "@mui/material";
import Bar from "./Bar";
import { useSelector } from "react-redux";
import ButtonPurple from "./buttons/buttonPurple";
import bgDots from '../assets/bgDots.svg'
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import Navbar from "./Navbar";
import React, { useState } from "react";
const Title = styled('h4')(({ theme }) => ({
    color: theme.palette.primary.text,
}))
const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: '1440px',
    position: 'relative',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
        width: '100%',
    },
}))


const PanelLayout = ({ switchTheme, theme, children, id, progressBarOpen, setProgressBarOpen }) => {
    const globalUser = useSelector(state => state.userReducer)
    const navigate = useNavigate()

    // const renderChildren = () => {
    //     return React.Children.map(children, (child) => {
    //         return React.cloneElement(child, {
    //             barOpen: progressBarOpen,
    //             setBarOpen: setProgressBarOpen
    //         });
    //     });
    // }
    return (
        // <Box sx={{ bgcolor: 'secondary.bg' }}>
        //     <Wrapper>
        <Box
            id={id}
            sx={{
                height: '100vh',
                // overflowX: 'hidden',
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                    display: 'none',
                    width: '8px',
                    background: 'white',
                    border: '0.5px solid #846894',
                    borderRadius: '20px !important'
                },
                '&::-webkit-scrollbar-thumb': {
                    width: '8px',
                    height: '8px',
                    background: '#846894',
                    border: '0.5px solid #846894',
                    borderRadius: '20px !important'
                },
                '&::-webkit-scrollbar-button': {
                    width: '3px',
                    height: '3px',
                    background: '#846894',
                    border: '0.5px solid #C6BAC5',
                    borderRadius: '50% !important'

                },

                // height: '100vh',
                // margin:'0 auto',
                bgcolor: 'primary.bg',
                // display: 'flex',
                // // justifyContent: 'center',
                // alignItems: 'center',
                // flexDirection: 'column',
            }}>
            <Navbar navbarType={'dashboard'} theme={theme} switchTheme={switchTheme}
                openedBar={progressBarOpen} setOpenedBar={setProgressBarOpen} />
            <Box sx={{ height: '1px', opacity: 0 }}
                //  className="hiddenBoxBeforeScroll" 
                id="hidden-box" />

            {!globalUser.isLoggedIn ?
                <Box sx={{
                    display: 'flex', marginTop: '20%', height: '50%',
                    alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                    backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center', backgroundImage: BG_URL(PUBLIC_URL(`${bgDots}`)),
                }}>
                    <Title>You Have to Login First</Title>
                    <ButtonPurple text={'login'} onClick={() => navigate('/auth')} />
                </Box>
                :
                <Box sx={{
                    display: 'flex', alignItems: 'center',
                    // justifyContent: { xs: 'start', sm: 'end' },
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                    <Bar />
                    {children}
                </Box>
            }
        </Box>
        //     </Wrapper>
        // </Box>
    );
}

export default PanelLayout;