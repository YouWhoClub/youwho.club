// import "ethereum" from "@thirdweb-dev/chains";

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { Box, LinearProgress, ThemeProvider, createTheme } from '@mui/material';
import NotFound from './pages/404';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Footer from './components/FooterPrev';
import Auth from './pages/auth';
import Display from './pages/display';
import Profile from './pages/profile';
import CreateWallet from './components/user/wallet/createWallet';
import TransferPage from './pages/transfer';
import PublicGallery from './pages/main-gallery';
import Dashboard from './pages/dashboard';
import Bar from './components/Bar';
import VerifyMail from './pages/verifyMail';
import VerifyPhone from './components/user/auth/verifyPhone';
import MainGallery from './pages/mainGallery';
import styled from '@emotion/styled';
import WalletPage from './pages/walletPage';
import Home from './pages/home';
import CheckoutSuccess from './pages/checkoutSuccess'
import CheckoutCancel from './pages/checkoutCancel'
import PrivacyPolicy from './pages/privacyPolicy';
import ViewMainGalleryPage from './pages/main-gallery';
import Weblog from './pages/weblog';
import AboutUs from './pages/about-us';
import GuidePage from './pages/guide';
import ContactUs from './pages/contact-us';
// import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";


function App() {
  const uuid = localStorage.getItem('device-id')
  if (uuid) {
    console.log('device id found !')
  } else {
    localStorage.setItem('device-id', uuidv4())
  }
  const setLocalTheme = () => {
    if (localStorage.getItem('theme') == 'light') {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light')
    }
  }
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  const switchTheme = () => {
    // setLocalTheme()
    if (theme == 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('theme')) {
    } else {
      localStorage.setItem('theme', 'light')
    }
  }, [localStorage.getItem('theme')])

  const darkTheme = createTheme({
    typography: {
      "fontFamily": `"Josefin Sans", "Inter", sans-serif`,
    },
    palette: {
      mode: 'dark',
      primary: {
        slider: '#1F0031',
        dark: '#1F0031',
        ultra: '#6F3096',
        main: '#6A2ABE',
        middle: '#9F72C0',
        light: '#BEA2C5',
        gray: '#adadad',
        darkGray: '#999999',
        bg: '#1F0031',
        bgOp: 'rgba(31,0,49,0.49)',
        bgGradient: 'linear-gradient(180deg, rgba(61,0,98,1) 33%, rgba(31,0,49,1) 100%)',
        bgGradientDown: 'linear-gradient(180deg, rgba(31,0,49,1) 33%, rgba(61,0,98,1) 100%)',
        text: 'white',
        themeSwitch: '#140920',
        landBG: 'linear-gradient(180deg, rgba(31,0,49,1) 0%, rgba(61,0,98,1) 100%)',
        footer: '#1E003A',
        grad: 'linear-gradient(251deg, rgba(111,48,150,1) 33%, rgba(210,166,242,1) 100%)',
        success: '#0Cb2B1',
        error: '#F675A8',
        boxShadow: '0px 0px  12px 1px rgba(0, 0, 0, 0.30)',
        boxShadowLarge: '0px 0px 20px 1px rgba(0, 0, 0, 0.30)',
        boxShadowInset: 'inset 0px 0px 10px 1px rgba(0, 0, 0, 0.30)',
        cardGradient: 'linear-gradient(41deg, rgba(61,0,98,1) 0%, rgba(18,0,28,1) 100%)',
        disabled: '#8888',
        pink: '#F675A8',
        yellow: '#FFD966',
      },
      secondary: {
        dark: '#3D0062',
        ultra: '#6F3096',
        main: '#7C42C7',
        middle: '#9F72C0',
        light: '#C182ED',
        ultraLight: '#D2A6F2',
        gray: '#939393',
        darkGray: '#787878',
        bg: '#3D0062',
        bgOp: 'rgba(61,0,98,0.49)',
        bgGradient: 'linear-gradient(180deg, rgba(31,0,49,1) 0%, rgba(61,0,98,1) 50%, rgba(31,0,49,1)  100%)',
        bgGradientDown: 'linear-gradient(180deg, rgba(61,0,98,1) 33%, rgba(31,0,49,1) 100%)',
        gradientLTR: 'linear-gradient(90deg, rgba(61,0,98,0.79) 0%, rgba(61,0,98,0.0) 100%)',
        gradientTTB: 'linear-gradient(180deg, rgba(61,0,98,0.79) 0%, rgba(61,0,98,0.0) 100%)',
        text: '#D6D6D6',
        themeSwitch: '#140920',
        landBG: 'linear-gradient(180deg, rgba(61,0,98,1) 9%, rgba(36,12,49,1) 100%)',
        footer: '#3D0062',
        success: '#B3E4E6',
        error: '#FA8FBA',
        boxShadow: '0px 0px 5px 1px rgba(227,209,231,0.7)',
        boxShadowLarge: '0px 0px 20px 0px rgba(227,209,231,0.7)',
        boxShadowInset: 'inset 0px 0px 5px 1px rgba(227,209,231,0.7)',
        pink: '#FFADCD',
        yellow: '#FFFDD5',

      },
    },
  });
  const lightTheme = createTheme({
    typography: {
      "fontFamily": `"Josefin Sans", "Inter", sans-serif`,
    },
    palette: {
      mode: 'light',
      primary: {
        dark: '#1F0031',
        slider: '#e8e8e8',
        ultra: '#6F3096',
        main: '#6A2ABE',
        middle: '#9F72C0',
        light: '#BEA2C5',
        gray: '#ccc',
        darkGray: '#787878',
        bg: '#F5F5F5',
        bgOp: 'rgba(245,245,245,0.49)',
        bgGradient: 'linear-gradient(180deg, rgba(159,114,192,1) 0%, rgba(245,245,245,1) 100%)',
        bgGradientDown: 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(159,114,192,1) 100%)',
        text: 'black',
        themeSwitch: '#FFC233',
        landBG: 'linear-gradient(180deg, rgba(222, 222, 222, 0.25) 0%, rgba(217, 217, 217, 0.001) 100%)',
        footer: '#1D0048',
        grad: 'linear-gradient(251deg, rgba(111,48,150,1) 33%, rgba(210,166,242,1) 100%)',
        success: '#0Cb2B1',
        error: '#F675A8',
        // boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.25)',
        boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.25)',
        boxShadowLarge: '0px 0px 20px 0px rgba(0, 0, 0, 0.25)',
        boxShadowInset: 'inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25)',
        cardGradient: 'linear-gradient(231deg, rgba(200,200,200,1) 0%, rgba(111,48,150,1) 100%)',
        pink: '#F675A8',
        disabled: '#ccc', yellow: '#FFD966',

      },
      secondary: {
        dark: '#3D0062',
        ultra: '#6F3096',
        main: '#7C42C7',
        middle: '#9F72C0',
        light: '#C182ED',
        ultraLight: '#D2A6F2',
        gray: '#DEDEDE',
        darkGray: '#787878',
        bg: '#ffffff',
        bgOp: 'rgba(255,255,255,0.49)',
        bgGradient: 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(159,114,192,1) 50%, rgba(245,245,245,1) 100%)',
        gradientLTR: 'linear-gradient(90deg, rgba(255,255,255,0.79) 0%, rgba(255,255,255,0.0) 100%)',
        gradientTTB: 'linear-gradient(180deg, rgba(255,255,255,0.79) 0%, rgba(255,255,255,0.0) 100%)',
        bgGradientDown: 'linear-gradient(180deg, rgba(159,114,192,1) 0%, rgba(245,245,245,1) 100%)',
        text: '#787878',
        themeSwitch: '#FFC233',
        landBG: 'linear-gradient(180deg, rgba(222, 222, 222, 0.25) 0%, rgba(217, 217, 217, 0.001) 100%)',
        footer: '#3D0062',
        success: '#B3E4E6',
        error: '#FA8FBA',
        boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.25)',
        yellow: '#FFFDD5',
        pink: '#FFADCD',


      },
    },
  });

  const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: '1440px',
    position: 'relative',
    margin: '0 auto',
    "@media (max-width: 1440px)": {
      width: '100%',
    },
  }))
  const localTheme = localStorage.getItem('theme')
  return (
    <ThemeProvider
      theme={theme == 'dark' ? darkTheme : lightTheme}
    >
      {/* <ThirdwebProvider
        activeChain="ethereum"
        clientId="06dee3dbe60fb5303a630c6b832fd428" // we can get another client id from thirdweb dashboard settings.
      > */}

      <Provider store={store}>
        <PersistGate
          loading={<>...</>}
          persistor={persistor}>
          {/* // <Web3ReactProvider getLibrary={getLibrary}>
        //   <MetamaskProvider>
        //     <NFTMarketplaceProvider> */}

          <BrowserRouter>
            <ScrollToTop>
              <>
                {/* <Box sx={{ bgcolor: 'secondary.bg' }}>
                  <Wrapper> */}
                <Routes>
                  <Route exact path="/" element={<Home theme={theme} switchTheme={switchTheme} />} />
                  <Route exact path="/auth" element={<Auth theme={theme} switchTheme={switchTheme} />} />
                  <Route exact path="/blog" element={<Weblog switchTheme={switchTheme} theme={theme} />} />
                  <Route exact path="/about-us" element={<AboutUs switchTheme={switchTheme} theme={theme} />} />
                  <Route exact path="/contact-us" element={<ContactUs switchTheme={switchTheme} theme={theme} />} />
                  <Route exact path="/guide" element={<GuidePage switchTheme={switchTheme} theme={theme} />} />

                  {/* <Route path='*' element={<NotFound theme={theme} switchTheme={switchTheme} />} /> */}
                </Routes>

                <Box sx={{ bgcolor: 'secondary.bg' }}>
                  <Wrapper>
                    <Routes>
                      {/* <Route exact path="/landing" element={<></>} /> */}
                      {/* <Route path='*' element={<></>} /> */}
                      <Route exact path="/" element={<></>} />
                      <Route exact path="/auth" element={<></>} />
                      <Route exact path="/blog" element={<></>} />
                      <Route exact path="/about-us" element={<></>} />
                      <Route exact path="/contact-us" element={<></>} />
                      <Route exact path="/guide" element={<></>} />


                      <Route exact path="/main-gallery" element={<ViewMainGalleryPage theme={theme} switchTheme={switchTheme} />} />
                      {/* <Route exact path="/transfer" element={<TransferPage theme={theme} switchTheme={switchTheme} />} /> */}

                      <Route exact path="/gallery" element={<MainGallery switchTheme={switchTheme} theme={theme} />} />
                      <Route exact path="/dashboard" element={<Dashboard switchTheme={switchTheme} theme={theme} />} />
                      <Route exact path="/wallet" element={<WalletPage theme={theme} switchTheme={switchTheme} />} />

                      <Route exact path="/profile/:name" element={<Profile theme={theme} switchTheme={switchTheme} />} />


                      {/* <Route exact path="/verify-mail" element={<VerifyMail theme={theme} />} /> */}
                      {/* <Route exact path="/verify-phone" element={<VerifyPhone theme={theme} />} /> */}
                      <Route exact path="/checkout/success" element={<CheckoutSuccess switchTheme={switchTheme} theme={theme} />} />
                      <Route exact path="/checkout/cancel" element={<CheckoutCancel switchTheme={switchTheme} theme={theme} />} />


                      <Route path='*' element={<NotFound theme={theme} switchTheme={switchTheme} />} />
                      <Route exact path="/privacy-policy" element={<PrivacyPolicy theme={theme} />} />
                    </Routes>
                  </Wrapper>
                </Box>


                {/* </Wrapper>
                </Box> */}
              </>
            </ScrollToTop>
          </BrowserRouter>


          {/* //         </NFTMarketplaceProvider>
    //       </MetamaskProvider>
    //     </Web3ReactProvider> */}
        </PersistGate>
      </Provider>


      {/* </ThirdwebProvider> */}

    </ThemeProvider >
  );
}




export default App;



const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])
  return children || null;
}