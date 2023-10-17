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
import LandingPrev from './pages/landingPrev';
import { useEffect, useState } from 'react';
import { Box, LinearProgress, ThemeProvider, createTheme } from '@mui/material';
import NotFound from './pages/404';
import NavbarTransparent from './components/NavbarTransparent';
import { Provider } from 'react-redux';
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

  const [theme, setTheme] = useState('light')
  const switchTheme = () => {
    setLocalTheme()
    if (theme == 'light') {
      setTheme('dark')
    } else setTheme('light')
  }

  const darkTheme = createTheme({
    typography: {
      "fontFamily": `"Josefin Sans", "Inter", sans-serif`,
    },
    palette: {
      mode: 'dark',
      primary: {
        dark: '#1F0031',
        ultra: '#6F3096',
        main: '#8B3BBC',
        middle: '#9F72C0',
        light: '#BEA2C5',
        gray: '#D6D6D6',
        darkGray: '#525252',
        bg: '#1F0031',
        bgOp: 'rgba(31,0,49,0.49)',
        bgGradient: 'linear-gradient(180deg, rgba(61,0,98,1) 33%, rgba(31,0,49,1) 100%)',
        bgGradientDown: 'linear-gradient(180deg, rgba(31,0,49,1) 33%, rgba(61,0,98,1) 100%)',
        text: 'white',
        themeSwitch: '#140920',
        landBG: 'linear-gradient(158deg, rgba(31,0,49,1) 0%, rgba(61,0,98,1) 100%)',
        footer: '#6F3096',
        grad: 'linear-gradient(251deg, rgba(111,48,150,1) 33%, rgba(210,166,242,1) 100%)',
        success: '#0Cb2B1',
        error: '#F675A8'
      },
      secondary: {
        dark: '#3D0062',
        ultra: '#6F3096',
        main: '#6F3096',
        middle: '#9F72C0',
        light: '#C182ED',
        ultraLight: '#D2A6F2',
        gray: '#EBEBEB',
        darkGray: '#525252',
        bg: '#3D0062',
        bgOp: 'rgba(61,0,98,0.49)',
        bgGradient: 'linear-gradient(180deg, rgba(31,0,49,1) 0%, rgba(61,0,98,1) 50%, rgba(31,0,49,1)  100%)',
        bgGradientDown: 'linear-gradient(180deg, rgba(61,0,98,1) 33%, rgba(31,0,49,1) 100%)',
        text: '#f5f5f5',
        themeSwitch: '#140920',
        landBG: 'linear-gradient(180deg, rgba(61,0,98,1) 9%, rgba(36,12,49,1) 100%)',
        footer: '#3D0062',
        success: '#B3E4E6',
        error: '#FA8FBA'
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
        ultra: '#6F3096',
        main: '#8B3BBC',
        middle: '#9F72C0',
        light: '#BEA2C5',
        gray: '#C2C2C2',
        darkGray: '#A3A3A3',
        bg: '#F5F5F5',
        bgOp: 'rgba(245,245,245,0.49)',
        bgGradient: 'linear-gradient(180deg, rgba(159,114,192,1) 0%, rgba(245,245,245,1) 100%)',
        bgGradientDown: 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(159,114,192,1) 100%)',
        text: 'black',
        themeSwitch: '#FFC233',
        landBG: 'linear-gradient(180deg, rgba(222, 222, 222, 0.25) 0%, rgba(217, 217, 217, 0.001) 100%)',
        footer: '#6F3096',
        grad: 'linear-gradient(251deg, rgba(111,48,150,1) 33%, rgba(210,166,242,1) 100%)',

      },
      secondary: {
        dark: '#3D0062',
        ultra: '#6F3096',
        main: '#6F3096',
        middle: '#9F72C0',
        light: '#C182ED',
        ultraLight: '#D2A6F2',
        gray: '#CC2C2',
        darkGray: '#A3A3A3',
        bg: '#ffffff',
        bgOp: 'rgba(255,255,255,0.49)',
        bgGradient: 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(159,114,192,1) 50%, rgba(245,245,245,1) 100%)',
        bgGradientDown: 'linear-gradient(180deg, rgba(159,114,192,1) 0%, rgba(245,245,245,1) 100%)',
        text: '#292929',
        themeSwitch: '#FFC233',
        landBG: 'linear-gradient(180deg, rgba(222, 222, 222, 0.25) 0%, rgba(217, 217, 217, 0.001) 100%)',
        footer: '#3D0062'
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
    // justifyContent: 'center',
    // alignItems: 'center'
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
                {/* <Navbar /> */}
                <Wrapper>
                  <Routes>
                    <Route exact path="/" element={<Home theme={theme} switchTheme={switchTheme} />} />
                    <Route exact path="/landing" element={<LandingPrev theme={theme} switchTheme={switchTheme} />} />
                    <Route exact path="/auth" element={<Auth theme={theme} switchTheme={switchTheme} />} />
                    <Route exact path="/display" element={<Display theme={theme} switchTheme={switchTheme} />} />
                    <Route exact path="/dashboard" element={<Dashboard switchTheme={switchTheme} theme={theme} />} />
                    <Route exact path="/profile/:name" element={<Profile theme={theme} switchTheme={switchTheme} />} />

                    <Route exact path="/transfer" element={<TransferPage theme={theme} switchTheme={switchTheme} />} />

                    <Route exact path="/wallet" element={<WalletPage theme={theme} switchTheme={switchTheme} />} />
                    <Route exact path="/main-gallery" element={<ViewMainGalleryPage theme={theme} switchTheme={switchTheme} />} />
                    <Route exact path="/gallery/user/:id" element={<PublicGallery theme={theme} switchTheme={switchTheme} />} />
                    <Route exact path="/verify-mail" element={<VerifyMail theme={theme} />} />
                    <Route exact path="/verify-phone" element={<VerifyPhone theme={theme} />} />
                    <Route exact path="/gallery" element={<MainGallery switchTheme={switchTheme} theme={theme} />} />
                    <Route exact path="/checkout/success" element={<CheckoutSuccess switchTheme={switchTheme} theme={theme} />} />
                    <Route exact path="/checkout/cancel" element={<CheckoutCancel switchTheme={switchTheme} theme={theme} />} />

                    <Route exact path="/privacy-policy" element={<PrivacyPolicy theme={theme} />} />
                    <Route path='*' element={<NotFound theme={theme} switchTheme={switchTheme} />} />
                  </Routes>
                </Wrapper>
                {/* <Bar /> */}
                {/* <Footer /> */}
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





const oldDarkThemeBackUp = createTheme({
  typography: {
    "fontFamily": `"Josefin Sans", "Inter", sans-serif`,
  },
  palette: {
    mode: 'dark',
    primary: {
      dark: '#1A0052',
      ultra: '#32283E',
      main: '#790DAB',
      middle: '#846894',
      light: '#BEA2C5',
      gray: '#C7BDC6',
      white: 'white',
      bg: '#281240',
      bgOp: 'rgba(40,18,64,0.3)',
      // bgGradient: 'linear-gradient(180deg, rgba(10,3,17,1) 0%, rgba(40,18,64,0.8957634079022234) 100%)',
      bgGradient: 'linear-gradient(180deg, rgba(10,3,17,1) 0%, rgba(40,18,64,1) 100%)',
      bgGradientDown: 'linear-gradient(180deg, rgba(40,18,64,1) 0%, rgba(10,3,17,1) 100%)',
      text: 'white',
      themeSwitch: '#140920',
      landBG: 'linear-gradient(180deg, rgba(40,18,64,0.9) 0%, rgba(10,3,17,0.6) 100%)',
      footer: '#C182ED'
    },
    secondary: {
      dark: '#1B0055',
      ultra: '#32283E',
      main: '#392F5A',
      middle: '#846894',
      light: '#BEA2C5',
      gray: '#C7BDC6',
      white: 'white',
      bg: '#3C1A60',
      bgOp: 'rgba(60,26,96,0.3)',
      bgGradient: 'linear-gradient(180deg, rgba(40,18,64,1) 0%, rgba(93,45,134,1) 50%, rgba(40,18,64,1) 100%)',
      text: '#F6F5F4',
      themeSwitch: '#1E0D30'

    },
  },
});
const oldLightThemeBackUp = createTheme({
  typography: {
    "fontFamily": `"Josefin Sans", "Inter", sans-serif`,
  },
  palette: {
    mode: 'light',
    primary: {
      dark: '#1B0055',
      ultra: '#32283E',
      main: '#5F0A87',
      middle: '#846894',
      light: '#BEA2C5',
      gray: '#C7BDC6',
      white: 'white',
      bg: '#F8F4E3',
      bgOp: 'rgba(248,244,227,0.5)',
      bgGradient: 'linear-gradient(180deg, rgba(83,38,132,1) 0%, rgba(248,244,227,1) 100%)',
      bgGradientDown: 'linear-gradient(180deg, rgba(248,244,227,1) 0%, rgba(83,38,132,1) 100%)',
      text: 'black',
      themeSwitch: '#FFC233',
      landBG: 'linear-gradient(180deg, rgba(222, 222, 222, 0.25) 0%, rgba(217, 217, 217, 0.001) 100%)',
      footer: '#3D0062'
    },
    secondary: {
      dark: '#0F0A0A',
      ultra: '#731A60',
      main: '#B8145E',
      middle: '#8D80AD',
      light: '#BCB4CF',
      gray: '#C7BDC6',
      white: '#F5EFED',
      bg: 'white',
      bgOp: 'rgba(255,255,255,0.5)',
      bgGradient: 'linear-gradient(180deg, rgba(248,244,227,1) 0%, rgba(83,38,132,0.7) 50%, rgba(248,244,227,1) 100%)',
      text: '#707070',
      themeSwitch: '#FFC43D'

    },
  },
});


export default App;



const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])
  return children || null;
}