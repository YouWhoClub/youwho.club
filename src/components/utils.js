import styled from "@emotion/styled"
import { Box } from "@mui/material"

const TabsComp = styled(Box)(({ theme }) => ({
    borderBottom: '1px solid', borderColor: theme.palette.primary.gray,
    width: '100%', display: 'flex', flexWrap: 'wrap',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
    },
    '&::-webkit-scrollbar-button': {
    },

}))
const TabComp = styled(Box)(({ theme }) => ({
    boxShadow: 'inset 0px 0px 9px -2px rgba(227,209,231,0.9)', cursor: 'pointer',
    borderRadius: '40px', fontSize: '12px',
    margin: '1px 3px',
    padding: '0 10px',
    width: 'max-content',
    height: '30px', textAlign: 'center',
    display: 'flex', alignItems: 'center',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
    }
}))
export const Tabs = ({ children }) => {
    return (<TabsComp
        sx={{ py: 1 }}
    >{children}</TabsComp>)
}
export const Tab = ({ text, onClick, id, selected }) => {
    return (<TabComp
        sx={{ backgroundColor: selected ? 'primary.main' : 'unset', color: selected ? 'white' : 'secondary.text' }}
        id={id} onClick={onClick}>
        {text}
    </TabComp>)
}
