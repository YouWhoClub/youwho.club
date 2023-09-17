const ISLOCALHOST = false;
const LOCAL_URL = "http://192.168.1.156";
export const API_CONFIG = {
    AUTH_API_URL: ISLOCALHOST ? `${LOCAL_URL}:3434/auth` : 'https://panel.youwho.club/user',
    HEALTH_API_URL: ISLOCALHOST ? `${LOCAL_URL}:3434/auth` : 'https://panel.youwho.club/health',


    
    MARKET_API_URL: ISLOCALHOST ? `${LOCAL_URL}:3435/market` : 'https://api1.market.youwho.club/market',
    MARKET_MEDIA_API_URL: ISLOCALHOST ? `${LOCAL_URL}:3435/media` : 'https://api1.market.youwho.club/media/',
    AUTH_MEDIA_API_URL: ISLOCALHOST ? `${LOCAL_URL}:3434/media` : 'https://api1.auth.youwho.club/media/',
}


export const NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA5RGY0NWNDNkZCMTU3ZERDMDhCYjMxOTU4QTdhZUFkYTIzZEU2MDciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDUxODM5MjIyOSwibmFtZSI6ImRvcnRhIn0.ZxmsK__k1cdm0KsNbmRM6hHWMAkvc0LcXY6BwEGkvB4"
