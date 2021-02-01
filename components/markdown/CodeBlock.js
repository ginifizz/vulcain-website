import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  codeTagProps = {
    style: {
      color: 'black',
      background: 'none',
      textShadow: 'white 0px 1px',
      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
      textAlign: 'left',
      whiteSpace: 'pre-wrap',
      wordSpacing: 'normal',
      wordBreak: 'break-all',
      overflowWrap: 'normal',
      lineHeight: '1.5',
      tabSize: '4',
      hyphens: 'none',
    },
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter
        language={language}
        customStyle={{ display: 'block', whiteSpace: 'pre-wrap' }}
        codeTagProps={this.codeTagProps}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;
