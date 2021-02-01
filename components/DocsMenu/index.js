import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import Scrollspy from 'react-scrollspy';
import { useRouter } from 'next/router';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import useStyles from './style';

const specLinks = {
  Abstract: 'abstract',
  Terminology: 'terminology',
  'Preload Header': 'preload-header',
  'Using Preload Link Relations': 'using-preload-link-relations',
  'Fields Header': 'fields-header',
  Selectors: 'selectors',
  'Extended JSON Pointer': 'extended-json-pointer',
  'Query Parameters': 'query-parameters',
  'Computing Links Server-Side': 'computing-links-server-side',
  'Security Condiderations': 'security-considerations',
  'IANA Considerations': 'iana-considerations',
};

const MenuLink = (props) => {
  const { text, href, activeSpecLink, ...rest } = props;
  const { asPath } = useRouter();
  return (
    <Link href={href}>
      <ListItem
        component="a"
        button
        selected={(!activeSpecLink && href === asPath) || href.endsWith('#' + activeSpecLink)}
        {...rest}
      >
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};

MenuLink.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  activeSpecLink: PropTypes.string,
};

const DocsMenu = () => {
  const { asPath } = useRouter();
  const classes = useStyles();
  const [openSpec, setOpenSpec] = useState(asPath.includes('/spec'));
  const [openGateway, setOpenGateway] = useState(asPath.includes('/gateway'));
  const [activeSpecLink, setActiveSpecLink] = useState(undefined);

  useEffect(() => {
    setOpenSpec(asPath.includes('/spec'));
    setOpenGateway(asPath.includes('/gateway'));
  }, [asPath]);

  return (
    <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
      <MenuLink text="Introduction" href="/docs/vulcain" />
      <MenuLink text="Get Started" href="/docs/getting-started" />

      <ListItem button onClick={() => setOpenSpec(!openSpec)}>
        <ListItemText primary="Specification" />
        {openSpec ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSpec} timeout="auto" mountOnEnter unmountOnExit>
        <Scrollspy
          items={Object.values(specLinks)}
          onUpdate={(elem) => {
            return elem && asPath.startsWith('/spec') && setActiveSpecLink(elem.id);
          }}
          componentTag={List}
          component="div"
          disablePadding
        >
          {Object.entries(specLinks).map(([k, v]) => (
            <MenuLink
              text={k}
              href={`/spec/vulcain#${v}`}
              key={v}
              className={classes.nested}
              activeSpecLink={activeSpecLink}
            />
          ))}
        </Scrollspy>
      </Collapse>

      <ListItem button onClick={() => setOpenGateway(!openGateway)}>
        <ListItemText primary="Gateway" />
        {openGateway ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openGateway} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuLink text="Install" href="/docs/gateway/install" className={classes.nested} />
          <MenuLink text="Configuration" href="/docs/gateway/config" className={classes.nested} />
          <MenuLink text="OpenAPI" href="/docs/gateway/openapi" className={classes.nested} />
        </List>
      </Collapse>

      <MenuLink text="Comparison with GraphQL and Other API Formats" href="/docs/graphql" />

      <MenuLink
        text="Using GraphQL as Query Language for Vulcain"
        href="/docs/graphql#using-graphql-as-query-language-for-vulcain"
      />

      <MenuLink text="Cache Considerations" href="/docs/cache" />

      <MenuLink text="Help" href="/docs/help" />
    </List>
  );
};

DocsMenu.propTypes = {
  mobile: PropTypes.bool,
};

export default DocsMenu;
