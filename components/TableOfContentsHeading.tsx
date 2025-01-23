import classnames from "classnames";

import Link from "@/components/Link";

export interface Heading {
  depth: number;
  slug: string;
  text: string;
  id: string;
  subheadings?: Array<Heading>;
}

export interface TableOfContentsHeadingProps extends Heading {
  className?: string;
}

export default function TableOfContentsHeading({
  slug,
  text,
  subheadings = [],
  className,
}: TableOfContentsHeadingProps) {
  return (
    <Link
      href={"#" + slug}
      className={classnames("block py-1.5 pl-3 pr-2 rounded-md transition-all", className)}
      underline
    >
      {text}
    </Link>
  );
}
