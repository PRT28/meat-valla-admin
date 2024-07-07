import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import InventoryIcon from '@mui/icons-material/Inventory';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton selected={window.location.pathname === '/'} href='/'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton selected={window.location.pathname === '/orders'} href='/orders'>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton selected={window.location.pathname === '/customers'} href='/customers'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton selected={window.location.pathname === '/banners'} href='/banners'>
      <ListItemIcon>
        <ViewCarouselIcon />
      </ListItemIcon>
      <ListItemText primary="Banners" />
    </ListItemButton>
    <ListItemButton selected={window.location.pathname === '/category'} href='/category'>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Cateogories" />
    </ListItemButton>
    <ListItemButton selected={window.location.pathname === '/inventory'} href='/inventory'>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>
  </React.Fragment>
);