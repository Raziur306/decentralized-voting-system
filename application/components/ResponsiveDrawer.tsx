import { AppBar, Box, CssBaseline, IconButton, Typography, Toolbar, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import theme from '../styles/theme';
import MenuIcon from '@mui/icons-material/Menu'
import { WalletConnectorContext } from '../context/WalletConnectionContext';
import { StyledCustomDrawer } from '../styles/drawerStyle'
import SideBarItems from './SideBarItems';
import { useRouter } from 'next/router';


interface PropsType {
    children: React.ReactNode
}
const ResponsiveDrawer = (props: PropsType) => {
    const { children } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawerWidth = 80;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const { isWalletConnected } = useContext(WalletConnectorContext);


    useEffect(() => {
        if (!isWalletConnected) {
            router.push('/');
        }
    }, [isWalletConnected])


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    if (!isWalletConnected) {
        return <>{children}</>;
    }


    return (<Box sx={{ display: 'flex' }}>\
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
                pt: 2,
                pl: 10,
                pr: 10,
                boxShadow: 'none',
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Typography variant='h3' sx={{ pb: 3, color: 'orange', fontWeight: 'bold', textAlign: 'center' }}>Decentralized Voting System</Typography>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <StyledCustomDrawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? mobileOpen : true}
                onClose={isMobile ? handleDrawerToggle : undefined}
                sx={
                    isMobile ?
                        {
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { borderWidth: 0, borderRight: 'none' },
                        } :
                        {
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }
                } >
                <SideBarItems />
            </StyledCustomDrawer>
        </Box>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 10, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            <Toolbar />
            {children}
        </Box>
    </Box>)
}

export default ResponsiveDrawer