import React from 'react';
import {
  styled,
  AppBarProps as MuiAppBarProps,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Divider,
  List,
  Container,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Topic as TopicIcon,
} from '@mui/icons-material';
import { Outlet } from 'react-router-dom';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Copyright = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const DashboardLayout = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* TOPNAV */}
      <AppBar position="absolute" open={false}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* SIDE NAV */}
      <Drawer variant="permanent" open={false}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <TopicIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          {/* {secondaryListItems} */}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
