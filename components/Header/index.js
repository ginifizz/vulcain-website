import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { AppBar, Button, IconButton, Box, Toolbar, Hidden, Link as MuiLink } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useRouter } from 'next/router';
import useStyles from './style';
import MobileMenu from '../MobileMenu';

const Header = () => {
  const classes = useStyles();
  const { pathname, asPath } = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const spec = asPath.startsWith('/spec');

  return (
    <>
      <MuiLink href="https://mercure.rocks/" underline="none" variant="body2" width="100%" className={classes.mercure}>
        Discover
        <img src="/static/logo-mercure.svg" alt="mercure" />| Real-Time with ease
      </MuiLink>
      <AppBar position="sticky" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link href="/" passHref>
            <Button className={classes.logoLink} component="a">
              <img className={classes.logo} src="/static/logo.svg" alt="Vulcain.rocks" />
            </Button>
          </Link>
          <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
            <img className={classes.sponsor} src="/static/sponsor.svg" />
          </a>
          <Hidden smDown initialWidth="md">
            <Box px={1} flex={1} height="100%">
              <Link href="/docs" passHref>
                <Button
                  className={`${classes.menuLink} ${pathname === '/docs' && !spec ? 'active' : ''}`}
                  component="a"
                >
                  Documentation
                </Button>
              </Link>
              <Link href="/spec">
                <Button className={`${classes.menuLink} ${spec ? 'active' : ''}`} component="a">
                  Specification
                </Button>
              </Link>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box display="flex" flex={1} justifyContent="flex-end">
              <IconButton onClick={() => setIsDrawerOpen(true)} className={classes.burgerButton}>
                <MenuIcon fontSize="large" />
              </IconButton>
            </Box>
          </Hidden>
        </Toolbar>
        <a
          className={classes.github}
          href="https://github.com/dunglas/vulcain"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={classes.ribbon}>Contribute!</div>
          <div className={classes.octoLink}>
            <svg width="80" height="80" viewBox="0 0 250 250" className={classes.octoSvg} aria-hidden="true">
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" fill="#151513"></path>
              <path
                className={classes.octoArm}
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="#ffffff"
              ></path>
              <path
                className={classes.octoBody}
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </a>
      </AppBar>
      <MobileMenu onClose={() => setIsDrawerOpen(false)} open={isDrawerOpen} />
    </>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

export default Header;