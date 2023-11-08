import React from 'react'
import Slider from "react-slick";
import { Box } from '@mui/material';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'
function SampleNextArrow(props) {
    const { onClick } = props;
    // const [theme, themeToggler, mountedComponent] = useDarkMode();  
    // if (!mountedComponent) return <div />

    return (
        <Box
            sx={{
                display: "flex",
                background: 'primary.main',
                width: { xs: '35px', sm: '40px' },
                height: { xs: '35px', sm: '40px' },
                borderRadius: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'primary.text',
                // position: 'absolute',
                // top: '50%',
                // right: '0',
                // zIndex: 4,
                // transform: 'translate(0, -50%)',
                // boxShadow: '0px 0px 20px 3px rgba(0,0,0,0.5)',
                // border: '1px solid',
                // borderColor: 'primary.middle',
                // border: '1px solid',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <ArrowRight2 />
        </Box>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <Box
            sx={{
                display: "flex",
                background: 'primary.main',
                width: { xs: '35px', sm: '40px' },
                height: { xs: '35px', sm: '40px' },
                borderRadius: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'primary.text',
                // position: 'absolute',
                // top: '50%',
                // left: '0',
                // zIndex: 4,
                // transform: 'translate(0, -50%)',
                // boxShadow: '0px 0px 20px 3px rgba(0,0,0,0.5)',
                // border: '1px solid',
                // borderColor: 'primary.middle',
                // border: '1px solid',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <ArrowLeft2 />
        </Box>
    );
}
export default function CustomSlider({ children, slidesCount, slidesCountTablet, items, theme }) {
    const settings = {
        infinite: false,
        // dots: false,
        slidesToShow: slidesCount ? slidesCount : 5,
        slidesToScroll: slidesCount ? slidesCount : 5,
        nextArrow: <SampleNextArrow theme={theme} />,
        prevArrow: <SamplePrevArrow theme={theme} />,
        // lazyLoad: true,
        // autoplay: false,
        // autoplaySpeed: 2000,
        speed: 500,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: slidesCountTablet ? slidesCountTablet : 5,
                    slidesToScroll: slidesCountTablet ? slidesCountTablet : 5,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: slidesCountTablet ? slidesCountTablet : 4,
                    slidesToScroll: slidesCountTablet ? slidesCountTablet : 4,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesCountTablet ? slidesCountTablet : 3,
                    slidesToScroll: slidesCountTablet ? slidesCountTablet : 3,
                }
            },
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: slidesCountTablet ? slidesCountTablet : 2,
                    slidesToScroll: slidesCountTablet ? slidesCountTablet : 2,
                }
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]

    };
    return (
        <>
            <div className="">
                <Slider className='p-0' {...settings}>
                    {children}
                </Slider>
            </div>
        </>
    )

}
