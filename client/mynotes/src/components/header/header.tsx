import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Button_With_Loading from "../buttons/button_with_loading";
import MUI_Global_Variants from "@/enums/MUI_global/MUI_global_variants";
import MUI_Global_Colors from "@/enums/MUI_global/MUI_global_colors";
import Button_Without_Loading from "../buttons/button_without_loading";
import CancelIcon from '@mui/icons-material/Cancel';
import styles from "./header.module.css"
import Link from "next/link";

const drawerWidth = 240;
interface Header_Nav_Items_Type{
    id:number;
    key:string;
    value:string;
    pathname:string;
    pathname_as:string;
}
const unauthenticated_nav_items:ReadonlyArray<Header_Nav_Items_Type> = [
    {
        id:1,
        key:"Home",
        value:"Home",
        pathname:"/",
        pathname_as:"/",
    },
    {
        id:2,
        key:"About",
        value:"About",
        pathname:"/",
        pathname_as:"/",
    },    
    {
        id:3,
        key:"Register",
        value:"Register",
        pathname:"/",
        pathname_as:"/",
    }
];

const authenticated_nav_items: ReadonlyArray<Header_Nav_Items_Type> = [
  {
    id:1,
    key:"Home",
    value:"Home",
    pathname:"/",
    pathname_as:"/",
  },{
    id:2,
    key:"About",
    value:"About",
    pathname:"/",
    pathname_as:"/",
  },
  {
    id:3,
    key:"Crypto",
    value:"Crypto",
    pathname:"/crypto/get_all_cryptos",
    pathname_as:"/crypto/get_all_cryptos",
  },
]

const string1 = "UCB"
const string2 = "UCB"
const string3 = "Sign Out"
const string4 = "Sign In"

const Header: NextPage & any = (props:any): JSX.Element => {
  const [is_user_authenticated, set_is_user_authenticated] = useState<boolean>(false)  

  const session: any = useSession();
  useEffect(()=>{
    set_is_user_authenticated(session.status == "authenticated" ? true : false);
  },[session])
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const navItems:ReadonlyArray<Header_Nav_Items_Type> = is_user_authenticated ? authenticated_nav_items : unauthenticated_nav_items
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
            <b>{string1}</b>
            <CancelIcon onClick={handleDrawerToggle} className={styles.Header_Cancel_Icon_Style} color="secondary"/>
        </Box>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link onClick={handleDrawerToggle} key={item.id} as={item.pathname_as} href={{
            pathname: item.pathname,
            href: item.pathname
          }}><ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.key} />
            </ListItemButton>
          </ListItem></Link>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: "auto" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {string2}
          </Typography>
          <Box >
            {navItems.map((item) => (
              <Link key={item.id} as={item.pathname_as} href={{
                pathname: item.pathname,
                href: item.pathname
              }}>
              <Button_Without_Loading 
              button_custom_styles={{ color: "white" }}
              button_color={MUI_Global_Colors.Secondary}
                button_variant={MUI_Global_Variants.Outlined}
                button_content={item.key}
               />
              </Link>
            ))}
            {session.status == "authenticated" ? (
              <Button sx={{ color: "#fff" }} onClick={() => signOut()}>
                {string3}
              </Button>
            ) : session.status == "loading" ? (
              <Button_With_Loading
                button_custom_styles={{ color: "white" }}
                button_color={MUI_Global_Colors.Secondary}
                button_variant={MUI_Global_Variants.Outlined}
                is_button_loading_active={true}
              />
            ) : (
              <Button sx={{ color: "#fff" }} onClick={() => signIn()}>
                {string4}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
            disableScrollLock: true,
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: { xs: 1, sm:1.5, lg: 3 }, width:'100%' }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};
export default Header;
