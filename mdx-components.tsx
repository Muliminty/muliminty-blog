"use client";

import type { MDXComponents } from "mdx/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: (props) => {
      const { children, className } = props;
      const match = /language-(\w+)/i.exec(className || "");
      return match ? (
        <div
          style={{
            background: "#1e1e1e",
            borderRadius: "4px",
            // overflow: "auto",
            // padding: "1em",
            // margin: "0.5em 0",
          }}
        >
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1].toLowerCase()}
            showLineNumbers
            PreTag="div"
            customStyle={{
              background: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code {...props} />
      );
    },
    ...components,
  };
}
