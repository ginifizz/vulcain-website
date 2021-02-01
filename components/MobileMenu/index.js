import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Drawer, Box } from '@material-ui/core';
import useStyles from './style';
import DocsMenu from '../DocsMenu';

const MobileMenu = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <Drawer open={open} anchor="right" onClose={onClose} PaperProps={{ classes: { root: classes.root } }}>
      <Divider />
      <Box flex={1} alignItems="flex-start" display="flex">
        <DocsMenu mobile={true} />
      </Box>
    </Drawer>
  );
};

MobileMenu.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MobileMenu;
