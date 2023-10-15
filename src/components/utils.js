import styled from "@emotion/styled"
import { AccountCircle } from "@mui/icons-material"
import { Box, TextField, inputLabelClasses } from "@mui/material"

const Inputt = styled(Box)(({ theme }) => ({
    border: '1px solid #DEDEDE',
    borderRadius: '12px',
    height: '50px', color: theme.palette.primary.text
}))
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
const TabsSimplee = styled(Box)(({ theme }) => ({
    width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
}))
const TabSimplee = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.text, borderColor: theme.palette.primary.text,
    margin: '1px 3px',
    padding: '0 10px',
    width: 'max-content',
    cursor: 'pointer',
    height: '30px', textAlign: 'center',
    display: 'flex', alignItems: 'center',
    '&:hover': {
        color: theme.palette.secondary.text
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
export const TabsSimple = ({ children }) => {
    return (<TabsSimplee
        sx={{ py: 1 }}
    >{children}</TabsSimplee>)
}
export const TabSimple = ({ text, onClick, id, selected }) => {
    return (<TabSimplee
        sx={{ borderBottom: selected ? '1px solid' : 'unset', }}
        id={id} onClick={onClick}>
        {text}
    </TabSimplee>)
}
export const MyInput = ({ icon, text, id, label, width, onChange }) => {
    return (<Inputt sx={{ width: width ? width : '200px', }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', px: '16px' }}>
            {icon ? icon : undefined}
            <TextField
                InputProps={{
                    disableUnderline: true,
                    sx: { color: 'primary.gray' }
                }}
                InputLabelProps={{
                    sx: {
                        color: 'primary.text', [`&.${inputLabelClasses.shrink}`]: {
                            // set the color of the label when shrinked (usually when the TextField is focused)
                            color: "primary.text"
                        }
                    }
                }}
                id={id} sx={{ alignItems: 'center', }} label={label} variant="standard" onChange={onChange} />
        </Box>
    </Inputt>
    )

}