import React from 'react';
import { Drawer, Box, Hidden } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import docTheme from '../../src/docTheme';
import DocsMenu from '../../components/DocsMenu';
import Markdown from '../../components/markdown/Markdown';
import Page from '../../components/Page';
import { getFiles } from '../../lib/getAllFolderFileNames';
import { getMarkdown } from '../../lib/getMarkdownByFilePath';
import { GetStaticPaths, GetStaticProps } from 'next';

const drawerWidth = 240;

const useStyles = makeStyles<Theme>((theme) => ({
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

interface DocTemplateProps {
  content: string;
}

const DocTemplate: React.ComponentType<DocTemplateProps> = ({ content }) => {
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
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getFiles('docs');
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const markdownPath = typeof slug === 'string' ? slug : slug.join('/');
  const content = getMarkdown('docs', markdownPath);
  // Pass data to our component props
  return { props: { content } };
};

export default DocTemplate;
