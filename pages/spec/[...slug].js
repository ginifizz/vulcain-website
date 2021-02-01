import React from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Drawer, Box, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import docTheme from '../../src/docTheme';
import DocsMenu from '../../components/DocsMenu';
import Markdown from '../../components/markdown/Markdown';
import Page from '../../components/Page';
import PropTypes from 'prop-types';
import { getFiles } from '../../lib/getAllFolderFileNames';
import { getMarkdown } from '../../lib/getMarkdownByFilePath';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'sticky',
    top: '64px',
    height: 'calc(100vh - 64px)',
  },
  docWrapper: {
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

function cleanSpec(md) {
  return (
    '# Vulcain: The Specification\n' +
    md
      .replace(/^%%%(.|\n)*%%%(\W|\n)*\./, '')
      .replace('{mainmatter}', '')
      .replace('{backmatter}', '')
      .replace(/^#\W+/gm, '## ')
      .replace(/\(#(.*?)\)/gm, (_, id) => {
        return `[${id.replace(/-/gm, ' ')}](#${id})`;
      })
  );
}

function PostTemplate({ content }) {
  const classes = useStyles();

  return (
    <Page withFooter={false}>
      <Box display="flex" width="100%">
        <Hidden smDown initialWidth="md">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <DocsMenu />
          </Drawer>
        </Hidden>
        <ThemeProvider theme={docTheme}>
          <Box p={3} className={classes.docWrapper}>
            <Markdown source={content} />
          </Box>
        </ThemeProvider>
      </Box>
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = await getFiles('spec');

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const markdownPath = slug.join('/');
  const content = getMarkdown('spec', markdownPath);
  // Import our .md file using the `slug` from the URL
  // const content = await import(`../../spec/${slug}.md`);

  // Pass data to our component props
  return { props: { content: cleanSpec(content) } };

  return { slug };
}

export default PostTemplate;
