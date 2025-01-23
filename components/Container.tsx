import classnames from "classnames";
import type { HTMLAttributes } from "react";

export default function Container({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classnames("mx-auto max-w-screen-sm px-3", className)} {...props}>
      {children}
    </div>
  );
}
