import React from "react"
import { styled, useTheme } from "@material-ui/core/styles"
import { navigate } from "gatsby"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faChevronLeft,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"
import Styles from "./styles"

const drawerWidth = 240

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = theme => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "60px",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

const MiniDrawer = ({
  orgName,
  navList,
  open,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const theme = useTheme()

  const DrawerHeader = ({ children }) => (
    <div className={classes.drawerHeader}>{children}</div>
  )

  const activeIndex = () => {
    const filter = navList.filter(category => {
      const base = window.location.pathname.split("/", 2)[1]
      if (base === "labs") {
        return category.url === "/"
      }
      return category.url === "/" + base
    })
    const index = navList.indexOf(filter[0])
    return index
  }

  const classes = Styles({ open })
  return (
    <>
      <AppBar position="fixed" open={open} classes={{ root: classes.appBar }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            classes={{ root: classes.barBtnStyle }}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                variant="h1"
                classes={{ root: classes.headerTextStyle }}
              >
                {orgName}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => {
                  navigate("/profile")
                }}
              >
                <FontAwesomeIcon icon={faUserCircle} size="1x" inverse />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <FontAwesomeIcon icon={faChevronLeft} color="inherit" />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navList.map((parm, index) => (
            <ListItem
              key={index}
              disablePadding
              classes={{ root: classes.listItemStyle }}
              selected={activeIndex() === index}
              onClick={() => {
                navigate(`${parm.url}`)
              }}
            >
              <Grid container alignItems="center">
                <Grid item>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={parm.icon}
                      size="2x"
                      color={
                        activeIndex() === index
                          ? theme.palette.common.hotpink
                          : theme.palette.primary.dark
                      }
                    />
                  </ListItemIcon>
                </Grid>
                <Grid item>
                  <ListItemText
                    primary={
                      <Typography
                        className={
                          activeIndex() === index && classes.listTextStyle
                        }
                      >
                        {parm.name}
                      </Typography>
                    }
                    style={{
                      display: !open && "none",
                    }}
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
    </>
  )
}

export default MiniDrawer
