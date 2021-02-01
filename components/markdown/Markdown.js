import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';
import CodeBlock from './CodeBlock';
import Heading from './Heading';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
  link: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.dark,
  },
  // fit to prism style for inline code.
  inlineCode: {
    color: 'black',
    background: 'rgb(245, 242, 240)',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    whiteSpace: 'pre-wrap',
    padding: '5px',
    textShadow: 'white 0px 1px',
  },
  image: {
    maxWidth: '800px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
}));

/* eslint-disable react/display-name, react/prop-types */
const Markdown = ({ source }) => {
  const classes = useStyles();
  return (
    <ReactMarkdown
      source={source}
      transformImageUri={(input) =>
        /^https?:/.test(input) ? input : `https://raw.githubusercontent.com/dunglas/vulcain/master/${input}`
      }
      transformLinkUri={(input) => {
        if (!input || /^#|(https?|mailto):/.test(input)) {
          return input;
        }

        if (input.includes('spec/vulcain.md')) {
          return input.replace(/(.*)#?/, '/spec');
        }

        return '/docs/' + input.replace(/\.md/, '');
      }}
      renderers={{
        code: CodeBlock,
        inlineCode: ({ value }) => <code className={classes.inlineCode}>{value}</code>,
        paragraph: (props) => <Typography variant="body2" paragraph {...props} />,
        heading: Heading,
        listItem: ({ children }) => {
          // Paragraphs aren't allowed inside list items
          const cleanedChildren = Children.toArray(children).map((child) => {
            return child.type && child.type.name === 'paragraph' ? child.props.children : child;
          });

          return (
            <li className={classes.listItem}>
              <Typography component="span">{cleanedChildren}</Typography>
            </li>
          );
        },
        image: (props) => <img className={classes.image} {...props} />,
        link: ({ href, ...props }) => {
          if (!href) {
            return props.children;
          }

          if (/^#|(https?|mailto):/.test(href)) {
            return (
              <MUILink className={classes.link} href={href}>
                {props.children}
              </MUILink>
            );
          }

          return (
            <Link href={`${href}`} passHref>
              <MUILink className={classes.link}>{props.children}</MUILink>
            </Link>
          );
        },
        linkReference: (reference) => {
          // RFC and W3C references
          const child = reference.children[0];
          const matches = child.props.value.match(/^@!?(.+)/);

          if (!matches) {
            return `[${child.props.value}]`;
          }

          const id = matches[1];

          let href;
          if (id.startsWith('RFC')) {
            href = `https://tools.ietf.org/html/${id.toLowerCase()}`;
          } else {
            href = `https://duckduckgo.com/?q=!ducky+site%3Aw3.org+${id}`;
          }

          return (
            <React.Fragment>
              (
              <MUILink className={classes.link} href={href}>
                {id}
              </MUILink>
              )
            </React.Fragment>
          );
        },
      }}
    />
  );
};
/* eslint-enable react/display-name, react/prop-types */

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Markdown;
