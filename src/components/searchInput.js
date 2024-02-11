import { Close, Search } from "@mui/icons-material";
import { Box, Input, TextField, Typography, inputBaseClasses } from "@mui/material";
import { SearchNormal1 } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchInput = () => {
    const [searchQ, setSearchQ] = useState('')
    // const handleKeyDown = (event) => {
    //     // if (event.key === 'Enter') {
    //     navigate(`/search?q=${searchQ}`)
    //     // }
    // }
    useEffect(() => {
        if (searchQ)
            navigate(`/search?q=${searchQ}`)
    }, [searchQ])
    const navigate = useNavigate()
    return (<>
        <Box sx={{
            display: { xs: 'none', md: 'flex' }, alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px', height: '35px', boxSizing: 'border-box', width: '250px',
            borderRadius: '18px', border: '1px solid #DEDEDE', color: 'primary.text'
        }}>
            <Typography>
                Search:
            </Typography>
            <Input

                // onKeyDown={handleKeyDown}
                disableUnderline
                value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
                sx={{
                    outline: 'none !important',
                    border: 'none !important',
                    "&:-webkit-autofill": {
                        webkitboxshadow: "none !important", backgroundColor: 'transparent !important'
                    },
                    [`&.${inputBaseClasses.input}`]: {
                        padding: '0 !important', color: 'primary.darkGray', outline: 'none !important',
                        border: 'none !important',

                    }
                }} />
            {searchQ == undefined || searchQ == '' ?
                <SearchNormal1 cursor={'pointer'} size={'20px'} onClick={() => navigate(`/search?q=${searchQ}`)} />
                : <Close sx={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => setSearchQ('')} />}
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'none' }, color: 'primary.text' }}>
            <Link to={'/search'}
                target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                <SearchNormal1 size='18px' />
            </Link>
        </Box>
    </>);
}

export default SearchInput;