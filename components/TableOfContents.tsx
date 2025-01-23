import "@/styles/table-of-contents.css";

import classnames from "classnames";
import type { HTMLAttributes } from "react";

import TableOfContentsHeading, { type Heading } from "@/components/TableOfContentsHeading";

const buildToc = (headings: Array<Heading>) => {
  const toc: Array<Heading> = [];

  headings.reduce((acc, heading) => {
    acc.set(heading.depth, heading);
    if (heading.depth === 1) {
      toc.push(heading);
    } else {
      const parent = acc.get(heading.depth - 1);
      if (parent) {
        parent.subheadings = parent.subheadings || [];
        parent.subheadings.push(heading);
      } else {
        toc.push(heading);
      }
    }
    return acc;
  }, new Map<number, Heading>());

  return toc;
};

export interface TableOfContentsProps extends HTMLAttributes<HTMLDetailsElement> {
  headings: Array<Heading>;
}

export default function TableOfContents({ headings, className, ...props }: TableOfContentsProps) {
  const toc = buildToc(headings);
  return (
    <details
      open
      className={classnames(
        "animate rounded-lg border border-black/15 dark:border-white/20",
        className
      )}
      {...props}
    >
      <summary>Table of Contents</summary>
      <nav>
        <ul className="py-3">
          {toc.map((heading, i) => (
            <TableOfContentsHeading key={`heading-${i}`} {...heading} />
          ))}
        </ul>
      </nav>
    </details>
  );
}
