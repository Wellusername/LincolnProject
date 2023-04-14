import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              color="primary"
            >
              Name
            </Typography>
            <Button variant="text" color="primary" component={Link} to="/">
              Encode
            </Button>
            <Button variant="text" color="primary" component={Link} to="/scan">
              Scan
            </Button>
            <Button variant="text" color="primary" component={Link} to="/newEvent">
              New EPICS Event
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
};

export default Layout;
