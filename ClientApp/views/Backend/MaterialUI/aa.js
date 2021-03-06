import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import NestedList from './NestedList';
import NestedList2 from './NestedList2';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  content: {
    width: '100%',
    marginLeft: -drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  ///////////
  root: {
    marginTop: 30,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  ////
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class PersistentDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  AAAA() {
    return {
      display: "inlineBlock",
      width: "155px",
      height: "55px",
      padding: "0.5rem 1rem",
      marginRight: 0,
      backgroundColor: "#fff",
      backgroundImage: 'url("../img/logo.png")',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "70px auto",
      borderBottom: "1px solid #cfd8dc",
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap className={classes.flex}>
                Persistent drawer
              </Typography>
              <SimpleMenu />
              <Button color="contrast">Login</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            type="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                  <a className="navbar-brand" style={this.AAAA()} href="#"></a>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                  {/* <img src="../img/logo.png" alt="" className=" app-header navbar  navbar-brand" /> */}
                </IconButton>
              </div>
              <Divider />
              {/* <List className={classes.list}>{mailFolderListItems}</List> */}
              <NestedList />
              <Divider />
              {/* <List className={classes.list}>{otherMailFolderListItems}</List> */}
              <NestedList2 />
            </div>
          </Drawer>
          <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
            <Typography type="body1" noWrap>
              {'You think water moves fast? You should see ice.'}
            </Typography>
          </main>
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersistentDrawer);



// Open Menu
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: undefined,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {

    return (
      <div>
        <Button color="contrast"
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Avatar alt="Remy Sharp" src='/img/avatars/avatar2.png' className={null} />
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          Open Menu
           <KeyboardArrowDownIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Change Password</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}