import styled from "@emotion/styled";
import { Box } from "@mui/material";
const PagBox = styled(Box)(({ theme }) => ({
    padding: '10px', backgroundColor: theme.palette.secondary.middle, gap: '14px', width: 'max-content',
    boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '18px',
    "@media (max-width: 600px)": {
        padding: '10px 8px', gap: '8px', width: '100%',
        justifyContent: 'space-between'
    },

}))
const PagTabs = styled(Box)(({ theme }) => ({
    padding: '8px 16px',
    color: theme.palette.primary.gray,
    cursor: 'pointer',
    // backgroundColor: theme.palette.secondary.bg,
    // boxShadow: theme.palette.primary.boxShadow,
    width: 'max-content',
    boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '9px'
}))

const Pagination = ({ tabs, selected, setSelectedTab }) => {
    return (
        <PagBox>
            <PagTabs
                onClick={() => setSelectedTab(selected - 1 > 0 ? selected - 1 : selected)} sx={(theme) => ({
                    bgcolor: theme.palette.secondary.bg,
                    boxShadow: theme.palette.primary.boxShadow
                })}>
                Previous
            </PagTabs>
            {tabs.length > 3 ?
                <>
                    {tabs.slice(selected == 1 ? selected - 1 : selected - 2, selected + 1).map((tab) => (
                        <PagTabs
                            onClick={() => setSelectedTab(tab)}
                            sx={(theme) => ({
                                bgcolor: selected == tab ? theme.palette.secondary.bg : 'transparent !important',
                                boxShadow: selected == tab ? theme.palette.primary.boxShadow : theme.palette.primary.boxShadowInset
                            })}>
                            {tab}
                        </PagTabs>
                    ))}
                </>

                :
                <>
                    {tabs.map((tab) => (
                        <PagTabs
                            onClick={() => setSelectedTab(tab)}
                            sx={(theme) => ({
                                bgcolor: selected == tab ? theme.palette.secondary.bg : 'transparent !important',
                                boxShadow: selected == tab ? theme.palette.primary.boxShadow : theme.palette.primary.boxShadowInset
                            })}>
                            {tab}
                        </PagTabs>
                    ))}
                </>
            }
            <PagTabs
                onClick={() => setSelectedTab(selected + 1 > tabs.length ? selected : selected + 1)} sx={(theme) => ({
                    bgcolor: theme.palette.secondary.bg,
                    boxShadow: theme.palette.primary.boxShadow
                })}>
                Next
            </PagTabs>
        </PagBox>
    );
}

export default Pagination;