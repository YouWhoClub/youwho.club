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
import Home from './pages/home';
import { useEffect, useState } from 'react';
import { Box, LinearProgress, ThemeProvider, createTheme } from '@mui/material';
import NotFound from './pages/404';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Footer from './components/Footer';
import Auth from './pages/auth';
import Display from './pages/display';
import Profile from './pages/profile';
import CreateWallet from './components/user/wallet/createWallet';
import TransferPage from './pages/transfer';
import PublicGallery from './pages/publicGallery';
import Dashboard from './pages/dashboard';
import Bar from './components/Bar';
import VerifyMail from './pages/verifyMail';
import VerifyPhone from './components/user/auth/verifyPhone';
import MainGallery from './pages/mainGallery';
import styled from '@emotion/styled';
import WalletPage from './pages/walletPage';
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
    palette: {
      mode: 'dark',
      primary: {
        dark: 'black',
        ultra: '#32283E',
        main: '#790DAB',
        middle: '#846894',
        light: '#BEA2C5',
        gray: '#C7BDC6',
        white: 'white',
        bg: '#281240',
        bgOp: 'rgba(40,18,64,0.3)',
        bgGradient: 'linear-gradient(180deg, rgba(10,3,17,1) 0%, rgba(40,18,64,0.8957634079022234) 100%)',
        text: 'white',
        themeSwitch: '#140920'
      },
      secondary: {
        dark: '#0F0A0A',
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
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        dark: 'black',
        ultra: '#32283E',
        main: '#5F0A87',
        middle: '#846894',
        light: '#BEA2C5',
        gray: '#C7BDC6',
        white: 'white',
        bg: '#F8F4E3',
        bgOp: 'rgba(248,244,227,0.5)',
        bgGradient: 'linear-gradient(180deg, rgba(83,38,132,1) 0%, rgba(248,244,227,0.9461835759694502) 100%)',
        text: 'black',
        themeSwitch: '#FFC233'
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
        bgGradient: 'linear-gradient(180deg, rgba(248,244,227,0.9388810700061274) 0%, rgba(83,38,132,0.7) 50%, rgba(248,244,227,0.9472844313506653) 100%)',
        text: '#707070',
        themeSwitch: '#FFC43D'

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
                    <Route exact path="/auth" element={<Auth />} />
                    <Route exact path="/display" element={<Display />} />
                    <Route exact path="/dashboard" element={<Dashboard switchTheme={switchTheme} />} />
                    <Route exact path="/profile/:name" element={<Profile />} />
                    <Route exact path="/transfer" element={<TransferPage />} />
                    <Route exact path="/wallet" element={<WalletPage switchTheme={switchTheme} />} />
                    <Route exact path="/public-gallery" element={<PublicGallery />} />
                    <Route exact path="/gallery/user/:id" element={<PublicGallery />} />
                    <Route exact path="/verify-mail" element={<VerifyMail />} />
                    <Route exact path="/verify-phone" element={<VerifyPhone />} />
                    <Route exact path="/gallery" element={<MainGallery switchTheme={switchTheme} />} />
                    <Route path='*' element={<NotFound />} />
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

export default App;



const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])
  return children || null;
}