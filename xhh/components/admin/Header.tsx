import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMediaQuery } from "@mui/material";
import { logoTextRed } from "../../public/assets";
import Image from "next/image";
import Link from "next/link";

export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

const Header = () => {
  const { data: session } = useSession();
  const userProfileImg = session?.user?.image as string;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const tabletCheck = useMediaQuery("(min-width: 768px)");

  return (
    <AppBar position="static" sx={{ marginBottom: "40px" }} className="bg-gray-200 py-5">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex justify-between items-center">
          <div className="flex gap-8 items-center text-neutral-600 font-semibold">
            <Link href="/">
              <Image src={logoTextRed} alt="" className="w-[12rem]" />
            </Link>

            <Link href="/admin">Đơn hàng</Link>

            <Link href="/dashboard/banner">Banner</Link>
          </div>

          {(tabletCheck && session?.user) && (
            <Box sx={{ paddingRight: 2, marginLeft: "auto" }}>
              <Typography className="text-neutral-800">{session?.user?.name}</Typography>
            </Box>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Đăng nhập">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={session?.user?.name as string}
                  src={userProfileImg}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => (session ? signOut() : signIn())}>
                <Typography textAlign="center">
                  {session ? "Logout" : "Login"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;