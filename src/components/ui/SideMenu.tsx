import { useContext } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

// Icons
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";
import EscalatorWarningOutlined from "@mui/icons-material/EscalatorWarningOutlined";
import FemaleOutlined from "@mui/icons-material/FemaleOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import MaleOutlined from "@mui/icons-material/MaleOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined";

import { UiContext } from "@/context";

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  const { push } = useRouter();

  const navigateTo = (url: string) => {
    toggleSideMenu();
    push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor="right"
      sx={{
        backdropFilter: "blur(4px)",
        transition: "backdropFilter 0.5s ease-out",
      }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItemButton
            onClick={() => navigateTo("/category/men")}
            sx={{ display: { sm: "none" } }}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Men"} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo("/category/women")}
            sx={{ display: { sm: "none" } }}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Women"} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo("/category/kids")}
            sx={{ display: { sm: "none" } }}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Kids"} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"My orders"} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Log in"} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Log out"} />
          </ListItemButton>

          {/* Admin */}
          <Divider />

          <ListSubheader>Admin Panel</ListSubheader>

          <ListItemButton>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={"Products"} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={"Users"} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};
