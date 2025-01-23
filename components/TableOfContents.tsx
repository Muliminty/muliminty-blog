import "@/styles/table-of-contents.css";

import classnames from "classnames";
import type { HTMLAttributes } from "react";

import TableOfContentsHeading, { type Heading } from "@/components/TableOfContentsHeading";

const buildToc = (headings: Array<Heading>) => {
  const toc: Array<Heading> = [];
  const stack: Array<Heading> = [];

  headings.forEach((heading) => {
    const item = { ...heading, subheadings: [] };

    while (stack.length > 0 && stack[stack.length - 1].depth >= item.depth) {
      stack.pop();
    }

    if (stack.length > 0) {
      const parent = stack[stack.length - 1];
      parent.subheadings = parent.subheadings || [];
      parent.subheadings.push(item);
    } else {
      toc.push(item);
    }

    stack.push(item);
  });

  return toc;
};

interface TocItemProps {
  heading: Heading;
  activeId?: string;
}

function TocItem({ heading, activeId }: TocItemProps) {
  return (
    <li data-depth={heading.depth}>
      <TableOfContentsHeading {...heading} className={heading.id === activeId ? "active" : ""} />
      {heading.subheadings && heading.subheadings.length > 0 && (
        <ul>
          {heading.subheadings.map((subheading, i) => (
            <TocItem key={`subheading-${i}`} heading={subheading} activeId={activeId} />
          ))}
        </ul>
      )}
    </li>
  );
}

export interface TableOfContentsProps extends HTMLAttributes<HTMLDetailsElement> {
  headings: Array<Heading>;
  activeId?: string;
}

export default function TableOfContents({
  headings,
  className,
  activeId,
  ...props
}: TableOfContentsProps) {
  const toc = buildToc(headings);

  return (
    <details
      open
      className={classnames(
        "table-of-contents-container animate rounded-lg border border-black/15 dark:border-white/20",
        className
      )}
      {...props}
    >
      <summary>目录</summary>
      <nav>
        <ul className="py-3">
          {toc.map((heading, i) => (
            <TocItem key={`heading-${i}`} heading={heading} activeId={activeId} />
          ))}
        </ul>
      </nav>
    </details>
  );
}
