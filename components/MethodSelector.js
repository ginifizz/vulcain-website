import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import { METHODS } from '../data/methods';

const useTabsStyles = makeStyles((theme) => ({
  root: {
    minHeight: 40,
  },
  flexContainer: {
    display: 'inline-flex',
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(0.5),
  },
  scroller: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'auto',
    flex: 'unset',
    backgroundColor: theme.palette.type === 'light' ? '#eee' : theme.palette.divider,
    borderRadius: 10,
    padding: 0,
  },
  indicator: {
    top: theme.spacing(0.5),
    bottom: theme.spacing(0.5),
    right: theme.spacing(0.5),
    height: 'auto',
    background: 'none',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 8,
      backgroundColor: theme.palette.type === 'light' ? '#fff' : theme.palette.action.selected,
      boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',
    },
  },
}));
const useTabItemStyles = makeStyles((theme) => ({
  root: {
    minHeight: 30,
    minWidth: 100,
  },
  wrapper: {
    textTransform: 'initial',
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const MethodSelector = ({ method, onMethodChange }) => {
  const tabsStyles = useTabsStyles();
  const tabItemStyles = useTabItemStyles();

  return (
    <Tabs
      textColor="primary"
      centered
      classes={tabsStyles}
      value={method}
      onChange={(e, index) => onMethodChange(index)}
    >
      {Object.keys(METHODS).map((key) => (
        <Tab classes={tabItemStyles} key={METHODS[key].tabIndex} disableRipple label={METHODS[key].label} value={key} />
      ))}
    </Tabs>
  );
};

MethodSelector.propTypes = {
  method: PropTypes.string,
  onMethodChange: PropTypes.func.isRequired,
};

MethodSelector.defaultProps = {
  method: Object.keys(METHODS)[0],
};

export default MethodSelector;
