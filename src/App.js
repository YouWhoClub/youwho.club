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
import { useEffect } from 'react';
import { LinearProgress, ThemeProvider } from '@mui/material';
import NotFound from './pages/404';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Footer from './components/Footer';
import Auth from './pages/auth';
import Display from './pages/display';
import Profile from './pages/profile';
import CreateWallet from './pages/createWallet';
import TransferPage from './pages/transfer';
import PublicGallery from './pages/publicGallery';
import Dashboard from './pages/dashboard';
import Bar from './components/Bar';
import VerifyMail from './pages/verifyMail';
import VerifyPhone from './pages/verifyPhone';
// import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";


function App() {
  const uuid = localStorage.getItem('device-id')
  if (uuid) {
    console.log('device id found !')
  } else {
    localStorage.setItem('device-id', uuidv4())
  }



  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            dark: '#191528',
            ultra: '#32283E',
            main: '#392F5A',
            middle: '#846894',
            light: '#BEA2C5',
            gray: '#C6BAC5',
            darkGray: '#90888C',
            darkerGray: '#2B2A2B',
          },
        },
      }}
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
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/auth" element={<Auth />} />
                  <Route exact path="/display" element={<Display />} />
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route exact path="/profile/:name" element={<Profile />} />
                  <Route exact path="/transfer" element={<TransferPage />} />
                  <Route exact path="/generate-wallet" element={<CreateWallet />} />
                  <Route exact path="/public-gallery" element={<PublicGallery />} />
                  <Route exact path="/gallery/user/:id" element={<PublicGallery />} />
                  <Route exact path="/verify-mail" element={<VerifyMail />} />
                  <Route exact path="/verify-phone" element={<VerifyPhone />} />
                  <Route path='*' element={<NotFound />} />

                </Routes>
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